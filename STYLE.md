# STYLE.md

## Design Tokens
- **Colors:**
  - Background: `#0a0908` (luxury-black)
  - Primary Text: `#E8E4DF`
  - Accents: `#D4A845` (wedding-gold), `#1B3B28` (forest-green)
- **Fonts:**
  - Headers: `Cormorant Garamond` (Serif)
  - Body: `Inter` (Sans)
  - Script: `Allura` (Cursive)
- **Effects:**
  - `film-grain`: Custom CSS overlay in `main.css`.
  - `SmoothScroll`: Lenis integration.

## Coding Patterns
- **API Routes:** Located in `src/app/api/`. Must return `NextResponse`.
- **3D Components:** Located in `src/components`. Always wrap in `Suspense`.
- **Emails:** React components in `src/emails/`.
- **Supabase:**
  - Tables: `parties` (parent), `guests` (children), `campaign_logs`.
