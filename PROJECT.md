# PROJECT.md

## Business Goals
1.  **Guest Experience:** Provide an immersive digital invitation with 3D elements (fireflies, parallax), music, and a seamless RSVP experience.
2.  **Admin Operations:** Allow the couple to manage the guest list ("Parties"), track RSVPs, and send bulk communications via Email (Resend) and SMS (Twilio).

## User Personas
1.  **The Guest:**
    - Accesses via site password (middleware protection).
    - Finds invitation by searching their name (fuzzy match via API).
    - RSVPs for their entire "Party" (family/couple).
2.  **The Admin (Yonatan & Saron):**
    - Accesses via `/admin/login`.
    - Needs to see stats: Total Guests, Confirmed Attending, Campaign Sent status.
    - Needs to trigger campaigns (e.g., "Save the Date", "Day-of Alert").

## Key Dates
- **Wedding:** September 4, 2026 @ 12:00 PM (Wrightsville, PA).
- **RSVP Deadline:** June 1st.
