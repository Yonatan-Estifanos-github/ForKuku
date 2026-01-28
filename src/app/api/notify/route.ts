import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { Resend } from 'resend';
import twilio from 'twilio';
import SaveTheDate from '@/emails/SaveTheDate';
import FormalInvite from '@/emails/FormalInvite';
import GenericTemplate from '@/emails/GenericTemplate';
import { CAMPAIGNS, CampaignId } from '@/config/campaigns';

// Lazy initialization to avoid build-time errors
let resendClient: Resend | null = null;
function getResend() {
  if (!resendClient && process.env.RESEND_API_KEY) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

let twilioClient: ReturnType<typeof twilio> | null = null;
function getTwilio() {
  if (!twilioClient && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }
  return twilioClient;
}

// Helper: Check if phone is US-based (+1)
function isUSPhone(phone: string): boolean {
  const cleaned = phone.replace(/\s/g, '');
  return cleaned.startsWith('+1') || (cleaned.startsWith('1') && cleaned.length === 11);
}

interface NotifyResult {
  success: boolean;
  channels: ('email' | 'sms')[];
  skipped?: string[];
  errors?: string[];
}

async function sendEmail(
  email: string,
  partyName: string,
  campaignId: CampaignId
): Promise<{ success: boolean; error?: string }> {
  const campaign = CAMPAIGNS.find(c => c.id === campaignId);
  if (!campaign) return { success: false, error: 'Campaign not found' };

  let subject = '';
  let reactComponent = null;

  switch (campaignId) {
    case 'save-the-date':
      subject = 'Save the Date: Yonatan & Saron';
      reactComponent = SaveTheDate({ guestName: partyName });
      break;
    case 'formal-invitation':
      subject = 'You\'re Invited: Yonatan & Saron\'s Wedding';
      reactComponent = FormalInvite({ guestName: partyName });
      break;
    case 'rsvp-reminder':
      subject = 'Reminder: RSVP for Yonatan & Saron\'s Wedding';
      reactComponent = GenericTemplate({
        heading: 'RSVP Reminder',
        body: 'We kindly remind you to RSVP by June 1st. We hope you can join us for our special day!',
        ctaText: 'RSVP Now',
      });
      break;
    case 'logistics-update':
      subject = 'Wedding Week Details - Yonatan & Saron';
      reactComponent = GenericTemplate({
        heading: 'Wedding Week Logistics',
        body: 'Here are the parking, hotel, and schedule details for the wedding weekend. We can\'t wait to see you!',
        ctaText: 'View Details',
      });
      break;
    case 'day-of-alert':
      subject = 'Wedding Day Update';
      reactComponent = GenericTemplate({
        heading: 'Day-of Update',
        body: campaign.smsBody,
        ctaText: 'View Schedule',
      });
      break;
    case 'thank-you':
      subject = 'Thank You! - Yonatan & Saron';
      reactComponent = GenericTemplate({
        heading: 'Thank You!',
        body: 'Thank you so much for celebrating with us. It meant the world to have you there. Photos from the day are now available!',
        ctaText: 'View Photos',
      });
      break;
    default:
      return { success: false, error: 'Unknown campaign template' };
  }

  try {
    const resend = getResend();
    if (!resend) {
      return { success: false, error: 'Email not configured' };
    }

    const { error: emailError } = await resend.emails.send({
      from: 'Yonatan & Saron <wedding@send.theestifanos.com>',
      to: [email],
      subject,
      react: reactComponent,
    });

    if (emailError) {
      console.error('Resend error:', emailError);
      return { success: false, error: emailError.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Email send error:', err);
    return { success: false, error: 'Failed to send email' };
  }
}

async function sendSms(
  phone: string,
  campaignId: CampaignId
): Promise<{ success: boolean; error?: string }> {
  const twilio = getTwilio();
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

  if (!twilio || !twilioPhone) {
    return { success: false, error: 'SMS not configured' };
  }

  const campaign = CAMPAIGNS.find(c => c.id === campaignId);
  if (!campaign) return { success: false, error: 'Campaign not found' };

  try {
    await twilio.messages.create({
      body: campaign.smsBody,
      from: twilioPhone,
      to: phone,
    });

    return { success: true };
  } catch (err) {
    console.error('Twilio error:', err);
    return { success: false, error: 'Failed to send SMS' };
  }
}

export async function POST(req: Request) {
  try {
    const { partyId, campaignId } = await req.json();

    if (!partyId || !campaignId) {
      return NextResponse.json({ error: 'Missing partyId or campaignId' }, { status: 400 });
    }

    const campaign = CAMPAIGNS.find(c => c.id === campaignId);
    if (!campaign) {
      return NextResponse.json({ error: 'Invalid campaign' }, { status: 400 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Fetch party data
    const { data: party, error: fetchError } = await supabaseAdmin
      .from('parties')
      .select('*')
      .eq('id', partyId)
      .single();

    if (fetchError || !party) {
      return NextResponse.json({ error: 'Party not found' }, { status: 404 });
    }

    const hasEmail = !!party.email;
    const hasPhone = !!party.phone;
    const hasUSPhone = hasPhone && isUSPhone(party.phone);

    if (!hasEmail && !hasPhone) {
      return NextResponse.json({ error: 'No contact information available for this party' }, { status: 400 });
    }

    const result: NotifyResult = {
      success: false,
      channels: [],
      skipped: [],
      errors: [],
    };

    // Best Effort: Send to ALL available channels
    // Email
    if (hasEmail) {
      const emailResult = await sendEmail(party.email, party.party_name, campaignId as CampaignId);
      if (emailResult.success) {
        result.channels.push('email');

        // Log email success
        await supabaseAdmin.from('campaign_logs').insert({
          party_id: partyId,
          campaign_id: campaignId,
          channel: 'email',
          status: 'sent',
        });
      } else if (emailResult.error) {
        result.errors!.push(`Email: ${emailResult.error}`);
      }
    }

    // SMS - Only send to US numbers (+1)
    if (hasPhone) {
      if (hasUSPhone) {
        const smsResult = await sendSms(party.phone, campaignId as CampaignId);
        if (smsResult.success) {
          result.channels.push('sms');

          // Log SMS success
          await supabaseAdmin.from('campaign_logs').insert({
            party_id: partyId,
            campaign_id: campaignId,
            channel: 'sms',
            status: 'sent',
          });
        } else if (smsResult.error) {
          result.errors!.push(`SMS: ${smsResult.error}`);
        }
      } else {
        // International number - skip SMS, log it
        console.log(`Skipping SMS for international number: ${party.phone} (Party: ${party.party_name})`);
        result.skipped!.push(`SMS skipped: International number (${party.phone})`);
      }
    }

    // Update party status for key campaigns
    if (result.channels.length > 0) {
      if (campaignId === 'formal-invitation' || campaignId === 'save-the-date') {
        await supabaseAdmin.from('parties').update({ status: 'invited' }).eq('id', partyId);
      }
    }

    // Determine overall success
    result.success = result.channels.length > 0;

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send via any channel', details: result.errors },
        { status: 500 }
      );
    }

    // Clean up empty arrays
    if (result.errors?.length === 0) {
      delete result.errors;
    }
    if (result.skipped?.length === 0) {
      delete result.skipped;
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error('Notify API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
