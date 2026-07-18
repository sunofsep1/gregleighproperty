# Greg Leigh — Agent Site (Phase 1 scaffold)

A standalone, brand-matched agent website. Static HTML/CSS/JS — same clean stack as your funnel. Open `index.html` in a browser to preview.

## Pages
- `index.html` — Home (hero, featured sales, stats, testimonials carousel, about teaser, appraisal CTA)
- `sales.html` — Recent Sales gallery (suburb filter)
- `listings.html` — Current Listings
- `about.html` — About Greg
- `testimonials.html` — carousel + full review wall (your real 5.0 / 19 reviews, cleaned)
- `assets/styles.css` · `assets/site.js` · `assets/testimonials.js`

Every "Free Appraisal" button points to your live funnel (`redlandshomevalue.com.au`), so the lead engine stays the single source of truth.

## To make it real — the swap-in checklist

1. **Copy these assets from the funnel repo into `agent-site/assets/`:** `qsir-logo-navy.png`, `qsir-logo-white.png`, `greg-portrait.jpg`, `greg-avatar.jpg`. (Until then, tasteful fallbacks show.)
2. **Phone number:** every footer has a placeholder `04XX XXX XXX` / `tel:+61400000000` — replace with the number you want public.
3. **Homes:** in `sales.html` and `listings.html`, each `<article class="card">` is one property. Replace the placeholder media block with a real photo:
   ```html
   <div class="card__media"><span class="card__badge card__badge--sold">Sold</span>
     <img src="assets/homes/your-photo.jpg" alt="">
   </div>
   ```
   Then set suburb, beds/baths/car, one-liner, and the `Sold by [agent]` attribution (Jan etc.). `data-suburb="Cleveland"` drives the filter.
4. **About + Home teaser:** the `[Draft — Greg to refine]` paragraphs are placeholders — tweak to your voice.
5. **Stats bar** (Home): currently the true ones (5.0★, 19 reviews, Local). Only add "homes sold" figures if they're genuinely yours.

## Compliance built in
- Sold homes framed as **"Recent results from our Queensland Sotheby's Cleveland office"**, each with a `Sold by [agent]` credit — never implying you were the listing agent when you weren't.
- Reviews are your genuine, verified realestate.com.au reviews (suburbs removed per your call).
- "Appraisal" language throughout — never "valuation."

## Go live (when you're ready)
- New GitHub repo → Netlify (same commit-to-live flow as the funnel) → point your chosen domain (e.g. `gregleighproperty.com.au`) at it. I'll walk you through it just like last time.
