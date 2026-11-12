# Green Bay District 9 Campaign Website

A responsive, static, single-page website for a nonpartisan Green Bay Common Council District 9 campaign. No tracking scripts, web framework, hosting fee or build step required.

## Before you publish

1. Open **site-config.js** in any text editor. Replace `YOUR NAME` with the name you use for the campaign. Use the **exact registered candidate committee name** for `registeredCommitteeName`. Wisconsin attribution rules require the actual committee name, not a nickname or abbreviation.
2. Enter a **public campaign email** and add your own background to `personalStory`. Blank email/volunteer/donate/social URLs automatically hide their buttons. `personalStory` may contain multiple paragraphs separated with blank lines.
3. **Verify the endorsement and obtain approval for its exact wording** before setting `endorsementConfirmed: true`. Until then, the site displays a visible verification note. It never invents a quote from Rep. Amaad Rivera-Wagner.
4. Review and edit the four policy descriptions. They are **sample language**, not independently confirmed commitments.
5. Add actual `https://` URLs for volunteer signups, compliant fundraising, and social updates only once those services are ready. No donation processing or data collection is implemented in the static site.
6. Confirm the site and any campaign spending meet applicable filing/registration obligations with the Green Bay Clerk and Wisconsin Ethics Commission. The footer disclaimer is intentionally prominent.
7. Avoid inserting an election date until you've confirmed the specific campaign cycle with the Clerk. The page contains no time-sensitive election date.

## Preview locally

Double-click **index.html**, or from the folder run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish for free

- **Netlify Drop:** Go to https://app.netlify.com/drop and drag the **unzipped** project folder into the page.
- **GitHub Pages:** Create a GitHub repository, upload the five files at its root, then enable Pages in repository Settings → Pages (deploy from main branch / root).
- **Cloudflare Pages:** Create a Pages project and upload the site as a static asset project.

You can connect a custom domain to any of those hosts. Test all links and the mobile menu after publishing.

## What's included

- `index.html` — accessible page structure and content
- `styles.css` — responsive layout and branding
- `site-config.js` — editable candidate name, legal disclaimer, story, contact and other links
- `app.js` — automatically inserts configuration values and powers the mobile menu
- `favicon.svg` — a simple GB9 site icon

## Sources reviewed (November 12, 2026)

- City of Green Bay, Running for Office: https://www.greenbaywi.gov/1046/Running-for-Office
- City of Green Bay, District 9 council page: https://www.greenbaywi.gov/DocumentCenter/View/7526/District-9-PDF
- Wisconsin Ethics Commission, attribution requirements: https://ethics.wi.gov/Pages/CampaignFinance/AttributionRequirements.aspx
- Wisconsin Ethics Commission, local candidate registration: https://ethics.wi.gov/Pages/CampaignFinance/Candidates.aspx

This is a website template, not legal advice. Information about the endorsement was supplied by the campaign and not independently confirmed for the unnamed candidate.
