/**
 * DEVAN GIESE CAMPAIGN CONFIGURATION
 * Update the committee, contact details, bio, approved endorsement wording,
 * and real links before publishing. Empty fields stay hidden.
 */
window.CAMPAIGN = {
  candidateName: "Devan Giese",
  // Must exactly match the registered committee's official name.
  registeredCommitteeName: "Friends of Devan Giese",

  // Use an email created for campaign communications, never a private inbox.
  contactEmail: "",

  // Optional: add a local image to assets/, then enter its relative path.
  // Example: "assets/devan-photo.jpg"
  candidatePhoto: "",

  // Tell your story in your own words. Separate paragraphs using \n\n.
  biography: "",

  // Use only approved wording and verify permission before publishing.
  endorsementConfirmed: false,
  endorsementQuote: "",

  // Live Events page: create a DIFFERENT public Google Calendar specifically
  // for campaign events (never expose your personal calendar). In Google
  // Calendar: Settings and sharing > Integrate calendar > Calendar ID.
  // Paste the ID below. This is a public identifier, not an API key.
  // Example format: "abc123def456@group.calendar.google.com"
  publicCalendarId: "",

  // Buttons and links appear only once valid destinations are supplied.
  volunteerUrl: "",
  donationUrl: "",
  socialUrl: ""
};
