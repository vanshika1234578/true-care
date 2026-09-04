export type Lang = "en" | "bn";

// Content follows the trust-first UX brief exactly: no unverifiable claims
// ("best", "guaranteed", "no.1"), no fake urgency, no invented statistics.
// Trust strip items below are only claims already established elsewhere in
// this codebase (verified partner hospitals, NABH/JCI accreditation on real
// hospital records in lib/data.ts) — nothing here is fabricated.

export const content = {
  en: {
    langToggle: { en: "English", bn: "বাংলা" },

    hero: {
      eyebrow: "🇧🇩 For Patients from Bangladesh",
      headline: "Trusted Medical Treatment Abroad, With Support at Every Step",
      sub: "Tell us about your treatment needs. Our patient care team can help you understand hospital and doctor options, expected costs, appointments and travel-related steps.",
      ctaPrimary: "Get Treatment Assistance",
      ctaSecondary: "Talk to a Patient Coordinator",
      nextStepsLabel: "What happens after you reach out",
      nextSteps: [
        "Tell us about the treatment you need",
        "A patient coordinator reviews your request",
        "We help you understand suitable hospital/doctor options",
        "You decide whether you want to proceed",
      ],
    },

    trustStrip: {
      title: "What We Can Confirm",
      items: [
        "Verified hospital partners",
        "Dedicated patient coordinator",
        "Bangla-speaking assistance",
        "Transparent treatment estimates",
        "Assistance before and during travel",
        "Support for patients and accompanying family",
      ],
    },

    leadForm: {
      eyebrow: "Free Enquiry",
      title: "How can we help you?",
      description: "Share a few details about the treatment you are looking for. Our patient care team will contact you to understand your requirements.",
      nameLabel: "Patient Name",
      namePlaceholder: "Full name",
      phoneLabel: "Mobile / WhatsApp Number",
      phonePlaceholder: "1XXX XXXXXX",
      concernLabel: "Treatment or Medical Concern",
      concernPlaceholder: "Briefly describe the condition or treatment you're looking into",
      cityLabel: "City / District (optional)",
      cityPlaceholder: "e.g. Dhaka, Chattogram",
      reportsLabel: "Have medical reports? (optional)",
      reportsHelp: "You can upload them to help us understand your case faster. This step is optional — you can also share reports later, after we've spoken with you.",
      privacyNote: "Your information will only be used to assist with your treatment enquiry, and may be shared with a relevant hospital or doctor only with your knowledge.",
      commitmentNote: "Submitting this enquiry does not commit you to any treatment.",
      submit: "Request a Call Back",
      submitting: "Sending...",
      successMsg: "Thank you. A patient coordinator will contact you shortly.",
      errorMsg: "Something went wrong. Please try again, or contact us directly on WhatsApp.",
    },

    howItWorks: {
      eyebrow: "How It Works",
      title: "A Clear, Unhurried Process",
      steps: [
        { n: "01", title: "Tell Us About Your Treatment", description: "Share what you or your family member needs help with." },
        { n: "02", title: "Share Medical Reports", description: "Only when needed, and only with your permission." },
        { n: "03", title: "Receive Treatment Options", description: "We explain available doctors, hospitals, and estimated costs." },
        { n: "04", title: "Plan Your Visit", description: "We help with appointments and relevant travel arrangements." },
        { n: "05", title: "Travel for Treatment", description: "You'll know exactly whom to contact throughout the journey." },
      ],
    },

    doctors: {
      eyebrow: "Our Doctors",
      title: "Real Specialists, Verified Credentials",
      description: "We never invent qualifications. Every profile below reflects what the hospital has confirmed.",
    },

    hospitals: {
      eyebrow: "Our Hospital Partners",
      title: "Where Treatment Takes Place",
    },

    cost: {
      eyebrow: "Cost Transparency",
      title: "Understand the Expected Cost Before You Travel",
      description: "Treatment costs vary according to diagnosis, doctor, hospital, investigations, and treatment complexity. The figures below are estimated ranges, not guaranteed prices.",
      items: [
        { treatment: "Cardiac procedures (e.g. bypass, valve replacement)", range: "$6,000 – $9,000", includes: "Surgery, hospital stay, standard follow-up", excludes: "Travel, accommodation, extended complications" },
        { treatment: "Orthopedic procedures (e.g. knee/hip replacement)", range: "$4,000 – $9,000", includes: "Surgery, implant, hospital stay, physiotherapy", excludes: "Travel, accommodation, extended rehabilitation" },
      ],
      cta: "Request a Treatment Estimate",
    },

    whyChooseUs: {
      eyebrow: "Why Patients Reach Out To Us",
      title: "Practical Support, Not Just Promises",
      items: [
        "Bangla-speaking coordinators",
        "Hospital and doctor selection assistance",
        "Treatment estimate assistance",
        "Appointment coordination",
        "Medical report coordination",
        "Travel guidance",
        "Support for accompanying family",
        "Single point of contact throughout the journey",
      ],
    },

    faq: {
      eyebrow: "Frequently Asked Questions",
      title: "Questions Patients Often Ask",
      items: [
        { q: "How do I choose the right hospital?", a: "Share your medical concern with us, and a patient coordinator will explain which of our verified hospital partners are relevant to your case." },
        { q: "How do I know the doctors/hospitals are genuine?", a: "We only work with hospitals we have a direct, verified relationship with. Doctor profiles reflect credentials confirmed by the hospital." },
        { q: "How much will treatment cost?", a: "Cost depends on your specific diagnosis and treatment plan. We share an estimated range once we understand your case — see our Cost Transparency section above." },
        { q: "Can I get an estimate before travelling?", a: "Yes. A treatment estimate is prepared based on your medical reports and shared with you before any travel commitment." },
        { q: "Can I speak with someone in Bangla?", a: "Yes, our patient coordinators can assist you in Bangla or English." },
        { q: "How do I share my medical reports?", a: "You can upload reports through this page, or share them with your coordinator later — whichever is easier for you." },
        { q: "Will my medical information remain private?", a: "Your information is used only to assist with your enquiry, and shared with a hospital or doctor only with your knowledge." },
        { q: "How quickly can I get an appointment?", a: "This depends on the treating hospital and specialist's availability. Your coordinator will confirm realistic timing once your case is reviewed." },
        { q: "Can someone travel with the patient?", a: "Yes, family members or companions are welcome, and we can help with their travel arrangements too." },
        { q: "What assistance do you provide for travel?", a: "We can help with guidance on medical visa requirements and coordinating travel-related arrangements." },
        { q: "What happens after I submit the enquiry?", a: "A patient coordinator reviews your request and contacts you to understand your treatment needs in more detail." },
        { q: "Do I have to pay anything to submit an enquiry?", a: "No. Submitting an enquiry and receiving an initial response is free." },
      ],
    },

    finalCta: {
      headline: "Not Sure Where to Start?",
      sub: "Tell us what treatment you are looking for. A patient care coordinator can explain the next steps and help you understand your options.",
      primary: "Talk to a Patient Coordinator",
      secondary: "Request a Call Back",
    },

    whatsappMessage: "Hello, I'm from Bangladesh and would like help understanding my treatment options in India.",
  },
  bn: {
    langToggle: { en: "English", bn: "বাংলা" },

    hero: {
      eyebrow: "🇧🇩 বাংলাদেশের রোগীদের জন্য",
      headline: "বিদেশে বিশ্বস্ত চিকিৎসা, প্রতিটি ধাপে সহায়তাসহ",
      sub: "আপনার চিকিৎসার প্রয়োজন সম্পর্কে আমাদের জানান। আমাদের পেশেন্ট কেয়ার টিম হাসপাতাল ও ডাক্তারের বিকল্প, সম্ভাব্য খরচ, অ্যাপয়েন্টমেন্ট এবং ভ্রমণ সংক্রান্ত ধাপগুলো বুঝতে সাহায্য করতে পারে।",
      ctaPrimary: "চিকিৎসা সহায়তা নিন",
      ctaSecondary: "পেশেন্ট কো-অর্ডিনেটরের সাথে কথা বলুন",
      nextStepsLabel: "যোগাযোগ করার পর যা ঘটবে",
      nextSteps: [
        "আপনার প্রয়োজনীয় চিকিৎসা সম্পর্কে আমাদের জানান",
        "একজন পেশেন্ট কো-অর্ডিনেটর আপনার অনুরোধ পর্যালোচনা করবেন",
        "আমরা উপযুক্ত হাসপাতাল/ডাক্তারের বিকল্প বুঝতে সাহায্য করব",
        "আপনি সিদ্ধান্ত নেবেন এগিয়ে যেতে চান কিনা",
      ],
    },

    trustStrip: {
      title: "আমরা যা নিশ্চিত করতে পারি",
      items: [
        "যাচাইকৃত হাসপাতাল পার্টনার",
        "নিবেদিত পেশেন্ট কো-অর্ডিনেটর",
        "বাংলা-ভাষী সহায়তা",
        "স্বচ্ছ চিকিৎসা খরচের হিসাব",
        "ভ্রমণের আগে ও চলাকালীন সহায়তা",
        "রোগী ও সঙ্গী পরিবারের জন্য সহায়তা",
      ],
    },

    leadForm: {
      eyebrow: "ফ্রি অনুসন্ধান",
      title: "আমরা কীভাবে সাহায্য করতে পারি?",
      description: "আপনি যে চিকিৎসা খুঁজছেন তার সম্পর্কে কিছু তথ্য শেয়ার করুন। আমাদের পেশেন্ট কেয়ার টিম আপনার প্রয়োজন বুঝতে যোগাযোগ করবে।",
      nameLabel: "রোগীর নাম",
      namePlaceholder: "পূর্ণ নাম",
      phoneLabel: "মোবাইল / হোয়াটসঅ্যাপ নম্বর",
      phonePlaceholder: "1XXX XXXXXX",
      concernLabel: "চিকিৎসা বা স্বাস্থ্য সমস্যা",
      concernPlaceholder: "আপনি যে অবস্থা বা চিকিৎসা সম্পর্কে জানতে চান তা সংক্ষেপে লিখুন",
      cityLabel: "শহর / জেলা (ঐচ্ছিক)",
      cityPlaceholder: "যেমন: ঢাকা, চট্টগ্রাম",
      reportsLabel: "মেডিকেল রিপোর্ট আছে? (ঐচ্ছিক)",
      reportsHelp: "আপনার কেস দ্রুত বুঝতে সাহায্য করতে আপলোড করতে পারেন। এই ধাপটি ঐচ্ছিক — আপনি চাইলে কথা বলার পরও রিপোর্ট শেয়ার করতে পারেন।",
      privacyNote: "আপনার তথ্য শুধুমাত্র আপনার অনুসন্ধানে সহায়তার জন্য ব্যবহৃত হবে, এবং শুধুমাত্র আপনার জ্ঞাতসারে প্রাসঙ্গিক হাসপাতাল বা ডাক্তারের সাথে শেয়ার করা হতে পারে।",
      commitmentNote: "এই অনুসন্ধান জমা দেওয়া আপনাকে কোনো চিকিৎসায় বাধ্য করে না।",
      submit: "কল ব্যাক অনুরোধ করুন",
      submitting: "পাঠানো হচ্ছে...",
      successMsg: "ধন্যবাদ। একজন পেশেন্ট কো-অর্ডিনেটর শীঘ্রই আপনার সাথে যোগাযোগ করবেন।",
      errorMsg: "কিছু ভুল হয়েছে। আবার চেষ্টা করুন, অথবা সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করুন।",
    },

    howItWorks: {
      eyebrow: "যেভাবে এটি কাজ করে",
      title: "একটি স্পষ্ট, তাড়াহুড়াবিহীন প্রক্রিয়া",
      steps: [
        { n: "০১", title: "আপনার চিকিৎসা সম্পর্কে আমাদের জানান", description: "আপনার বা পরিবারের সদস্যের কী সহায়তা প্রয়োজন তা শেয়ার করুন।" },
        { n: "০২", title: "মেডিকেল রিপোর্ট শেয়ার করুন", description: "শুধুমাত্র প্রয়োজন হলে, এবং শুধুমাত্র আপনার অনুমতিতে।" },
        { n: "০৩", title: "চিকিৎসার বিকল্প পান", description: "আমরা উপলব্ধ ডাক্তার, হাসপাতাল এবং আনুমানিক খরচ ব্যাখ্যা করি।" },
        { n: "০৪", title: "আপনার সফর পরিকল্পনা করুন", description: "আমরা অ্যাপয়েন্টমেন্ট ও প্রাসঙ্গিক ভ্রমণ ব্যবস্থায় সাহায্য করি।" },
        { n: "০৫", title: "চিকিৎসার জন্য ভ্রমণ করুন", description: "পুরো যাত্রা জুড়ে আপনি জানবেন কার সাথে যোগাযোগ করতে হবে।" },
      ],
    },

    doctors: {
      eyebrow: "আমাদের ডাক্তারগণ",
      title: "প্রকৃত বিশেষজ্ঞ, যাচাইকৃত যোগ্যতা",
      description: "আমরা কখনো যোগ্যতা তৈরি করি না। নিচের প্রতিটি প্রোফাইল হাসপাতাল যা নিশ্চিত করেছে তা প্রতিফলিত করে।",
    },

    hospitals: {
      eyebrow: "আমাদের হাসপাতাল পার্টনার",
      title: "যেখানে চিকিৎসা হবে",
    },

    cost: {
      eyebrow: "খরচের স্বচ্ছতা",
      title: "ভ্রমণের আগে সম্ভাব্য খরচ জেনে নিন",
      description: "চিকিৎসার খরচ রোগ নির্ণয়, ডাক্তার, হাসপাতাল, পরীক্ষা এবং চিকিৎসার জটিলতার উপর নির্ভর করে পরিবর্তিত হয়। নিচের পরিসংখ্যান আনুমানিক, নিশ্চিত মূল্য নয়।",
      items: [
        { treatment: "কার্ডিয়াক প্রক্রিয়া (যেমন বাইপাস, ভালভ রিপ্লেসমেন্ট)", range: "$6,000 – $9,000", includes: "সার্জারি, হাসপাতালে থাকা, সাধারণ ফলো-আপ", excludes: "ভ্রমণ, থাকার ব্যবস্থা, দীর্ঘমেয়াদী জটিলতা" },
        { treatment: "অর্থোপেডিক প্রক্রিয়া (যেমন নী/হিপ রিপ্লেসমেন্ট)", range: "$4,000 – $9,000", includes: "সার্জারি, ইমপ্ল্যান্ট, হাসপাতালে থাকা, ফিজিওথেরাপি", excludes: "ভ্রমণ, থাকার ব্যবস্থা, দীর্ঘমেয়াদী পুনর্বাসন" },
      ],
      cta: "চিকিৎসার খরচের হিসাব চান",
    },

    whyChooseUs: {
      eyebrow: "রোগীরা কেন আমাদের কাছে আসেন",
      title: "শুধু প্রতিশ্রুতি নয়, বাস্তব সহায়তা",
      items: [
        "বাংলা-ভাষী কো-অর্ডিনেটর",
        "হাসপাতাল ও ডাক্তার নির্বাচনে সহায়তা",
        "চিকিৎসার খরচের হিসাবে সহায়তা",
        "অ্যাপয়েন্টমেন্ট সমন্বয়",
        "মেডিকেল রিপোর্ট সমন্বয়",
        "ভ্রমণ নির্দেশনা",
        "সঙ্গী পরিবারের জন্য সহায়তা",
        "পুরো যাত্রা জুড়ে একটি একক যোগাযোগ বিন্দু",
      ],
    },

    faq: {
      eyebrow: "সচরাচর জিজ্ঞাসিত প্রশ্ন",
      title: "রোগীরা প্রায়ই যে প্রশ্ন করেন",
      items: [
        { q: "আমি কীভাবে সঠিক হাসপাতাল বেছে নেব?", a: "আপনার স্বাস্থ্য সমস্যা আমাদের জানান, একজন পেশেন্ট কো-অর্ডিনেটর ব্যাখ্যা করবেন আমাদের যাচাইকৃত হাসপাতাল পার্টনারদের মধ্যে কোনটি আপনার কেসের জন্য প্রাসঙ্গিক।" },
        { q: "আমি কীভাবে জানব ডাক্তার/হাসপাতাল প্রকৃত?", a: "আমরা শুধুমাত্র সরাসরি, যাচাইকৃত সম্পর্ক আছে এমন হাসপাতালের সাথে কাজ করি। ডাক্তারের প্রোফাইল হাসপাতাল কর্তৃক নিশ্চিত যোগ্যতা প্রতিফলিত করে।" },
        { q: "চিকিৎসার খরচ কত হবে?", a: "খরচ আপনার নির্দিষ্ট রোগ নির্ণয় ও চিকিৎসা পরিকল্পনার উপর নির্ভর করে। আপনার কেস বোঝার পর আমরা একটি আনুমানিক পরিসীমা শেয়ার করি।" },
        { q: "ভ্রমণের আগে কি খরচের হিসাব পাওয়া যাবে?", a: "হ্যাঁ। আপনার মেডিকেল রিপোর্টের ভিত্তিতে একটি চিকিৎসার খরচের হিসাব তৈরি করে ভ্রমণের প্রতিশ্রুতির আগেই আপনার সাথে শেয়ার করা হয়।" },
        { q: "আমি কি বাংলায় কথা বলতে পারব?", a: "হ্যাঁ, আমাদের পেশেন্ট কো-অর্ডিনেটররা বাংলা বা ইংরেজিতে সাহায্য করতে পারেন।" },
        { q: "আমি কীভাবে মেডিকেল রিপোর্ট শেয়ার করব?", a: "আপনি এই পৃষ্ঠার মাধ্যমে রিপোর্ট আপলোড করতে পারেন, অথবা পরে আপনার কো-অর্ডিনেটরের সাথে শেয়ার করতে পারেন — যেটি আপনার জন্য সহজ।" },
        { q: "আমার মেডিকেল তথ্য কি গোপন থাকবে?", a: "আপনার তথ্য শুধুমাত্র আপনার অনুসন্ধানে সহায়তার জন্য ব্যবহৃত হয়, এবং শুধুমাত্র আপনার জ্ঞাতসারে হাসপাতাল বা ডাক্তারের সাথে শেয়ার করা হয়।" },
        { q: "কত দ্রুত অ্যাপয়েন্টমেন্ট পাওয়া যাবে?", a: "এটি চিকিৎসাকারী হাসপাতাল ও বিশেষজ্ঞের সময়ের উপর নির্ভর করে। আপনার কেস পর্যালোচনার পর কো-অর্ডিনেটর বাস্তবসম্মত সময় নিশ্চিত করবেন।" },
        { q: "রোগীর সাথে কি কেউ ভ্রমণ করতে পারবে?", a: "হ্যাঁ, পরিবারের সদস্য বা সঙ্গীরা স্বাগত, এবং আমরা তাদের ভ্রমণ ব্যবস্থাতেও সাহায্য করতে পারি।" },
        { q: "ভ্রমণের জন্য কী সহায়তা দেওয়া হয়?", a: "আমরা মেডিকেল ভিসার প্রয়োজনীয়তা সম্পর্কে দিকনির্দেশনা এবং ভ্রমণ সংক্রান্ত ব্যবস্থা সমন্বয়ে সাহায্য করতে পারি।" },
        { q: "অনুসন্ধান জমা দেওয়ার পর কী হবে?", a: "একজন পেশেন্ট কো-অর্ডিনেটর আপনার অনুরোধ পর্যালোচনা করে আপনার চিকিৎসার প্রয়োজন বিস্তারিত বুঝতে যোগাযোগ করবেন।" },
        { q: "অনুসন্ধান জমা দিতে কি কোনো খরচ আছে?", a: "না। অনুসন্ধান জমা দেওয়া এবং প্রাথমিক সাড়া পাওয়া সম্পূর্ণ বিনামূল্যে।" },
      ],
    },

    finalCta: {
      headline: "কোথা থেকে শুরু করবেন বুঝতে পারছেন না?",
      sub: "আপনি কোন চিকিৎসা খুঁজছেন তা আমাদের জানান। একজন পেশেন্ট কেয়ার কো-অর্ডিনেটর পরবর্তী ধাপগুলো ব্যাখ্যা করে আপনার বিকল্প বুঝতে সাহায্য করতে পারেন।",
      primary: "পেশেন্ট কো-অর্ডিনেটরের সাথে কথা বলুন",
      secondary: "কল ব্যাক অনুরোধ করুন",
    },

    whatsappMessage: "হ্যালো, আমি বাংলাদেশ থেকে এবং ভারতে আমার চিকিৎসার বিকল্পগুলো বুঝতে সাহায্য চাই।",
  },
} as const;
