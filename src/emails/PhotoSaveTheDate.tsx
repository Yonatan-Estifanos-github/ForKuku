import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface PhotoSaveTheDateProps {
  guestName?: string;
}

export const PhotoSaveTheDate = ({
  guestName = 'Guest',
}: PhotoSaveTheDateProps) => (
  <Html>
    <Head />
    <Preview>Save the Date — Saron & Yonatan · September 4, 2026</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Hero image — full-width, responsive */}
        <Img
          src="https://foxezhxncpzzpbemdafa.supabase.co/storage/v1/object/public/wedding-ui/engagement_photo_4.jpeg"
          alt="Yonatan & Saron"
          width="600"
          style={heroImage}
        />

        {/* Content area with padding */}
        <Section style={content}>
          <Text style={headline}>SAVE THE DATE</Text>

          <Text style={names}>Saron & Yonatan</Text>

          <Text style={date}>Friday · September 4, 2026</Text>

          {/* Gold divider */}
          <div style={divider} />

          <Text style={paragraph}>Dear {guestName},</Text>
          <Text style={paragraph}>
            With grateful hearts, we&apos;re excited to share that we&apos;ll be getting
            married. God has been so faithful in bringing our paths together, and
            we&apos;re looking forward to beginning this next chapter surrounded by
            the people we love. We hope you&apos;ll save the date and celebrate with
            us as we step into all that God has prepared.
          </Text>

          <Text style={locationText}>
            Wrightsville, Pennsylvania
            <br />
            <span style={subNote}>(Formal invitation to follow)</span>
          </Text>

          <Section style={btnContainer}>
            <Button style={button} href="https://theestifanos.com">
              Visit Wedding Website
            </Button>
          </Section>

          <Text style={footer}>The Estifanos Family</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default PhotoSaveTheDate;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const main: React.CSSProperties = {
  backgroundColor: '#F9F7F2',
  fontFamily: '"Times New Roman", Times, serif',
  margin: '0',
  padding: '0',
};

const container: React.CSSProperties = {
  margin: '0 auto',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
};

const heroImage: React.CSSProperties = {
  width: '100%',
  height: 'auto',
  display: 'block',
};

const content: React.CSSProperties = {
  padding: '40px 32px',
  textAlign: 'center',
};

const headline: React.CSSProperties = {
  color: '#D4A845',
  fontSize: '13px',
  letterSpacing: '5px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  margin: '0 0 16px',
};

const names: React.CSSProperties = {
  color: '#1B3B28',
  fontSize: '42px',
  fontStyle: 'italic',
  fontWeight: 'normal',
  margin: '0 0 16px',
  lineHeight: '1.2',
};

const date: React.CSSProperties = {
  color: '#D4A845',
  fontSize: '20px',
  letterSpacing: '2px',
  margin: '0 0 28px',
};

const divider: React.CSSProperties = {
  width: '60px',
  height: '1px',
  backgroundColor: '#D4A845',
  margin: '0 auto 28px',
};

const paragraph: React.CSSProperties = {
  color: '#1B3B28',
  fontSize: '17px',
  lineHeight: '1.7',
  margin: '0 0 18px',
  textAlign: 'center',
};

const locationText: React.CSSProperties = {
  color: '#1B3B28',
  fontSize: '16px',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  margin: '28px 0 0',
  lineHeight: '1.8',
};

const subNote: React.CSSProperties = {
  fontSize: '13px',
  letterSpacing: '1px',
  textTransform: 'none',
  color: '#888888',
  fontStyle: 'italic',
};

const btnContainer: React.CSSProperties = {
  textAlign: 'center',
  marginTop: '32px',
  marginBottom: '32px',
};

const button: React.CSSProperties = {
  backgroundColor: '#1B3B28',
  color: '#D4A845',
  fontSize: '15px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
  padding: '14px 32px',
  border: '1px solid #D4A845',
  borderRadius: '6px',
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
};

const footer: React.CSSProperties = {
  color: '#888888',
  fontSize: '12px',
  letterSpacing: '1px',
  marginTop: '40px',
};
