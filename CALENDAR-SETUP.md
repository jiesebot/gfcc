# Campaign Events: Google Calendar auto-update

The website includes a home-page upcoming-events embed and a separate `events.html` page. Both will automatically reflect your **public Google Calendar** without touching GitHub or using an API key.

## One-time Google Calendar setup (about 5 steps)

1. On a computer, visit https://calendar.google.com/ and sign in to the account that will manage campaign events. In the left sidebar, by **Other calendars**, click **+ → Create new calendar**. Name it **Friends of Devan Giese | Campaign Events**. Set the time zone to **Central Time (America/Chicago)**.
2. Open **Settings → Settings for my calendars → Friends of Devan Giese | Campaign Events → Access permissions for events** and enable **Make available to public**. Choose public event details, not free/busy only. **Do not make your personal calendar public.**
3. On the same calendar, open **Integrate calendar → Calendar ID**. Copy the ID. It may resemble `something@group.calendar.google.com`. This is a public identifier, *not* your Google password or private iCal URL.
4. Open `site-config.js` in your site's GitHub repository and paste the ID into `publicCalendarId: ""`, for example `publicCalendarId: "something@group.calendar.google.com",`.
5. Commit the updated `site-config.js`. Once deployed, `events.html` shows the live calendar, and the homepage shows its agenda view. Add, edit, or remove events directly in Google Calendar. No future website upload is needed for routine event updates.

**Important:** When entering a new event, explicitly select this *campaign* calendar from the event's Calendar dropdown. Other calendars will not appear in the campaign website. Treat all information in the public event, including location, event description, and any email/guest information, as public.

Google's embedded view can occasionally take a short time to reflect edits or may be blocked by a visitor's strict tracking/privacy settings. The event listings themselves are hosted and managed by Google, not GitHub. For a more custom-looking date-card display later, we can use a public calendar feed via a build process, but this approach is simpler and needs no API keys.

## Testing before calendar is connected

If `publicCalendarId` is empty, visitors see a friendly upcoming-events placeholder instead of fabricated dates or a broken embed. Both pages and navigation already work. The site never publishes your personal Google Calendar unless you explicitly supply its calendar ID and make it public.

## Sources
- Google Calendar: embedding a calendar: https://support.google.com/calendar/answer/41207
- Google Calendar: public sharing: https://support.google.com/calendar/answer/37083
- Finding a calendar ID: https://support.google.com/calendar/answer/44105
