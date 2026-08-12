export type Lang = "en" | "bn";

export const content = {
  en: {
    bdBadge: "For Patients from Bangladesh",
    langToggle: { en: "English", bn: "বাংলা" },
    nav: {
      book: "Share Medical Reports",
    },
    hero: {
      headline: "Considering Knee Replacement in India?",
      subheadline:
        "Explore knee replacement treatment options with an experienced joint-replacement specialist in India and get help coordinating your medical journey.",
      ctaPrimary: "Share Your Medical Reports",
      ctaSecondary: "Chat on WhatsApp",
      trustPoints: [
        "International Patient Assistance",
        "Hospital Coordination",
        "Treatment Information",
        "Travel Guidance",
      ],
    },
    trustStrip: {
      title: "Why patients choose TrueCare",
      items: [
        { title: "Hospital Coordination", desc: "We help connect your case with the relevant hospital and specialist team." },
        { title: "Specialist Access", desc: "Coordination with an experienced joint-replacement specialist in India." },
        { title: "International Patient Support", desc: "Guidance through the parts of the journey outside the operating room." },
        { title: "Clear Next Steps", desc: "You'll know what happens after each stage — no guessing." },
      ],
    },
    howItWorks: {
      title: "Get Started in 3 Simple Steps",
      steps: [
        {
          title: "Share Your Reports",
          desc: "Submit your recent medical reports and basic case information securely.",
        },
        {
          title: "Case Coordination",
          desc: "TrueCare helps coordinate your case with the relevant hospital and specialist team.",
        },
        {
          title: "Understand Your Options",
          desc: "Receive information from the hospital about the proposed treatment, next steps, and estimated costs where available.",
        },
      ],
      note:
        "TrueCare coordinates your case; clinical decisions are made by qualified doctors and hospitals, not by TrueCare.",
    },
    doctor: {
      title: "Meet the Specialist",
      cta: "Share Reports for Review",
      expertiseLabel: "Areas of expertise",
      expertise: ["Joint replacement", "Knee replacement", "Revision joint replacement"],
    },
    hospital: {
      title: "Hospital Support in Noida",
      note: "Treatment is provided by the independent hospital and its medical professionals. TrueCare coordinates your case but does not operate or clinically represent the hospital.",
      infoLabel: "Hospital information",
    },
    education: {
      title: "Understanding Knee Replacement",
      disclaimer:
        "Information on this page is for general educational purposes and does not replace medical advice or diagnosis from a qualified healthcare professional.",
      blocks: [
        {
          h: "What is knee replacement?",
          p: "Knee replacement is a surgical procedure in which a damaged knee joint is resurfaced with an artificial implant, aiming to reduce pain and restore movement.",
        },
        {
          h: "Why it may be recommended",
          p: "It's typically considered when joint pain and stiffness — often from arthritis or injury — significantly limit daily activity and haven't improved with other treatments.",
        },
        {
          h: "General types of knee replacement",
          p: "Depending on the extent of joint damage, a surgeon may recommend total knee replacement, partial (unicompartmental) replacement, or revision surgery for a previous implant.",
        },
        {
          h: "Why patients seek treatment abroad",
          p: "Patients often look beyond their home country for reasons such as specialist access, treatment timelines, or cost — while still expecting quality care and clear communication.",
        },
        {
          h: "Why medical evaluation matters",
          p: "Every case is different. A qualified specialist needs to review your reports and history before any treatment plan or recommendation can be made.",
        },
      ],
    },
    cost: {
      title: "How Much Does Knee Replacement Cost in India?",
      body: "Total cost may depend on several factors, including:",
      factors: [
        "Type of procedure",
        "Patient condition",
        "Implant/prosthesis requirements",
        "Hospital stay",
        "Investigations",
        "Surgeon/clinical assessment",
        "Rehabilitation",
      ],
      fallback: "Share your medical reports to request an individualized treatment estimate.",
      cta: "Request a Treatment Estimate",
    },
    reports: {
      title: "What Should You Share With Us?",
      body: "Please share your recent medical records and relevant imaging/investigation reports. Our team will let you know if additional documents are needed.",
      uploadLabel: "Upload files or drag and drop",
      uploadHint: "PDF, JPG, PNG, HEIC, TIFF, DOC, XLS — up to 50MB per file, max 5 files",
      privacy: "Your reports are sent securely and are never made publicly accessible.",
    },
    support: {
      title: "Support Beyond the Hospital",
      before: {
        title: "Before Travel",
        items: ["Case coordination", "Appointment coordination", "Hospital communication", "Treatment information", "Travel/visa guidance where applicable"],
      },
      during: {
        title: "During Treatment",
        items: ["Patient coordination", "Communication support", "Local assistance where actually available"],
      },
      after: {
        title: "After Treatment",
        items: ["Follow-up coordination", "Document coordination", "Remote communication support where available"],
      },
      note: "TrueCare coordinates your journey; it does not provide medical treatment itself.",
    },
    faqTitle: "Frequently Asked Questions",
    faqs: [
      { q: "How much does knee replacement cost in India?", a: "Cost depends on the type of procedure, implant choice, hospital stay, and your specific case. Share your medical reports to request an individualized estimate." },
      { q: "How long might I need to stay in India?", a: "Knee replacement typically requires 10–14 days in India, including physiotherapy, before you are cleared to travel home. Your treating team will confirm an exact timeline after reviewing your case." },
      { q: "What reports should I share?", a: "Please share your recent medical records and relevant imaging or investigation reports, such as X-rays or MRI scans if available. Our team will let you know if anything more is needed." },
      { q: "How is a specialist identified for my case?", a: "TrueCare coordinates with the relevant hospital and specialist team based on the information in your reports. The clinical assessment and treatment decision are made by the hospital's doctors, not by TrueCare." },
      { q: "Can a family member accompany me?", a: "Yes, many patients travel with a family member or companion. We can share general guidance on travel and stay arrangements for accompanying persons." },
      { q: "How does the medical visa process work?", a: "India offers a medical visa category for international patients seeking treatment. We can share general guidance on the process; the final application is handled through the relevant Indian embassy or consulate." },
      { q: "How quickly can I receive a hospital response?", a: "Once your reports are submitted, our patient coordination team reviews the information and aims to follow up promptly with next steps." },
      { q: "What happens after I submit my reports?", a: "Our patient coordination team reviews the information you've shared and reaches out regarding next steps, which may include a request for additional information before the hospital's clinical team responds." },
      { q: "Can I speak to someone on WhatsApp?", a: "Yes. You can chat with TrueCare on WhatsApp at any time using the button on this page." },
      { q: "What happens if the hospital needs more information?", a: "Our coordination team will reach out to you directly to request any additional reports or details the hospital's clinical team needs before proceeding." },
    ],
    finalCta: {
      headline: "Have Questions About Knee Replacement in India?",
      sub: "Share your reports and let TrueCare help coordinate the next steps.",
      primary: "Share Medical Reports",
      secondary: "Chat on WhatsApp",
    },
    whatsappFloat: "Chat with TrueCare",
    reportForm: {
      fields: {
        name: "Full Name",
        country: "Country",
        whatsapp: "WhatsApp Number",
        email: "Email (optional)",
        age: "Patient Age",
        timeline: "Preferred Treatment Timeline",
        condition: "Short description of condition",
        reports: "Upload Medical Reports",
      },
      placeholders: {
        name: "Your full name",
        country: "Bangladesh",
        whatsapp: "+880 1XXXXXXXXX",
        email: "you@example.com",
        age: "e.g. 58",
        timeline: "e.g. Within 1 month, Flexible",
        condition: "Briefly describe the knee condition, symptoms, or prior diagnosis",
      },
      requiredLegend: "Fields marked with * are required.",
      uploadLabel: "Upload files or drag and drop",
      uploadHint: "PDF, JPG, PNG, HEIC, TIFF, DOC, XLS — up to 50MB per file, max 5 files",
      privacyNotice: "Your reports are sent securely and are never made publicly accessible.",
      submit: "Submit My Reports",
      submitting: "Submitting...",
      uploading: "Uploading reports...",
      successTitle: "Thank you. We've received your request.",
      successBody: "Our patient coordination team will review the information provided and contact you regarding the next steps.",
      continueOnWhatsapp: "Continue on WhatsApp",
      whatsappPrefill: "Hello TrueCare, I have submitted my reports regarding knee treatment in India. My name is {name}.",
      disclaimer: "Your information is used only to coordinate your care and is never shared with third parties for marketing purposes.",
      errors: {
        name: "Please enter your name.",
        country: "Please enter your country.",
        whatsapp: "Please enter a WhatsApp number with country code.",
        whatsappFormat: "That doesn't look like a valid WhatsApp number. Include your country code, e.g. +880 1XXXXXXXXX.",
        condition: "Please briefly describe the condition.",
        fileSize: '"{name}" is larger than the 50MB limit.',
        uploadFailed: 'Upload failed for "{name}". Please check your connection and try again.',
        generic: "Something went wrong. Please try again, or contact us on WhatsApp.",
        captchaRequired: "Please complete the verification check above before submitting.",
      },
    },
  },
  bn: {
    bdBadge: "বাংলাদেশ থেকে আসা রোগীদের জন্য",
    langToggle: { en: "English", bn: "বাংলা" },
    nav: {
      book: "মেডিকেল রিপোর্ট পাঠান",
    },
    hero: {
      headline: "ভারতে নী (হাঁটু) রিপ্লেসমেন্ট করাতে চান?",
      subheadline:
        "ভারতের একজন অভিজ্ঞ জয়েন্ট রিপ্লেসমেন্ট বিশেষজ্ঞের সাথে চিকিৎসার বিভিন্ন অপশন জেনে নিন এবং আপনার মেডিকেল ট্রিপ সমন্বয় করতে সাহায্য নিন।",
      ctaPrimary: "আপনার মেডিকেল রিপোর্ট পাঠান",
      ctaSecondary: "WhatsApp-এ চ্যাট করুন",
      trustPoints: [
        "আন্তর্জাতিক রোগী সহায়তা",
        "হাসপাতাল সমন্বয়",
        "চিকিৎসা সংক্রান্ত তথ্য",
        "ট্রাভেল গাইডেন্স",
      ],
    },
    trustStrip: {
      title: "রোগীরা কেন TrueCare বেছে নেন",
      items: [
        { title: "হাসপাতাল সমন্বয়", desc: "আমরা আপনার কেস সংশ্লিষ্ট হাসপাতাল ও বিশেষজ্ঞ টিমের সাথে সংযুক্ত করতে সাহায্য করি।" },
        { title: "বিশেষজ্ঞের অ্যাক্সেস", desc: "ভারতের একজন অভিজ্ঞ জয়েন্ট রিপ্লেসমেন্ট বিশেষজ্ঞের সাথে সমন্বয়।" },
        { title: "আন্তর্জাতিক রোগী সহায়তা", desc: "অপারেশন থিয়েটারের বাইরের যাত্রার অংশগুলোতেও গাইডেন্স।" },
        { title: "স্পষ্ট পরবর্তী পদক্ষেপ", desc: "প্রতিটি ধাপের পর কী হবে, তা আগে থেকেই জানতে পারবেন।" },
      ],
    },
    howItWorks: {
      title: "৩টি সহজ পদক্ষেপে শুরু করুন",
      steps: [
        {
          title: "আপনার রিপোর্ট পাঠান",
          desc: "নিরাপদভাবে আপনার সাম্প্রতিক মেডিকেল রিপোর্ট ও প্রাথমিক তথ্য জমা দিন।",
        },
        {
          title: "কেস সমন্বয়",
          desc: "TrueCare আপনার কেস সংশ্লিষ্ট হাসপাতাল ও বিশেষজ্ঞ টিমের সাথে সমন্বয় করতে সাহায্য করে।",
        },
        {
          title: "আপনার অপশনগুলো জানুন",
          desc: "হাসপাতাল থেকে প্রস্তাবিত চিকিৎসা, পরবর্তী পদক্ষেপ এবং সম্ভাব্য খরচ (যদি থাকে) সম্পর্কে তথ্য পাবেন।",
        },
      ],
      note: "TrueCare আপনার কেস সমন্বয় করে; ক্লিনিক্যাল সিদ্ধান্ত নেন যোগ্য ডাক্তার ও হাসপাতাল — TrueCare নয়।",
    },
    doctor: {
      title: "বিশেষজ্ঞের সাথে পরিচিত হন",
      cta: "রিভিউয়ের জন্য রিপোর্ট পাঠান",
      expertiseLabel: "বিশেষজ্ঞতার ক্ষেত্র",
      expertise: ["Joint replacement", "Knee replacement", "Revision joint replacement"],
    },
    hospital: {
      title: "নয়ডায় হাসপাতাল সহায়তা",
      note: "চিকিৎসা প্রদান করে স্বতন্ত্র হাসপাতাল এবং তাদের চিকিৎসকরা। TrueCare আপনার কেস সমন্বয় করে, কিন্তু হাসপাতাল পরিচালনা বা প্রতিনিধিত্ব করে না।",
      infoLabel: "হাসপাতাল সম্পর্কিত তথ্য",
    },
    education: {
      title: "নী (হাঁটু) রিপ্লেসমেন্ট বোঝা",
      disclaimer:
        "এই পৃষ্ঠার তথ্য সাধারণ শিক্ষামূলক উদ্দেশ্যে দেওয়া, এবং এটি কোনো যোগ্য চিকিৎসকের পরামর্শ বা রোগ নির্ণয়ের বিকল্প নয়।",
      blocks: [
        {
          h: "নী (হাঁটু) রিপ্লেসমেন্ট কী?",
          p: "নী রিপ্লেসমেন্ট একটি সার্জিক্যাল পদ্ধতি, যেখানে ক্ষতিগ্রস্ত হাঁটুর জয়েন্টকে একটি কৃত্রিম ইমপ্লান্ট দিয়ে প্রতিস্থাপন করা হয়, যার লক্ষ্য ব্যথা কমানো এবং চলাফেরার ক্ষমতা ফিরিয়ে আনা।",
        },
        {
          h: "কেন প্রয়োজন হতে পারে",
          p: "সাধারণত যখন আর্থ্রাইটিস বা আঘাতের কারণে জয়েন্টের ব্যথা ও স্টিফনেস দৈনন্দিন কাজে বড় বাধা তৈরি করে এবং অন্য চিকিৎসায় উন্নতি হয় না, তখন এটি বিবেচনা করা হয়।",
        },
        {
          h: "নী রিপ্লেসমেন্টের সাধারণ ধরন",
          p: "জয়েন্টের ক্ষতির পরিমাণ অনুযায়ী সার্জন টোটাল নী রিপ্লেসমেন্ট, পার্শিয়াল (ইউনিকম্পার্টমেন্টাল) রিপ্লেসমেন্ট, বা পূর্ববর্তী ইমপ্লান্টের জন্য রিভিশন সার্জারি সুপারিশ করতে পারেন।",
        },
        {
          h: "কেন রোগীরা বিদেশে চিকিৎসা খোঁজেন",
          p: "অনেক রোগী বিশেষজ্ঞের সহজলভ্যতা, চিকিৎসার সময়সূচি, বা খরচের কারণে দেশের বাইরে চিকিৎসা খোঁজেন — তবে তারপরও মানসম্পন্ন চিকিৎসা এবং স্পষ্ট যোগাযোগ প্রত্যাশা করেন।",
        },
        {
          h: "মেডিকেল মূল্যায়ন কেন গুরুত্বপূর্ণ",
          p: "প্রতিটি কেস আলাদা। কোনো চিকিৎসা পরিকল্পনা বা সুপারিশ দেওয়ার আগে একজন যোগ্য বিশেষজ্ঞকে আপনার রিপোর্ট ও ইতিহাস পর্যালোচনা করতে হবে।",
        },
      ],
    },
    cost: {
      title: "ভারতে নী রিপ্লেসমেন্টের খরচ কত?",
      body: "মোট খরচ নির্ভর করতে পারে বিভিন্ন বিষয়ের উপর, যেমন:",
      factors: [
        "পদ্ধতির ধরন",
        "রোগীর অবস্থা",
        "ইমপ্লান্ট/প্রস্থেসিসের প্রয়োজনীয়তা",
        "হাসপাতালে অবস্থানের সময়",
        "পরীক্ষা-নিরীক্ষা",
        "সার্জন/ক্লিনিক্যাল মূল্যায়ন",
        "রিহ্যাবিলিটেশন",
      ],
      fallback: "আপনার নির্দিষ্ট চিকিৎসার আনুমানিক খরচ জানতে আপনার মেডিকেল রিপোর্ট পাঠান।",
      cta: "চিকিৎসার আনুমানিক খরচ জানতে চান",
    },
    reports: {
      title: "আমাদের সাথে কী শেয়ার করবেন?",
      body: "আপনার সাম্প্রতিক মেডিকেল রেকর্ড এবং সংশ্লিষ্ট ইমেজিং/পরীক্ষার রিপোর্ট শেয়ার করুন। আর কোনো ডকুমেন্ট প্রয়োজন হলে আমাদের টিম জানিয়ে দেবে।",
      uploadLabel: "ফাইল আপলোড করুন বা ড্র্যাগ করে ছাড়ুন",
      uploadHint: "PDF, JPG, PNG, HEIC, TIFF, DOC, XLS — প্রতি ফাইল সর্বোচ্চ 50MB, সর্বোচ্চ ৫টি ফাইল",
      privacy: "আপনার রিপোর্ট নিরাপদভাবে পাঠানো হয় এবং কখনো পাবলিকলি প্রকাশ করা হয় না।",
    },
    support: {
      title: "হাসপাতালের বাইরেও সহায়তা",
      before: {
        title: "ট্রাভেলের আগে",
        items: ["কেস সমন্বয়", "অ্যাপয়েন্টমেন্ট সমন্বয়", "হাসপাতালের সাথে যোগাযোগ", "চিকিৎসা সংক্রান্ত তথ্য", "প্রয়োজন হলে ট্রাভেল/ভিসা গাইডেন্স"],
      },
      during: {
        title: "চিকিৎসার সময়",
        items: ["রোগীর সমন্বয়", "যোগাযোগ সহায়তা", "স্থানীয়ভাবে সম্ভব হলে সহায়তা"],
      },
      after: {
        title: "চিকিৎসার পরে",
        items: ["ফলো-আপ সমন্বয়", "ডকুমেন্ট সমন্বয়", "সম্ভব হলে রিমোট যোগাযোগ সহায়তা"],
      },
      note: "TrueCare আপনার যাত্রা সমন্বয় করে; এটি নিজে কোনো চিকিৎসা প্রদান করে না।",
    },
    faqTitle: "সচরাচর জিজ্ঞাসিত প্রশ্ন",
    faqs: [
      { q: "ভারতে নী রিপ্লেসমেন্টের খরচ কত?", a: "খরচ নির্ভর করে পদ্ধতির ধরন, ইমপ্লান্টের ধরন, হাসপাতালে অবস্থানের সময় এবং আপনার নির্দিষ্ট কেসের উপর। আনুমানিক খরচ জানতে আপনার মেডিকেল রিপোর্ট পাঠান।" },
      { q: "ভারতে আমাকে কতদিন থাকতে হতে পারে?", a: "নী রিপ্লেসমেন্টের জন্য সাধারণত ফিজিওথেরাপি সহ ১০–১৪ দিন ভারতে থাকতে হয়, তারপর দেশে ফেরার অনুমতি দেওয়া হয়। আপনার কেস পর্যালোচনার পর চিকিৎসক টিম সঠিক সময়সীমা নিশ্চিত করবে।" },
      { q: "আমার কী কী রিপোর্ট শেয়ার করা উচিত?", a: "আপনার সাম্প্রতিক মেডিকেল রেকর্ড এবং সংশ্লিষ্ট ইমেজিং বা পরীক্ষার রিপোর্ট (যেমন এক্স-রে বা এমআরআই, যদি থাকে) শেয়ার করুন। আরও কিছু প্রয়োজন হলে আমাদের টিম জানিয়ে দেবে।" },
      { q: "আমার কেসের জন্য বিশেষজ্ঞ কীভাবে নির্ধারণ করা হয়?", a: "আপনার রিপোর্টের তথ্যের ভিত্তিতে TrueCare সংশ্লিষ্ট হাসপাতাল ও বিশেষজ্ঞ টিমের সাথে সমন্বয় করে। ক্লিনিক্যাল মূল্যায়ন ও চিকিৎসার সিদ্ধান্ত হাসপাতালের ডাক্তাররাই নেন, TrueCare নয়।" },
      { q: "পরিবারের কেউ কি আমার সাথে আসতে পারবেন?", a: "হ্যাঁ, অনেক রোগী পরিবারের সদস্য বা সঙ্গীর সাথে আসেন। সঙ্গীদের ট্রাভেল ও থাকার ব্যবস্থা সম্পর্কে আমরা সাধারণ গাইডেন্স দিতে পারি।" },
      { q: "মেডিকেল ভিসার প্রক্রিয়া কীভাবে কাজ করে?", a: "ভারতে আন্তর্জাতিক রোগীদের জন্য মেডিকেল ভিসা ক্যাটাগরি রয়েছে। আমরা প্রক্রিয়া সম্পর্কে সাধারণ গাইডেন্স দিতে পারি; চূড়ান্ত আবেদন সংশ্লিষ্ট ভারতীয় দূতাবাস বা কনস্যুলেটের মাধ্যমে করতে হয়।" },
      { q: "হাসপাতাল থেকে কত দ্রুত সাড়া পাওয়া যাবে?", a: "রিপোর্ট জমা দেওয়ার পর আমাদের পেশেন্ট কোঅর্ডিনেশন টিম তথ্য পর্যালোচনা করে দ্রুত পরবর্তী পদক্ষেপ নিয়ে যোগাযোগ করার চেষ্টা করে।" },
      { q: "রিপোর্ট জমা দেওয়ার পর কী হবে?", a: "আমাদের টিম আপনার দেওয়া তথ্য পর্যালোচনা করে পরবর্তী পদক্ষেপ নিয়ে যোগাযোগ করবে, যার মধ্যে হাসপাতালের ক্লিনিক্যাল টিমের সাড়া দেওয়ার আগে অতিরিক্ত তথ্যের অনুরোধও থাকতে পারে।" },
      { q: "আমি কি WhatsApp-এ কারো সাথে কথা বলতে পারি?", a: "হ্যাঁ। এই পৃষ্ঠার বাটন ব্যবহার করে আপনি যেকোনো সময় TrueCare-এর সাথে WhatsApp-এ চ্যাট করতে পারেন।" },
      { q: "হাসপাতালের আরও তথ্য প্রয়োজন হলে কী হবে?", a: "হাসপাতালের ক্লিনিক্যাল টিমের প্রয়োজনীয় অতিরিক্ত রিপোর্ট বা তথ্যের জন্য আমাদের সমন্বয় টিম সরাসরি আপনার সাথে যোগাযোগ করবে।" },
    ],
    finalCta: {
      headline: "ভারতে নী রিপ্লেসমেন্ট সম্পর্কে প্রশ্ন আছে?",
      sub: "আপনার রিপোর্ট পাঠান, TrueCare পরবর্তী পদক্ষেপ সমন্বয় করতে সাহায্য করবে।",
      primary: "মেডিকেল রিপোর্ট পাঠান",
      secondary: "WhatsApp-এ চ্যাট করুন",
    },
    whatsappFloat: "TrueCare-এর সাথে চ্যাট করুন",
    reportForm: {
      fields: {
        name: "পূর্ণ নাম",
        country: "দেশ",
        whatsapp: "WhatsApp নম্বর",
        email: "ইমেইল (অপশনাল)",
        age: "রোগীর বয়স",
        timeline: "চিকিৎসার পছন্দের সময়সীমা",
        condition: "সমস্যার সংক্ষিপ্ত বর্ণনা",
        reports: "মেডিকেল রিপোর্ট আপলোড করুন",
      },
      placeholders: {
        name: "আপনার পূর্ণ নাম",
        country: "Bangladesh",
        whatsapp: "+880 1XXXXXXXXX",
        email: "you@example.com",
        age: "যেমন: 58",
        timeline: "যেমন: ১ মাসের মধ্যে, ফ্লেক্সিবল",
        condition: "হাঁটুর সমস্যা, লক্ষণ, বা পূর্ববর্তী রোগ নির্ণয় সংক্ষেপে লিখুন",
      },
      requiredLegend: "* চিহ্নিত ঘরগুলো পূরণ করা আবশ্যক।",
      uploadLabel: "ফাইল আপলোড করুন বা ড্র্যাগ করে ছাড়ুন",
      uploadHint: "PDF, JPG, PNG, HEIC, TIFF, DOC, XLS — প্রতি ফাইল সর্বোচ্চ 50MB, সর্বোচ্চ ৫টি ফাইল",
      privacyNotice: "আপনার রিপোর্ট নিরাপদভাবে পাঠানো হয় এবং কখনো পাবলিকলি প্রকাশ করা হয় না।",
      submit: "আমার রিপোর্ট জমা দিন",
      submitting: "জমা দেওয়া হচ্ছে...",
      uploading: "রিপোর্ট আপলোড হচ্ছে...",
      successTitle: "ধন্যবাদ। আমরা আপনার আবেদন পেয়েছি।",
      successBody: "আমাদের পেশেন্ট কোঅর্ডিনেশন টিম আপনার দেওয়া তথ্য পর্যালোচনা করে পরবর্তী পদক্ষেপ নিয়ে যোগাযোগ করবে।",
      continueOnWhatsapp: "WhatsApp-এ চালিয়ে যান",
      whatsappPrefill: "Hello TrueCare, আমি ভারতে নী চিকিৎসা সংক্রান্ত আমার রিপোর্ট জমা দিয়েছি। আমার নাম {name}।",
      disclaimer: "আপনার তথ্য শুধুমাত্র আপনার চিকিৎসা সমন্বয়ের জন্য ব্যবহৃত হয় এবং মার্কেটিং উদ্দেশ্যে কোনো তৃতীয় পক্ষের সাথে শেয়ার করা হয় না।",
      errors: {
        name: "আপনার নাম লিখুন।",
        country: "আপনার দেশের নাম লিখুন।",
        whatsapp: "কান্ট্রি কোড সহ WhatsApp নম্বর লিখুন।",
        whatsappFormat: "এটি সঠিক WhatsApp নম্বর মনে হচ্ছে না। কান্ট্রি কোড সহ লিখুন, যেমন +880 1XXXXXXXXX।",
        condition: "সংক্ষেপে সমস্যার বর্ণনা দিন।",
        fileSize: '"{name}" ফাইলটি 50MB সীমার চেয়ে বড়।',
        uploadFailed: '"{name}" আপলোড ব্যর্থ হয়েছে। আপনার ইন্টারনেট সংযোগ চেক করে আবার চেষ্টা করুন।',
        generic: "কিছু ভুল হয়েছে। আবার চেষ্টা করুন, বা WhatsApp-এ যোগাযোগ করুন।",
        captchaRequired: "জমা দেওয়ার আগে উপরের ভেরিফিকেশন চেকটি সম্পূর্ণ করুন।",
      },
    },
  },
} as const;
