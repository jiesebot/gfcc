# Devan Giese for Green Bay District 9: website

A multi-page, friendly, responsive campaign website with **no framework, subscription, analytics, trackers, backend, or build step**. It opens locally and can be uploaded to ordinary static hosting.

## Pages

- `index.html` — warm homepage with short previews and links into the full site
- `issues.html` — fuller housing, accessibility, workers, and transparency policy sections
- `about.html` — candidate background and approach
- `endorsements.html` — campaign-reported endorsement from Wisconsin State Rep. Amaad Rivera-Wagner; optional approved quotation
- `connect.html` — contact, volunteering, updates, donations (when configured), official election resources
- `styles.css` — all site colors, typography, layouts, and mobile styles
- `app.js` — menu, candidate info, photo replacement, and safely configured links
- `site-config.js` — **start here** to customize
- `assets/riverfront-illustration.svg` — original artistic neighborhood illustration; not a literal map or photograph
- `assets/portrait-placeholder.svg` — replaceable photo placeholder
- `favicon.svg` — website icon

## Important: before publishing

1. Open **`site-config.js`**, which already names the candidate **Devan Giese**. Replace `registeredCommitteeName` with your **exact registered campaign committee name**. Do not leave `[INSERT EXACT REGISTERED COMMITTEE NAME]` on a live site. All pages display a visible *Paid for by* attribution in their footer.
2. Enter a **public campaign email**, if available. Add links for `volunteerUrl`, `socialUrl`, and/or `donationUrl` only when they are live. Missing links are hidden instead of pointing to dead pages. Donation processing, registration, and email capture are intentionally not implemented by this static site.
3. Add a biography in `biography` (use `\n\n` between paragraphs). The website deliberately avoids inventing Devan's personal history.
4. To use an actual photo, place a licensed/authorized file in `assets/` (e.g. `devan-photo.jpg`) and set `candidatePhoto: "assets/devan-photo.jpg"`. The homepage and about page will both display it automatically. Avoid publishing a photograph without permission.
5. **Endorsement verification:** Devan's campaign supplied an endorsement by State Rep. Amaad Rivera-Wagner. Independent web research did not confirm *this particular endorsement of Devan*, so the site retains a visible publication check until you verify the statement and its approved language. After confirmation, set `endorsementConfirmed: true`; an optional approved statement can go in `endorsementQuote`. Do not invent or paraphrase an endorsement quote and attribute it to the representative.
6. Review **every drafted policy position** before publication. They are proposals for your editorial review, not independently verified statements made by Devan. Check any commitment, budget, program, or public-office terminology with the City Clerk or municipal counsel as applicable.
7. There is **no election date** listed, since the intended cycle was not confirmed. Do not add one without checking Green Bay's official notices.
8. The website uses an illustrative neighborhood scene, not a real portrait, recognizable landmark, or geographically accurate view. All visual assets are self-contained and do not depend on outside image servers.

## Preview on your PC

Just open `index.html` with Chrome, Edge, or Firefox. All five pages work without a server. Or from inside the folder run:

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Publishing for free

- **Netlify Drop:** https://app.netlify.com/drop (drag the **uncompressed folder** to upload)
- **GitHub Pages:** create a repository, add all files at its root, and enable Pages from the main branch
- **Cloudflare Pages:** publish the folder as a static site

Any domain registrar can supply a custom campaign domain. Test all five page links, the footer disclaimer, and mobile navigation after uploading.

## Palette

The design uses light apricot, warm coral, citrus yellow, sky blue, and soft mint, offset by deep blue-gray text for contrast. The palette is an artistic and accessibility choice, not a claim about scientifically proven persuasion effects.

## Official references reviewed on November 12, 2026

- Green Bay Clerk, running for office: https://www.greenbaywi.gov/1046/Running-for-Office
- Green Bay Elections: https://www.greenbaywi.gov/elections
- District 9 official council page: https://www.greenbaywi.gov/641/Ben-DeBaker
- Wisconsin Ethics Commission, campaign attribution rules: https://ethics.wi.gov/Pages/CampaignFinance/AttributionRequirements.aspx
- Wisconsin State Assembly District 90: https://www.amaadforgb.com/about

This template is not legal advice. Confirm filing, attribution, contribution, and authorization requirements before publishing campaign material.
