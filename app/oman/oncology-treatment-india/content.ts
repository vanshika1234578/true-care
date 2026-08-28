export type Lang = "en" | "ar";

interface SupportItem {
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface ContentShape {
  flag: string;
  badge: string;
  countryName: string;
  whatsappMessage: string;
  langToggle: {
    en: string;
    ar: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  leadForm: {
    eyebrow: string;
    title: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successMsg: string;
    errorMsg: string;
    privacyNote: string;
  };
  whyReachOut: {
    eyebrowPrefix: string;
    title: string;
    description: string;
  };
  symptoms: string[];
  network: {
    eyebrow: string;
    title: string;
    description: string;
    pendingPrefix: string;
    pendingSuffix: string;
  };
  hospitals: {
    eyebrow: string;
    title: string;
  };
  support: {
    eyebrow: string;
    title: string;
    items: SupportItem[];
  };
  savings: {
    prefix: string;
    suffix: string;
  };
  cost: {
    eyebrow: string;
    title: string;
    priceRange: string;
    priceDescription: string;
    cta: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };
  finalCta: {
    headline: string;
    sub: string;
    primary: string;
    secondary: string;
  };
}

export const content: Record<Lang, ContentShape> = {
  en: {
    flag: "🇴🇲",
    badge: "For Patients from Oman",
    countryName: "Oman",
    whatsappMessage:
      "Hi, I'd like a free oncology consultation for cancer treatment in India.",
    langToggle: {
      en: "English",
      ar: "العربية",
    },
    hero: {
      eyebrow: "Oncology Care · Oman → India",
      headline: "Cancer care in India, matched to the right oncologist for you",
      sub: "Send us your diagnosis, biopsy, or scan report — a cancer specialist will review it for free.",
      ctaPrimary: "Get a Free Medical Review",
      ctaSecondary: "WhatsApp Us",
    },
    leadForm: {
      eyebrow: "Free Medical Review",
      title: "Tell Us About the Patient",
      description:
        "Share a few details and our care team will review the case and connect you with the right oncologist.",
      nameLabel: "Full Name",
      namePlaceholder: "Patient's full name",
      emailLabel: "Email Address",
      emailPlaceholder: "you@example.com",
      phoneLabel: "Phone / WhatsApp Number",
      phonePlaceholder: "+968 XXXX XXXX",
      messageLabel: "Tell Us About the Diagnosis",
      messagePlaceholder:
        "Type of cancer, stage, any biopsy or scan reports you have, and current treatment recommendations",
      submit: "Request Free Review",
      submitting: "Submitting...",
      successMsg:
        "Thank you. Our oncology coordinator will contact you within 24 hours.",
      errorMsg: "Something went wrong. Please try again or WhatsApp us directly.",
      privacyNote:
        "Your information is confidential and shared only with your care team.",
    },
    whyReachOut: {
      eyebrowPrefix: "Why patients from",
      title: "Why Families Reach Out to Us",
      description:
        "Every year, thousands of patients travel from Oman to India for cancer care that isn't available, is delayed, or is prohibitively expensive to arrange locally.",
    },
    symptoms: [
      "Recently diagnosed with cancer and want a second opinion",
      "Advised to undergo a bone marrow or stem cell transplant",
      "Child diagnosed with a pediatric cancer (e.g. retinoblastoma)",
      "Long wait times for surgery, chemotherapy, or radiation at home",
      "Rare or advanced-stage cancer needing specialized expertise",
      "Concerned about the cost of cancer treatment abroad",
    ],
    network: {
      eyebrow: "Our Network",
      title: "Meet Your Oncology Specialists",
      description:
        "Board-certified oncologists and surgeons across India's leading cancer centers, experienced in treating patients from the Gulf.",
      pendingPrefix: "Specialist onboarding in progress at",
      pendingSuffix: "— reach out and we'll confirm availability for your case.",
    },
    hospitals: {
      eyebrow: "Our Hospitals",
      title: "Accredited Cancer Care Centers",
    },
    support: {
      eyebrow: "How We Help",
      title: "Support at Every Step of Your Treatment",
      items: [
        {
          title: "Verified Specialists",
          description:
            "Every oncologist is credential-checked and matched to your specific diagnosis and treatment plan.",
        },
        {
          title: "Visa & Travel Support",
          description:
            "We handle medical visa paperwork, flight coordination, and airport pickup for the patient and attendants.",
        },
        {
          title: "Family Accommodation",
          description:
            "Comfortable stay options near the hospital for the patient and accompanying family members.",
        },
        {
          title: "24/7 Coordinator",
          description:
            "A dedicated, Arabic and English-speaking coordinator stays with you from first contact through recovery.",
        },
      ],
    },
    savings: {
      prefix: "Save up to",
      suffix:
        "on cancer treatment in India compared to equivalent care in the West, without compromising on outcomes.",
    },
    cost: {
      eyebrow: "Transparent Pricing",
      title: "What Cancer Treatment Costs",
      priceRange: "$4,000 – $25,000",
      priceDescription:
        "Typical range for surgery, chemotherapy, radiation, or bone marrow transplant, depending on cancer type and stage. You'll receive a fixed estimate before travel.",
      cta: "Get My Free Estimate",
    },
    faq: {
      eyebrow: "Common Questions",
      title: "Frequently Asked Questions",
      items: [
        {
          question: "Do I need to travel to India for a diagnosis, or just for treatment?",
          answer:
            "You can send existing biopsy, imaging, or pathology reports for a free remote review first. Most patients only travel once a treatment plan and cost estimate are confirmed.",
        },
        {
          question: "Can pediatric cancer patients be treated, such as retinoblastoma?",
          answer:
            "Yes. Our partner hospitals have dedicated pediatric oncology units, including specialized retinoblastoma and childhood cancer programs.",
        },
        {
          question: "Is a bone marrow or stem cell transplant available?",
          answer:
            "Yes, our partner hospitals perform autologous and allogenic bone marrow transplants, including for patients without a fully matched donor.",
        },
        {
          question: "How long does cancer treatment in India typically take?",
          answer:
            "It depends on the treatment plan — a single surgery may need 1–2 weeks including recovery, while chemotherapy or radiation cycles can span several weeks to a few months. We'll outline the expected timeline in your treatment plan.",
        },
        {
          question: "Will someone communicate with us in Arabic?",
          answer:
            "Yes. Your coordinator communicates with you in Arabic throughout, from the first WhatsApp message through discharge and follow-up.",
        },
        {
          question: "What does TrueCare charge for this service?",
          answer:
            "The medical review and treatment-plan estimate are free. If you choose to proceed, our coordination fee is included transparently in the total cost estimate — there are no hidden charges added at the hospital.",
        },
      ],
    },
    finalCta: {
      headline: "Ready to get a specialist opinion on your case?",
      sub: "Send us your reports today — Oman's leading families trust India's top cancer centers for exactly this reason.",
      primary: "Get a Free Medical Review",
      secondary: "WhatsApp Us",
    },
  },
  ar: {
    flag: "🇴🇲",
    badge: "لمرضى من عُمان",
    countryName: "عُمان",
    whatsappMessage: "مرحبًا، أرغب في الحصول على استشارة مجانية لعلاج السرطان في الهند.",
    langToggle: {
      en: "English",
      ar: "العربية",
    },
    hero: {
      eyebrow: "رعاية الأورام · عُمان ← الهند",
      headline: "رعاية علاجية للسرطان في الهند، مع أخصائي الأورام المناسب لحالتك",
      sub: "أرسل لنا تقرير التشخيص أو الخزعة أو الأشعة — سيراجعه أخصائي أورام مجانًا.",
      ctaPrimary: "احصل على مراجعة طبية مجانية",
      ctaSecondary: "تواصل عبر واتساب",
    },
    leadForm: {
      eyebrow: "مراجعة طبية مجانية",
      title: "أخبرنا عن المريض",
      description:
        "شارك بعض التفاصيل وسيقوم فريق الرعاية لدينا بمراجعة الحالة وربطك بأخصائي الأورام المناسب.",
      nameLabel: "الاسم الكامل",
      namePlaceholder: "الاسم الكامل للمريض",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "example@email.com",
      phoneLabel: "رقم الهاتف / واتساب",
      phonePlaceholder: "+968 XXXX XXXX",
      messageLabel: "أخبرنا عن التشخيص",
      messagePlaceholder:
        "نوع السرطان، المرحلة، أي تقارير خزعة أو أشعة متوفرة، والتوصيات العلاجية الحالية",
      submit: "اطلب مراجعة مجانية",
      submitting: "جارٍ الإرسال...",
      successMsg: "شكرًا لك. سيتواصل معك منسق الأورام لدينا خلال 24 ساعة.",
      errorMsg: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو التواصل معنا عبر واتساب مباشرة.",
      privacyNote: "معلوماتك سرية ولا تُشارك إلا مع فريق الرعاية الخاص بك.",
    },
    whyReachOut: {
      eyebrowPrefix: "لماذا يتواصل معنا مرضى",
      title: "لماذا تلجأ العائلات إلينا",
      description:
        "يسافر آلاف المرضى سنويًا من عُمان إلى الهند لتلقي رعاية علاجية للسرطان غير متوفرة محليًا، أو متأخرة، أو مكلفة للغاية.",
    },
    symptoms: [
      "تشخيص حديث بالسرطان والرغبة في رأي طبي ثانٍ",
      "تمت التوصية بزراعة نخاع العظم أو الخلايا الجذعية",
      "طفل مصاب بسرطان الأطفال (مثل الورم الأرومي الشبكي)",
      "فترات انتظار طويلة للجراحة أو العلاج الكيميائي أو الإشعاعي محليًا",
      "سرطان نادر أو في مرحلة متقدمة يحتاج خبرة متخصصة",
      "القلق بشأن تكلفة العلاج في الخارج",
    ],
    network: {
      eyebrow: "شبكتنا الطبية",
      title: "تعرّف على أخصائيي الأورام لدينا",
      description:
        "أخصائيو أورام وجراحون معتمدون في أبرز مراكز علاج السرطان في الهند، ولديهم خبرة في علاج المرضى من دول الخليج.",
      pendingPrefix: "جارٍ إتمام إجراءات الأخصائيين في",
      pendingSuffix: "— تواصل معنا وسنؤكد التوفر لحالتك.",
    },
    hospitals: {
      eyebrow: "مستشفياتنا",
      title: "مراكز علاج السرطان المعتمدة",
    },
    support: {
      eyebrow: "كيف نساعدك",
      title: "دعم في كل خطوة من رحلة علاجك",
      items: [
        {
          title: "أخصائيون موثوقون",
          description: "يتم التحقق من مؤهلات كل أخصائي أورام ومطابقته مع تشخيصك وخطة علاجك.",
        },
        {
          title: "دعم التأشيرة والسفر",
          description: "نتولى إجراءات التأشيرة الطبية وتنسيق الرحلات واستقبالكم من المطار.",
        },
        {
          title: "إقامة للعائلة",
          description: "خيارات إقامة مريحة بالقرب من المستشفى للمريض ومرافقيه.",
        },
        {
          title: "منسق على مدار الساعة",
          description: "منسق مخصص يتحدث العربية والإنجليزية يرافقك من أول تواصل وحتى التعافي.",
        },
      ],
    },
    savings: {
      prefix: "وفّر حتى",
      suffix: "على تكاليف علاج السرطان في الهند مقارنة بالرعاية المماثلة في الغرب، دون التنازل عن جودة النتائج.",
    },
    cost: {
      eyebrow: "أسعار شفافة",
      title: "تكلفة علاج السرطان",
      priceRange: "4,000 – 25,000 دولار أمريكي",
      priceDescription:
        "نطاق تقريبي للجراحة أو العلاج الكيميائي أو الإشعاعي أو زراعة نخاع العظم، حسب نوع السرطان ومرحلته. ستحصل على تقدير ثابت قبل السفر.",
      cta: "احصل على تقديري المجاني",
    },
    faq: {
      eyebrow: "أسئلة شائعة",
      title: "الأسئلة الأكثر شيوعًا",
      items: [
        {
          question: "هل يجب أن أسافر إلى الهند للتشخيص، أم فقط للعلاج؟",
          answer:
            "يمكنك إرسال تقارير الخزعة أو الأشعة أو الفحوصات الموجودة لمراجعة مجانية عن بُعد أولًا. يسافر معظم المرضى فقط بعد تأكيد خطة العلاج والتكلفة التقديرية.",
        },
        {
          question: "هل يمكن علاج سرطانات الأطفال، مثل الورم الأرومي الشبكي؟",
          answer:
            "نعم. تضم المستشفيات الشريكة لنا وحدات متخصصة في أورام الأطفال، بما في ذلك برامج مخصصة للورم الأرومي الشبكي وسرطانات الطفولة.",
        },
        {
          question: "هل زراعة نخاع العظم أو الخلايا الجذعية متاحة؟",
          answer:
            "نعم، تُجري المستشفيات الشريكة عمليات زراعة نخاع العظم الذاتية وغير المطابقة تمامًا، بما في ذلك للمرضى دون متبرع متطابق بالكامل.",
        },
        {
          question: "كم تستغرق رحلة علاج السرطان في الهند عادةً؟",
          answer:
            "يعتمد ذلك على خطة العلاج — فقد تحتاج جراحة واحدة أسبوعًا إلى أسبوعين شاملة التعافي، بينما قد تمتد جلسات العلاج الكيميائي أو الإشعاعي لعدة أسابيع إلى بضعة أشهر. سنوضح الجدول الزمني المتوقع ضمن خطة علاجك.",
        },
        {
          question: "هل سيتواصل معنا أحد باللغة العربية؟",
          answer: "نعم. يتواصل منسقك معك باللغة العربية طوال الرحلة، من أول رسالة واتساب وحتى الخروج من المستشفى والمتابعة.",
        },
        {
          question: "ما هي رسوم TrueCare مقابل هذه الخدمة؟",
          answer:
            "المراجعة الطبية وتقدير خطة العلاج مجانية. إذا قررت المتابعة، تُدرج رسوم التنسيق الخاصة بنا بشفافية ضمن التكلفة الإجمالية التقديرية — دون أي رسوم خفية تُضاف في المستشفى.",
        },
      ],
    },
    finalCta: {
      headline: "هل أنت مستعد للحصول على رأي أخصائي بشأن حالتك؟",
      sub: "أرسل لنا تقاريرك اليوم — تثق أبرز العائلات في عُمان بأفضل مراكز علاج السرطان في الهند لهذا السبب بالتحديد.",
      primary: "احصل على مراجعة طبية مجانية",
      secondary: "تواصل عبر واتساب",
    },
  },
};
