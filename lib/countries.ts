// Data-driven registry of source-market countries TrueCare targets.
//
// This intentionally only lists countries with a REAL hub page built — do
// not add a country until its page actually exists under app/[slug]/. The
// country picker, header switcher, and hub pages all read from this list.
//
// Expansion note: the South Asia/Middle East countries were added first,
// backed by TrueCare's own Middle East market research. The Europe/Africa/
// Central Asia countries below were added at the founder's explicit
// direction to match a broader target list, with real photos/videos to be
// supplied per continent — hero copy for these is deliberately generic
// ("send your reports for a free review") rather than claiming specific
// market research that hasn't been done for them yet.

export type Country = {
  slug: string; // matches the app/[slug] route segment, e.g. "bd", "oman"
  name: string;
  flag: string; // emoji flag, used throughout the picker/switcher UI
  region: "South Asia" | "Middle East" | "Europe" | "Africa" | "Central Asia";
  languageToggle?: {
    code: string; // e.g. "bn"
    label: string; // e.g. "বাংলা"
  };
  heroHeadline: string;
  heroSub: string;
  whatsappMessage: string;
  // Treatment-specific landing pages that already exist for this country
  // (richer, ad-campaign-optimized pages) — link straight there instead of
  // the generic /[country]/[treatment] listing when one exists.
  treatmentPages: { treatmentSlug: string; path: string; label: string }[];
};

