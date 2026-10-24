# Handover — Mon 7 Sep 2026 (late session)

## 9 Wilohurst Drive — auction invite + website

**Done tonight**

- **Listing page live:** https://gregleighproperty.com.au/9-wilohurst-drive — full copy, 22 photos (6 new dusk shots first), floor + site plans, video tour, open homes, register-your-interest form (posts to the same `register-interest` function as Elysium). Listings page + homepage card now use the dusk rooftop shot; final auction-day open added.
- **Email built:** `wilohurst-auction-invite.html` (send version, all images hosted on the site) + `-PREVIEW.html` (images embedded, for viewing only). Carousel GIF on top (16 frames), greeting, condensed copy, 4×2 photo grid, open homes, 2×2 stat boxes, calendar links, CTA, footer.
- **Every image, the carousel, the CTA and each open-home row link to the site page** (open-home rows → `#open-homes`, CTA → `#register`).
- **Auto-link bug fixed:** every date/time/address/stat wrapped in a dead `<a href="#">` with its own colour + `format-detection` meta, so iOS Mail / Outlook can't turn them blue. Phone/email in footer are real tel:/mailto: styled grey.
- **Calendar:** Google + Outlook deep links, and `.ics` now **hosted** at `assets/homes/wilohurst/auction.ics` (linked, not attached — nothing to remember at send time).
- **Header:** logo band + auction band both `#0e2140`, no hairline between them; logo is the real white QSIR artwork at 2× (`assets/brand/qsir-logo-white@2x.png`).
- **Resend:** draft **"9 Wilohurst Drive - Auction Invite"** → https://resend.com/broadcasts/a831d907-a75e-45f5-b3c7-a1f2c234bc0c. From `Greg Leigh <greg@redlandshomevalue.com.au>`, reply-to `greg.leigh@qldsir.com`. Targets new segment **"Wilohurst Auction Invite"** (`e9f8e256-…`), currently **empty** — fill as registrations come in. Elysium segment left untouched.
- **Repo:** github.com/sunofsep1/gregleighproperty, commit `ae65780` on main, pushed from the Mac's clone at `~/gregleighproperty` (two stale `.git/*.lock` files from 6 Sep were removed). Netlify auto-deployed.

**Open / to check**

1. Send a Resend **test to yourself** and open on the phone before it goes to the list — confirm no blue links.
2. **Auction time 11:30am / reg 11:00am** is still pencilled pending Marcus Frater — if it moves, update: email stat boxes + greeting, calendar links, `auction.ics`, the site page, listings.html.
3. **Block size:** listings page says **700 m²** (pre-existing, unverified). Email uses "570m² approx. floor area" (from the floor plan). Confirm land size from the title and align both.
4. Populate the Wilohurst segment (or send names/emails and Claude can load them).
5. Local clone shows `assets/homes/wilohurst/tour.mp4` as deleted — it's still in the repo and live; don't commit that deletion.
6. Carousel GIF is 4.0 MB. Fine for most clients; can trim to ~2.5 MB by dropping frames if deliverability/loading is a concern.

## 17 Elysium Road — note for next send

Invite went out Mon 7 Sep 12:15pm to the 47-contact segment. Two defects in that send (blue auto-links; "see attached calendar file" with nothing attached). Fix is already built in the Wilohurst template — port it before any Elysium resend/reminder: dead-anchor wrapping + hosted `.ics` (host one at `assets/homes/elysium/auction.ics`).

## Files in this session

- `wilohurst-auction-invite.html` — send-ready
- `wilohurst-auction-invite-PREVIEW.html` — view only
- Site assets (all live): `assets/homes/wilohurst/` → `17–22.jpg`, `hero@2x.jpg`, `tile-*.jpg` ×8, `auction-carousel.gif`, `auction.ics`; `assets/brand/qsir-logo-white@2x.png`
