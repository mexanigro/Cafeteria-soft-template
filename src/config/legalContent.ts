/**
 * Long-form legal copy keyed by niche id. Use placeholders like [BRAND_NAME],
 * [CONTACT_EMAIL], [ADDRESS] and run through `interpolateLegalPlaceholders`.
 */
export const LEGAL_LIBRARY: Record<
  string,
  { privacy?: string; terms?: string }
> = {
  aromaVivo: {
    privacy: `[BRAND_NAME] (“we”, “us”) respects your privacy. Contact: [CONTACT_EMAIL].`,
    terms: `Use of this site is subject to terms provided by [BRAND_NAME].`,
  },
  tattoo: {
    privacy: `[BRAND_NAME] collects booking information only as needed for appointments. Email: [CONTACT_EMAIL].`,
    terms: `Studio policies including deposits and cancellations apply to bookings with [BRAND_NAME].`,
  },
};

/** Replace [PLACEHOLDER] tokens with values from the map (uppercase keys). */
export function interpolateLegalPlaceholders(
  template: string,
  values: Record<string, string>
): string {
  return template.replace(/\[([A-Z0-9_]+)\]/g, (match, key: string) => {
    const v = values[key];
    return v !== undefined ? v : match;
  });
}
