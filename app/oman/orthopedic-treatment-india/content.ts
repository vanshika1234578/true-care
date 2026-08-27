export type Lang = "en" | "ar";

export const content = {
  en: {
    flag: "🇴🇲",
    countryName: "Oman",
    langToggle: { en: "English", ar: "العربية" },
    badge: "For Patients from Oman",
    hero: {
      eyebrow: "Orthopedic Care · Oman → India",
      headline: "Orthopedic care in India, matched to the right specialist for you",
      sub: "Send us your X-ray or MRI report — an orthopedic specialist will review it for free.",
      ctaPrimary: "Get a Free Medical Review",
      ctaSecondary: "WhatsApp Us",
    },
    whatsappMessage:
      "Hello, I'm from Oman and would like an orthopedic review. Here are my medical reports.",
    leadForm: {
      eyebrow: "Free Medical Review",
      title: "Tell us about the patient",
      description:
        "Share a few details and our care team will review the case and get back to you.",
      nameLabel: "Full Name",
      namePlaceholder: "Patient or family member name",
      emailLabel: "Email Address",
      emailPlaceholder: "you@example.com",
      phoneLabel: "WhatsApp / Phone Number",
      phonePlaceholder: "+968 XXXXXXXX",
      messageLabel: "Tell us about the patient's condition",
      messagePlaceholder: "Briefly describe the diagnosis, symptoms, or treatment required...",
      submit: "Get My Free Medical Review",
      submitting: "Submitting...",
      successMsg:
        "Thank you. Your details have been submitted successfully. Our care team will contact you shortly.",
      errorMsg: "Something went wrong. Please try again or contact us on WhatsApp.",
      privacyNote: "Your information will only be used to help review your medical case.",
    },
    whyReachOut: {
      eyebrowPrefix: "For Patients From",
      title: "A second opinion, before you decide anything",
      description:
        "From knee and hip replacement to complex spine surgery, our partner hospitals use established implant brands and structured rehabilitation programs.",
    },
    symptoms: [
      "Joint pain limiting daily activity",
      "Reduced mobility or stiffness",
      "Chronic back or spine pain",
      "Sports-related injury not improving with rest",
    ],
    network: {
      eyebrow: "How It Works",
      title: "You don't have to pick a hospital — we'll do that for you",
      description:
        "Send us your reports, and our medical team will match you with the right hospital and orthopedic specialist for your case.",
      pendingPrefix: "We're also proud to work with",
      pendingSuffix:
        "— we're still building out their orthopedic team's profiles here. Send your reports anyway, and we'll match you with the right specialist across our whole network.",
    },
    hospitals: {
      eyebrow: "Where You'll Be Treated",
      title: "Hospitals you can trust, across India",
    },
    support: {
      eyebrow: "What We Take Care Of",
      title: "Your journey, one step at a time",
      items: [
        {
          title: "Medical Visa Guidance",
          description: "We'll walk you through everything you need for your Indian medical visa.",
        },
        {
          title: "Arrival Assistance",
          description: "Someone's there to meet you at the airport and help you settle in.",
        },
        {
          title: "Companion Support",
          description: "Bringing someone with you? We'll help sort accommodation for you both.",
        },
        {
          title: "WhatsApp Coordinator",
          description:
            "One coordinator, with you on WhatsApp in Arabic or English, from day one through follow-up.",
        },
      ],
    },
    savings: {
      prefix: "Save up to",
      suffix: "on your treatment, compared to typical private care in the UK or Dubai.",
    },
    cost: {
      eyebrow: "The Cost of Care",
      title: "Great care shouldn't cost a fortune",
      priceRange: "$4,000 – $9,000",
      priceDescription:
        "That's the typical range for a procedure like total knee replacement. Your actual cost depends on the procedure and complexity of the case.",
      cta: "Get My Personalized Estimate",
    },
    faq: {
      eyebrow: "Frequently Asked Questions",
      title: "Common questions",
      items: [
        {
          q: "Will I need physiotherapy after surgery?",
          a: "Yes, physiotherapy begins within a day or two of most orthopedic surgeries and continues through your recovery stay.",
        },
        {
          q: "What implant brands are used?",
          a: "Hospitals typically offer a choice of internationally recognized implant brands, discussed with you during treatment planning.",
        },
        {
          q: "How quickly can my case be reviewed?",
          a: "Usually within 2–4 hours during business hours.",
        },
        {
          q: "Can a family member travel with me?",
          a: "Yes — we'll help arrange their visa and stay too.",
        },
        {
          q: "Is my medical information confidential?",
          a: "Yes. Only the relevant medical team will review your reports.",
        },
      ],
    },
    finalCta: {
      headline: "Ready to get a second opinion?",
      sub: "Share your details and our team will help you understand the next steps for treatment in India.",
      primary: "Get a Free Medical Review",
      secondary: "Chat on WhatsApp",
    },
  },
  ar: {
    flag: "🇴🇲",
    countryName: "عُمان",
    langToggle: { en: "English", ar: "العربية" },
    badge: "لمرضى من عُمان",
    hero: {
      eyebrow: "جراحة العظام · عُمان ← الهند",
      headline: "رعاية عظام في الهند، مع الأخصائي المناسب لحالتك",
      sub: "أرسل لنا تقرير الأشعة السينية أو الرنين المغناطيسي — سيراجعه أخصائي عظام مجانًا.",
      ctaPrimary: "احصل على مراجعة طبية مجانية",
      ctaSecondary: "تواصل عبر واتساب",
    },
    whatsappMessage: "مرحبًا، أنا من عُمان وأرغب في مراجعة لحالة العظام. هذه تقاريري الطبية.",
    leadForm: {
      eyebrow: "مراجعة طبية مجانية",
      title: "أخبرنا عن المريض",
      description: "شارك بعض التفاصيل وسيقوم فريق الرعاية لدينا بمراجعة الحالة والتواصل معك.",
      nameLabel: "الاسم الكامل",
      namePlaceholder: "اسم المريض أو أحد أفراد الأسرة",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "you@example.com",
      phoneLabel: "رقم واتساب / الهاتف",
      phonePlaceholder: "+968 XXXXXXXX",
      messageLabel: "أخبرنا عن حالة المريض",
      messagePlaceholder: "صف بإيجاز التشخيص أو الأعراض أو العلاج المطلوب...",
      submit: "احصل على مراجعتي الطبية المجانية",
      submitting: "جارٍ الإرسال...",
      successMsg: "شكرًا لك. تم إرسال بياناتك بنجاح. سيتواصل معك فريق الرعاية لدينا قريبًا.",
      errorMsg: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو التواصل معنا عبر واتساب.",
      privacyNote: "لن تُستخدم معلوماتك إلا للمساعدة في مراجعة حالتك الطبية.",
    },
    whyReachOut: {
      eyebrowPrefix: "لمرضى من",
      title: "رأي طبي ثانٍ، قبل أن تقرر أي شيء",
      description:
        "من استبدال الركبة والورك إلى جراحات العمود الفقري المعقدة، تستخدم المستشفيات الشريكة لنا ماركات غرسات معروفة وبرامج تأهيل منظمة.",
    },
    symptoms: [
      "ألم في المفاصل يحد من الأنشطة اليومية",
      "قلة الحركة أو تيبس المفاصل",
      "ألم مزمن في الظهر أو العمود الفقري",
      "إصابة رياضية لا تتحسن مع الراحة",
    ],
    network: {
      eyebrow: "كيف تتم العملية",
      title: "لا داعي لاختيار المستشفى بنفسك — سنقوم بذلك نيابة عنك",
      description:
        "أرسل لنا تقاريرك، وسيقوم فريقنا الطبي بمطابقتك مع المستشفى وأخصائي العظام المناسبين لحالتك.",
      pendingPrefix: "يسعدنا أيضًا أننا نتعاون مع",
      pendingSuffix:
        "— ولا زلنا نعمل على إضافة ملفات فريق جراحة العظام لديهم هنا. أرسل تقاريرك على أي حال، وسنطابقك مع الأخصائي المناسب عبر شبكتنا الكاملة.",
    },
    hospitals: {
      eyebrow: "أين ستحصل على العلاج",
      title: "مستشفيات يمكنك الوثوق بها، في مختلف الهند",
    },
    support: {
      eyebrow: "ما نتولى الاهتمام به",
      title: "رحلتك، خطوة بخطوة",
      items: [
        {
          title: "الإرشاد بشأن التأشيرة الطبية",
          description: "سنشرح لك كل ما تحتاجه للحصول على التأشيرة الطبية الهندية.",
        },
        {
          title: "المساعدة عند الوصول",
          description: "سيكون هناك من يستقبلك في المطار ويساعدك على الاستقرار.",
        },
        {
          title: "دعم المرافقين",
          description: "هل ستأتي مع مرافق؟ سنساعد في ترتيب الإقامة لكما.",
        },
        {
          title: "منسق عبر واتساب",
          description:
            "منسق واحد، متواصل معك عبر واتساب بالعربية أو الإنجليزية، من اليوم الأول وحتى المتابعة.",
        },
      ],
    },
    savings: {
      prefix: "وفّر حتى",
      suffix: "من تكلفة علاجك، مقارنة بالرعاية الخاصة المعتادة في المملكة المتحدة أو دبي.",
    },
    cost: {
      eyebrow: "تكلفة الرعاية",
      title: "الرعاية الجيدة لا يجب أن تكلف ثروة",
      priceRange: "$4,000 – $9,000",
      priceDescription:
        "هذا هو النطاق المعتاد لعملية مثل استبدال الركبة الكامل. تعتمد تكلفتك الفعلية على نوع العملية ودرجة تعقيد الحالة.",
      cta: "احصل على تقدير تكلفة خاص بحالتي",
    },
    faq: {
      eyebrow: "الأسئلة الشائعة",
      title: "أسئلة متكررة",
      items: [
        {
          q: "هل سأحتاج إلى العلاج الطبيعي بعد الجراحة؟",
          a: "نعم، يبدأ العلاج الطبيعي غالبًا في غضون يوم أو يومين بعد أغلب جراحات العظام، ويستمر خلال فترة التعافي.",
        },
        {
          q: "ما هي ماركات الغرسات المستخدمة؟",
          a: "تقدم المستشفيات عادة خيارات من ماركات غرسات معتمدة عالميًا، تتم مناقشتها معك خلال تخطيط العلاج.",
        },
        {
          q: "ما مدى سرعة مراجعة حالتي؟",
          a: "عادة في غضون 2 إلى 4 ساعات خلال ساعات العمل.",
        },
        {
          q: "هل يمكن لأحد أفراد العائلة السفر معي؟",
          a: "نعم — سنساعد في ترتيب تأشيرته وإقامته أيضًا.",
        },
        {
          q: "هل معلوماتي الطبية سرية؟",
          a: "نعم. لن يراجع تقاريرك سوى الفريق الطبي المعني.",
        },
      ],
    },
    finalCta: {
      headline: "هل أنت مستعد للحصول على رأي طبي ثانٍ؟",
      sub: "شارك تفاصيلك وسيساعدك فريقنا على فهم الخطوات التالية للعلاج في الهند.",
      primary: "احصل على مراجعة طبية مجانية",
      secondary: "تحدث عبر واتساب",
    },
  },
} as const;