export const countries: Country[] = [
  // ---------- SOUTH ASIA ----------
  {
    slug: "bd",
    name: "Bangladesh",
    flag: "🇧🇩",
    region: "South Asia",
    languageToggle: { code: "bn", label: "বাংলা" },
    heroHeadline: "Quality care in India, close to home",
    heroSub: "Send us your reports — a specialist will review them and help you understand your options.",
    whatsappMessage: "Hello, I'm from Bangladesh and would like a medical review. Here are my reports.",
    treatmentPages: [
      { treatmentSlug: "cardiology", path: "/bd/cardiac-treatment-india", label: "Cardiac Treatment" },
      { treatmentSlug: "orthopedics", path: "/bd/knee-replacement-india", label: "Knee Replacement" },
    ],
  },

  // ---------- MIDDLE EAST ----------
  {
    slug: "oman",
    name: "Oman",
    flag: "🇴🇲",
    region: "Middle East",
    heroHeadline: "Quality care in India, matched to the right doctor for you",
    heroSub: "Send us your reports — a specialist will review them for free.",
    whatsappMessage: "Hello, I'm from Oman and would like a medical review. Here are my reports.",
    treatmentPages: [
      { treatmentSlug: "cardiology", path: "/oman/cardiac-treatment-india", label: "Cardiac Treatment" },
    ],
  },
  {
    slug: "kuwait",
    name: "Kuwait",
    flag: "🇰🇼",
    region: "Middle East",
    heroHeadline: "A second opinion, before you decide anything",
    heroSub: "Send your reports — get a specialist's view from India, free, before committing to treatment elsewhere.",
    whatsappMessage: "Hello, I'm from Kuwait and would like a medical review. Here are my reports.",
    treatmentPages: [
      { treatmentSlug: "cardiology", path: "/kuwait/cardiac-treatment-india", label: "Cardiac Treatment" },
    ],
  },
  {
    slug: "uae",
    name: "UAE",
    flag: "🇦🇪",
    region: "Middle East",
    heroHeadline: "Trusted specialists, a fraction of the cost",
    heroSub: "If you're weighing your options in the UAE, send your reports for a free specialist review and cost estimate.",
    whatsappMessage: "Hello, I'm in the UAE and would like a medical review. Here are my reports.",
    treatmentPages: [
      { treatmentSlug: "cardiology", path: "/uae/cardiac-treatment-india", label: "Cardiac Treatment" },
    ],
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    region: "Middle East",
    heroHeadline: "Reviewed by specialists across accredited hospitals",
    heroSub: "Send your reports for a free specialist review from India's leading medical teams.",
    whatsappMessage: "Hello, I'm from Saudi Arabia and would like a medical review. Here are my reports.",
    treatmentPages: [
      { treatmentSlug: "cardiology", path: "/saudi-arabia/cardiac-treatment-india", label: "Cardiac Treatment" },
    ],
  },
  {
    slug: "qatar",
    name: "Qatar",
    flag: "🇶🇦",
    region: "Middle East",
    heroHeadline: "A second opinion, from specialists in India",
    heroSub: "Send your reports for a free specialist review — no obligation, no pressure to decide anything yet.",
    whatsappMessage: "Hello, I'm from Qatar and would like a medical review. Here are my reports.",
    treatmentPages: [],
  },
  {
    slug: "bahrain",
    name: "Bahrain",
    flag: "🇧🇭",
    region: "Middle East",
    heroHeadline: "Quality care in India, matched to the right doctor for you",
    heroSub: "Send us your reports — a specialist will review them for free.",
    whatsappMessage: "Hello, I'm from Bahrain and would like a medical review. Here are my reports.",
    treatmentPages: [
      { treatmentSlug: "cardiology", path: "/bahrain/cardiac-treatment-india", label: "Cardiac Treatment" },
    ],
  },

  // ---------- EUROPE ----------
  {
    slug: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    region: "Europe",
    heroHeadline: "Skip the wait — quality care in India, sooner",
    heroSub: "Send your reports for a free specialist review and a realistic timeline.",
    whatsappMessage: "Hello, I'm from the UK and would like a medical review. Here are my reports.",
    treatmentPages: [],
  },

  // ---------- AFRICA ----------
  {
    slug: "zimbabwe",
    name: "Zimbabwe",
    flag: "🇿🇼",
    region: "Africa",
    heroHeadline: "Trusted specialists in India, a message away",
    heroSub: "Send your reports for a free specialist review — we'll help you understand your options.",
    whatsappMessage: "Hello, I'm from Zimbabwe and would like a medical review. Here are my reports.",
    treatmentPages: [],
  },
  {
    slug: "ethiopia",
    name: "Ethiopia",
    flag: "🇪🇹",
    region: "Africa",
    heroHeadline: "Trusted specialists in India, a message away",
    heroSub: "Send your reports for a free specialist review — we'll help you understand your options.",
    whatsappMessage: "Hello, I'm from Ethiopia and would like a medical review. Here are my reports.",
    treatmentPages: [],
  },
  {
    slug: "dr-congo",
    name: "DR Congo",
    flag: "🇨🇩",
    region: "Africa",
    heroHeadline: "Trusted specialists in India, a message away",
    heroSub: "Send your reports for a free specialist review — we'll help you understand your options.",
    whatsappMessage: "Hello, I'm from DR Congo and would like a medical review. Here are my reports.",
    treatmentPages: [],
  },
  {
    slug: "cameroon",
    name: "Cameroon",
    flag: "🇨🇲",
    region: "Africa",
    heroHeadline: "Trusted specialists in India, a message away",
    heroSub: "Send your reports for a free specialist review — we'll help you understand your options.",
    whatsappMessage: "Hello, I'm from Cameroon and would like a medical review. Here are my reports.",
    treatmentPages: [],
  },
  {
    slug: "kenya",
    name: "Kenya",
    flag: "🇰🇪",
    region: "Africa",
    heroHeadline: "Trusted specialists in India, a message away",
    heroSub: "Send your reports for a free specialist review — we'll help you understand your options.",
    whatsappMessage: "Hello, I'm from Kenya and would like a medical review. Here are my reports.",
    treatmentPages: [],
  },
  {
    slug: "nigeria",
    name: "Nigeria",
    flag: "🇳🇬",
    region: "Africa",
    heroHeadline: "Trusted specialists in India, a message away",
    heroSub: "Send your reports for a free specialist review — we'll help you understand your options.",
    whatsappMessage: "Hello, I'm from Nigeria and would like a medical review. Here are my reports.",
    treatmentPages: [],
  },
  {
    slug: "botswana",
    name: "Botswana",
    flag: "🇧🇼",
    region: "Africa",
    heroHeadline: "Trusted specialists in India, a message away",
    heroSub: "Send your reports for a free specialist review — we'll help you understand your options.",
    whatsappMessage: "Hello, I'm from Botswana and would like a medical review. Here are my reports.",
    treatmentPages: [],
  },
  {
    slug: "uganda",
    name: "Uganda",
    flag: "🇺🇬",
    region: "Africa",
    heroHeadline: "Trusted specialists in India, a message away",
    heroSub: "Send your reports for a free specialist review — we'll help you understand your options.",
    whatsappMessage: "Hello, I'm from Uganda and would like a medical review. Here are my reports.",
    treatmentPages: [],
  },
  {
    slug: "ghana",
    name: "Ghana",
    flag: "🇬🇭",
    region: "Africa",
    heroHeadline: "Trusted specialists in India, a message away",
    heroSub: "Send your reports for a free specialist review — we'll help you understand your options.",
    whatsappMessage: "Hello, I'm from Ghana and would like a medical review. Here are my reports.",
    treatmentPages: [],
  },
  {
    slug: "tanzania",
    name: "Tanzania",
    flag: "🇹🇿",
    region: "Africa",
    heroHeadline: "Trusted specialists in India, a message away",
    heroSub: "Send your reports for a free specialist review — we'll help you understand your options.",
    whatsappMessage: "Hello, I'm from Tanzania and would like a medical review. Here are my reports.",
    treatmentPages: [],
  },

  // ---------- CENTRAL ASIA ----------
  {
    slug: "azerbaijan",
    name: "Azerbaijan",
    flag: "🇦🇿",
    region: "Central Asia",
    heroHeadline: "Trusted specialists in India, a message away",
    heroSub: "Send your reports for a free specialist review — we'll help you understand your options.",
    whatsappMessage: "Hello, I'm from Azerbaijan and would like a medical review. Here are my reports.",
    treatmentPages: [],
  },
  {
    slug: "uzbekistan",
    name: "Uzbekistan",
    flag: "🇺🇿",
    region: "Central Asia",
    heroHeadline: "Trusted specialists in India, a message away",
    heroSub: "Send your reports for a free specialist review — we'll help you understand your options.",
    whatsappMessage: "Hello, I'm from Uzbekistan and would like a medical review. Here are my reports.",
    treatmentPages: [],
  },
  {
    slug: "kazakhstan",
    name: "Kazakhstan",
    flag: "🇰🇿",
    region: "Central Asia",
    heroHeadline: "Trusted specialists in India, a message away",
    heroSub: "Send your reports for a free specialist review — we'll help you understand your options.",
    whatsappMessage: "Hello, I'm from Kazakhstan and would like a medical review. Here are my reports.",
    treatmentPages: [],
  },
];

export function getCountry(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug);
}

export const regions = ["South Asia", "Middle East", "Europe", "Africa", "Central Asia"] as const;
