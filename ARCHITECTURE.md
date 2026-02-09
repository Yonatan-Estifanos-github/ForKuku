# ARCHITECTURE.md

## System Overview
Next.js 14 application serving dual purposes: a 3D-rich frontend for guests and a secured CRUD dashboard for admins.

## Data Flows

### 1. RSVP Logic
[Guest UI] -> User types Name -> POST /api/rsvp/search -> Supabase (Read 'parties')
[Guest UI] -> Submit Form -> POST /api/rsvp/submit -> Supabase (Update 'parties' & 'guests')

### 2. Campaign Notification Engine
[Admin Dashboard] -> Select Campaign -> POST /api/notify
    |
    +-> [Resend API] -> Send Email
    +-> [Twilio API] -> Send SMS (if US phone)
    +-> [Supabase] -> Insert into `campaign_logs`
