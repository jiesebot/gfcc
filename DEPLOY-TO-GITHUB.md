# Devan Giese — GitHub Pages deployment (November 2026 update)

1. Extract the ZIP.
2. Upload **all files and the assets folder** to your GitHub Pages publishing folder (often the repository root), replacing older HTML/CSS/JS.
3. GitHub → Settings → Pages → Deploy from branch → select the branch and `/(root)` unless using `/docs`.
4. Confirm `index.html`, `styles.css`, `app.js`, and `site-config.js` are in the **same folder**. Keep `assets/` in that folder too.
5. Commit; allow GitHub Pages to deploy; hard-refresh with Ctrl+Shift+R.

## New Events / Calendar section
- `events.html` is now in the main navigation and the footer, and `index.html` has an **Upcoming Events** preview.
- Read **`CALENDAR-SETUP.md`** for one-time public Google Calendar setup. The calendar ID goes in `site-config.js` under `publicCalendarId`. Once connected, all future updates take place in Google Calendar, not on GitHub.
- No dates or events have been invented. Until the public calendar is connected, the page displays a friendly placeholder.

## Local header weather and time
- The local clock uses `Intl.DateTimeFormat` with `America/Chicago`; it tracks daylight saving time automatically even when your visitor is elsewhere.
- Weather is live via Open-Meteo's current conditions API (Green Bay: approx. 44.5133, -88.0133). It updates on loading and every 15 minutes while open; no API key is necessary for normal noncommercial use. Internet access is required.
- If the weather service is unavailable it displays **Weather unavailable**, never invented conditions. The clock still works. Check Open-Meteo licensing/terms before deployment, especially if expanding to commercial or high-traffic use: https://open-meteo.com/en/terms
- Weather source: https://open-meteo.com/en/docs ; add or keep appropriate service attribution when publishing.

## Before publishing
- Add real campaign contact details, biography and photo in `site-config.js`.
- Check committee registration and website disclaimer with election counsel/clerk: `Paid for by Friends of Devan Giese`.
- Obtain affirmative confirmation/approved wording before presenting the Rivera-Wagner endorsement as independently verified. `endorsementConfirmed` defaults to false.
- Campaign platform text is written in the candidate’s voice and must be approved by the candidate before publishing. Keep city legal counsel review and implementation details in campaign planning documents rather than the public-facing platform. The site does not assert that Green Bay already banned data centers or discontinued Flock.
- Maintain the site as a campaign site, clearly separate from the City's official website.

## Sources reviewed (no other council-member names appear on the site)
- UW Extension, data centers and local zoning: https://extension.wisc.edu/datacenters/
- Brown County moratorium discussion (June 2026): https://www.wbay.com/2026/06/02/brown-county-officials-discuss-proposed-data-center-moratorium/
- Town of Lawrence data-center temporary moratorium (Nov 9, 2026), a separate jurisdiction: https://www.lawrencewi.gov/DocumentCenter/View/1498/2026-011-Resolution-Data-Center-Moratorium
- Green Bay 2050 plan and safe walk/bike planning: https://www.greenbaywi.gov/514/Planning
- District 9 places and 2026 local race context: https://www.wbay.com/2026/02/16/four-candidates-compete-replace-green-bay-council-president/
- Green Bay economic and social bill of rights (July 2026): https://www.wbay.com/2026/07/22/green-bay-city-council-approves-resolution-proclaiming-economic-social-bill-rights/
- District 9 alder's 2026 campaign priorities (for research only): https://www.benforgreenbay.com/about/
- Former District 9 alder campaign materials (for research only): https://brianjohnsongb.com/
- Council vacant-commercial-property debate: https://www.aol.com/articles/vacant-business-fees-registry-stall-144623000.html

## Policy research background (November 2026)
- Green Bay Police policy and audit records, including Flock contract: https://www.greenbaywi.gov/1223/Policy-Manual
- WBAY (Sept. 14, 2026): City retains Flock while proposing a shorter data retention window: https://www.wbay.com/2026/09/15/green-bay-keeps-flock-cameras-with-updated-policy-de-pere-end-contract/
- WBAY (Dec. 16, 2025): New five-year Flock contract including drones and ALPRs: https://www.wbay.com/2025/12/17/green-bay-common-council-approves-contract-first-responder-drones/
- WBAY (June 13, 2025): Green Bay Police Department statements on immigration enforcement: https://www.wbay.com/2025/06/13/green-bay-police-posts-video-about-immigration-enforcement-city/
- Wisconsin Extension (Oct. 2026): Data-center zoning and moratoria in Wisconsin: https://extension.wisc.edu/wisconsin-data-center-moratorium-listing/

The positions expressed in public website copy are policy commitments, not factual claims about powers already exercised. Do not publish unverified assertions about agency misconduct, specific elected officials’ positions, or immigration-enforcement incidents.
