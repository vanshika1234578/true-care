"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  HeartPulse,
  MessageCircle,
  Plane,
  ShieldCheck,
  Stethoscope,
  Upload,
  Users,
} from "lucide-react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";
import HeroGlow from "@/components/HeroGlow";
import FAQAccordion from "@/components/FAQAccordion";
import DoctorCard from "@/components/DoctorCard";
import HospitalCard from "@/components/HospitalCard";
import { doctors, hospitals, treatments } from "@/lib/data";
import { priceComparison } from "@/lib/priceComparison";
import MedicalReportForm from "@/components/MedicalReportForm";

const WHATSAPP_NUMBER = "919720574548";
const CAMPAIGN_SOURCE = "oman-cardiac-treatment-india";

export type CardiacCountryContent = {
  language?: "en" | "ar";
  flag: string;
  countryName: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSub: string;
  whatsappMessage: string;
};

function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const cardiacAreas = [
  { title: "Coronary artery disease", desc: "Evaluation and treatment planning for blocked or narrowed coronary arteries." },
  { title: "Angioplasty / PCI", desc: "Catheter-based procedures to open blocked coronary arteries." },
  { title: "Bypass surgery (CABG)", desc: "Surgical revascularization when bypass surgery is recommended." },
  { title: "Valve treatment", desc: "Assessment for valve repair or replacement, including catheter-based options where appropriate." },
  { title: "Rhythm & electrophysiology", desc: "Evaluation of irregular heart rhythms and device-based treatment options." },
  { title: "Second opinions & diagnostics", desc: "Specialist review of existing ECG, echo, angiography and other cardiac reports." },
];

const journey = [
  {
    number: "01",
    icon: Upload,
    title: "Share the reports you already have",
    body: "Send your ECG, echo, angiography, discharge summaries or other cardiac reports. You do not need to choose a hospital or procedure first.",
  },
  {
    number: "02",
    icon: Stethoscope,
    title: "TrueCare coordinates the case",
    body: "We organize the information you provide and connect the case with the relevant cardiac specialist and hospital team.",
  },
  {
    number: "03",
    icon: HeartPulse,
    title: "Understand your options",
    body: "The treating team can advise on the appropriate evaluation, treatment options and estimated cost where available.",
  },
  {
    number: "04",
    icon: Plane,
    title: "Plan the journey only if it makes sense",
    body: "Once you understand the medical and practical next steps, TrueCare can coordinate the parts of the international-patient journey it actually provides.",
  },
];

const trustItems = [
  { icon: Stethoscope, title: "Cardiac specialist coordination", desc: "We connect the case with the relevant cardiac specialist and hospital team." },
  { icon: ShieldCheck, title: "Real doctors & hospitals", desc: "Explore the verified TrueCare network instead of generic medical-tourism listings." },
  { icon: Clock3, title: "Clear next steps", desc: "Know what to send, what happens next and when you are ready to decide." },
  { icon: Users, title: "International patient support", desc: "Practical coordination for patients traveling from Oman to India." },
];

export default function CardiacCountryLanding({ content }: { content: CardiacCountryContent }) {
  const isArabic = content.language === "ar";
  const ui = isArabic ? {
    dir: "rtl" as const,
    heroHeadline: "علاج القلب في الهند للمرضى من عُمان",
    trust: ["تنسيق مع اختصاصي قلب", "مستشفيات شريكة حقيقية", "دعم بالعربية والإنجليزية"],
    heroPrimary: "احصل على خطة علاجية",
    heroSecondary: "تواصل عبر واتساب",
    heroNote: "لنفسك أو لأحد أفراد الأسرة. القرارات الطبية يتخذها الأطباء والمستشفى المعالج.",
    startEyebrow: "ابدأ بحالتك",
    startTitle: "لست متأكدًا من العلاج القلبي المناسب؟",
    startBody: "لا تحتاج إلى اختيار الإجراء أو المستشفى أولًا. أرسل التقارير المتوفرة لديك ودع TrueCare تنسق الخطوة التالية.",
    reportsList: ["ECG / Echo / Angiography", "تقارير الخروج السابقة", "التشخيص الحالي أو توصية الطبيب"],
    share: "أرسل تقاريري",
    noTravel: "لا تحتاج إلى اتخاذ قرار السفر قبل فهم خياراتك.",
    caseEyebrow: `للمرضى من ${content.countryName}`,
    caseTitle: "ابدأ بحالتك، وليس بمكالمة مبيعات",
    caseDesc: "إذا كان لديك تشخيص أو نتيجة فحص أو توصية علاجية سابقة، يمكنك إرسالها إلى TrueCare قبل أن تقرر ما إذا كان العلاج الدولي مناسبًا لك.",
    caseSteps: [["1", "أرسل ما لديك", "لا تحتاج إلى ملف طبي كامل للبدء."], ["2", "تنسيق الحالة", "تنظم TrueCare المعلومات للفريق الطبي المناسب."], ["3", "افهم الخيارات", "يمكن للفريق المعالج توضيح الخطوة الطبية المناسبة."], ["4", "قرر بوضوح", "السفر يأتي بعد فهم الخطة الطبية والعملية."]],
    areasEyebrow: "مجالات علاج القلب", areasTitle: "خيارات العلاج تعتمد على التشخيص", areasDesc: "هذه مجالات ممثلة في شبكة TrueCare القلبية الحالية. الخيار المناسب يعتمد على التقييم الطبي.",
    doctorsEyebrow: "اختصاصيو القلب", doctorsTitle: "تعرف على الأطباء في شبكة TrueCare", doctorsDesc: "هؤلاء اختصاصيون حقيقيون موجودون في بيانات TrueCare. نعرض أولًا الأطباء الأكثر صلة بحملة عُمان القلبية.",
    viewAll: (n:number)=>`عرض جميع اختصاصيي القلب (${n})`, showFeatured:"عرض الاختصاصيين المميزين", allDoctorsNote:"يتم عرض شبكة اختصاصيي القلب كاملة. اختر الطبيب لعرض ملفه.", featuredNote:(n:number)=>`نعرض أولًا ${n} اختصاصيين مميزين.`, doctorsCta:"أرسل تقاريري للمراجعة",
    hospitalsEyebrow:"المستشفيات الشريكة", hospitalsTitle:"رعاية القلب ضمن شبكة حقيقية من المستشفيات في الهند", hospitalsDesc:"يجب أن يعتمد اختيار المستشفى النهائي على التشخيص وتوصية الاختصاصي، وليس على قائمة عامة.",
    journeyEyebrow:"رحلة المريض", journeyTitle:"مسار واضح من عُمان إلى العلاج", important:"مهم:", importantText:"TrueCare تنسق رحلة المريض؛ أما التقييم الطبي والتشخيص والتوصيات العلاجية والقرارات السريرية فيتخذها الأطباء والمستشفيات المؤهلة.",
    planningEyebrow:"التخطيط للعلاج", planningTitle:"افهم التكلفة التقديرية قبل السفر", planningBody:"تختلف التكلفة بحسب التشخيص والإجراء والمستشفى وتعقيد الحالة والفحوصات والعناية المركزة ومدة الإقامة. النطاق التالي مرجع تخطيطي من بيانات TrueCare الحالية وليس عرضًا شخصيًا.", cabgLabel:"جراحة تحويل مسار الشرايين (CABG)", priceNote:"نطاق إرشادي حالي في بيانات TrueCare. التكلفة النهائية تعتمد على الحالة والمستشفى.", costCta:"اطلب تقدير التكلفة",
    supportEyebrow:"دعم المرضى الدوليين", supportTitle:"ما الذي يمكن لـ TrueCare تنسيقه؟", supportDesc:"نعرض فقط الخدمات الموجودة في محتوى TrueCare الحالي.",
    supportCards:[["قبل السفر","تنسيق الحالة والمواعيد والتواصل مع المستشفى وإرشادات السفر/التأشيرة عند انطباقها."],["أثناء العلاج","تنسيق المريض ودعم التواصل والمساعدة المحلية عند توفرها."],["للمرافقين","إرشادات عامة لأفراد الأسرة أو المرافقين المسافرين مع المريض."],["بعد العلاج","تنسيق المتابعة والوثائق والدعم عن بُعد عند توفره."]],
    formEyebrow:"ابدأ بحالتك", formTitle:"احصل على مراجعة لحالتك القلبية", formBody:"أرسل المعلومات والتقارير المتوفرة لديك. الهدف هو مساعدتك على فهم الخطوة المناسبة قبل الالتزام برحلة علاج دولية.", formBullets:["ECG / echo / angiography / تقرير الخروج","التشخيص أو توصية الطبيب الحالية","عمر المريض ورقم واتساب"], whatsappStart:"تفضّل واتساب؟ ابدأ من هنا",
    faqEyebrow:"الأسئلة الشائعة", faqTitle:"أسئلة شائعة قبل السفر", finalEyebrow:"للمرضى من عُمان", finalTitle:"ابدأ الخطوة الأولى دون الالتزام بالسفر", finalBody:"أرسل التقارير الطبية المتوفرة لديك ودع TrueCare تساعد في تنسيق الخطوة المناسبة مع اختصاصي القلب والمستشفى.",
  } : {
    dir: "ltr" as const,
    heroHeadline: "Cardiac treatment in India for patients from Oman",
    trust: ["Specialist case coordination", "Real partner hospitals", "Arabic or English support"], heroPrimary:"Get My Treatment Plan", heroSecondary:"WhatsApp TrueCare", heroNote:"For yourself or a family member. Clinical decisions are made by the treating hospital and doctors.",
    startEyebrow:"Start with your case", startTitle:"Not sure which cardiac treatment you need?", startBody:"You do not need to choose a procedure or hospital first. Share the reports you already have and let TrueCare coordinate the next step.", reportsList:["ECG / Echo / Angiography","Previous discharge summaries","Current diagnosis or doctor's recommendation"], share:"Share My Reports", noTravel:"No need to decide on travel before you understand your options.",
    caseEyebrow:`For Patients From ${content.countryName}`, caseTitle:"Start with your case, not a sales call", caseDesc:"If you already have a diagnosis, test result or previous treatment recommendation, you can send it to TrueCare before deciding whether international treatment is right for you.", caseSteps:[["1","Send what you have","You do not need a complete file to start."],["2","Case is coordinated","TrueCare organizes the information for the relevant specialist team."],["3","Understand the options","The treating team can advise on the appropriate next step."],["4","Decide with clarity","Travel only after you understand the medical and practical plan."]],
    areasEyebrow:"Cardiac Treatment Areas", areasTitle:"Treatment options depend on your diagnosis", areasDesc:"These are treatment areas represented across the current TrueCare cardiac network. The appropriate option depends on your medical evaluation.",
    doctorsEyebrow:"Cardiac Specialists", doctorsTitle:"Meet the doctors in the TrueCare network", doctorsDesc:"These are real specialists already present in the TrueCare data. We show the doctors most relevant to the Oman cardiac campaign first.", viewAll:(n:number)=>`View All ${n} Cardiac Specialists`, showFeatured:"Show Featured Specialists", allDoctorsNote:"Showing the full cardiac specialist network. Choose a doctor to view their profile.", featuredNote:(n:number)=>`Showing ${n} featured specialists first.`, doctorsCta:"Share My Reports for Review",
    hospitalsEyebrow:"Partner Hospitals", hospitalsTitle:"Cardiac care across a real hospital network in India", hospitalsDesc:"Your final hospital selection should follow your diagnosis and specialist recommendation, not a generic list.", journeyEyebrow:"Your Patient Journey", journeyTitle:"A clear path from Oman to treatment", important:"Important:", importantText:"TrueCare coordinates the patient journey; medical evaluation, diagnosis, treatment recommendations and clinical decisions are made by qualified doctors and hospitals.",
    planningEyebrow:"Treatment planning", planningTitle:"Understand your estimated cost before you travel", planningBody:"Treatment cost varies with diagnosis, procedure, hospital, complexity, investigations, ICU needs and length of stay. The range below is a planning reference from TrueCare's current cardiac pricing data, not a personal quote.", cabgLabel:"CABG / bypass surgery", priceNote:"Indicative India range in the current TrueCare data. Final cost depends on the case and hospital.", costCta:"Request My Estimate",
    supportEyebrow:"International Patient Support", supportTitle:"What TrueCare can help coordinate", supportDesc:"Only the services represented in the current TrueCare site content are shown here.", supportCards:[["Before travel","Case coordination, appointment coordination, hospital communication and travel/visa guidance where applicable."],["During treatment","Patient coordination, communication support and local assistance where available."],["For companions","General guidance for family members or accompanying persons traveling with the patient."],["After treatment","Follow-up coordination and document/remote communication support where available."]],
    formEyebrow:"Start with your case", formTitle:"Get your cardiac case reviewed", formBody:"Share the information and reports you already have. The goal is to help you understand the appropriate next step before you commit to an international journey.", formBullets:["ECG / echo / angiography / discharge summary","Your current diagnosis or recommendation","Patient age and WhatsApp number"], whatsappStart:"Prefer WhatsApp? Start there", faqEyebrow:"Frequently Asked Questions", faqTitle:"Common questions before you travel", finalEyebrow:"For patients from Oman", finalTitle:"Take the first step without committing to travel", finalBody:"Share the medical reports you already have and let TrueCare help coordinate the appropriate next step with a cardiac specialist and hospital team.",
  };
  const localizedJourney = isArabic ? [
    { number: "01", icon: Upload, title: "أرسل التقارير المتوفرة لديك", body: "أرسل تخطيط القلب أو الإيكو أو القسطرة أو تقارير الخروج السابقة. لا تحتاج إلى اختيار المستشفى أو الإجراء أولًا." },
    { number: "02", icon: Stethoscope, title: "تنسيق الحالة عبر TrueCare", body: "ننظم المعلومات التي ترسلها وننسق الحالة مع اختصاصي القلب وفريق المستشفى المناسب." },
    { number: "03", icon: HeartPulse, title: "افهم خياراتك", body: "يمكن للفريق المعالج توضيح التقييم والخيارات العلاجية والتكلفة التقديرية عند توفرها." },
    { number: "04", icon: Plane, title: "خطط للسفر إذا كان مناسبًا", body: "بعد فهم الخطوات الطبية والعملية، تنسق TrueCare الأجزاء من رحلة المريض الدولي التي توفرها فعليًا." },
  ] : journey;
  const localizedTrustItems = isArabic ? [
    { icon: Stethoscope, title: "تنسيق مع اختصاصي القلب", desc: "ننسق الحالة مع اختصاصي القلب وفريق المستشفى المناسب." },
    { icon: ShieldCheck, title: "أطباء ومستشفيات حقيقية", desc: "استكشف شبكة TrueCare الموثقة بدل القوائم العامة للسياحة العلاجية." },
    { icon: Clock3, title: "خطوات واضحة", desc: "اعرف ما الذي ترسله وما الذي سيحدث بعد ذلك ومتى تكون جاهزًا لاتخاذ القرار." },
    { icon: Users, title: "دعم المرضى الدوليين", desc: "تنسيق عملي للمرضى المسافرين من عُمان إلى الهند." },
  ] : trustItems;
  const localizedCardiacAreas = isArabic ? [
    {title:"مرض الشرايين التاجية",desc:"تقييم وتخطيط علاج انسداد أو تضيق الشرايين التاجية."},{title:"القسطرة / توسيع الشرايين (PCI)",desc:"إجراءات بالقسطرة لفتح الشرايين التاجية المتضيقة أو المسدودة."},{title:"جراحة تحويل مسار الشرايين (CABG)",desc:"إعادة تروية جراحية عندما تكون جراحة المجازة مناسبة."},{title:"علاج صمامات القلب",desc:"تقييم إصلاح أو استبدال صمامات القلب، بما في ذلك الخيارات بالقسطرة عند ملاءمتها."},{title:"اضطرابات النظم وكهربية القلب",desc:"تقييم اضطرابات نبض القلب وخيارات العلاج والأجهزة عند الحاجة."},{title:"الرأي الطبي الثاني والتشخيص",desc:"مراجعة تقارير ECG والإيكو والقسطرة وغيرها من تقارير القلب."}
  ] : cardiacAreas;

  const cardiology = treatments.find((t) => t.slug === "cardiology")!;
  const cardiacDoctors = doctors.filter((d) => d.treatmentSlug === "cardiology");
  const featuredDoctors = useMemo(() => {
    const preferredOrder = [
      "dr-vivek-kumar-cardiology",
      "dr-ajay-kaul",
      "dr-krishnanu-dutta-choudhury",
      "dr-rajiv-c",
      "dr-anil-kumar-r",
      "dr-neerav-bansal",
    ];
    const bySlug = new Map(cardiacDoctors.map((d) => [d.slug, d]));
    return preferredOrder.map((slug) => bySlug.get(slug)).filter(Boolean).slice(0, 3) as typeof cardiacDoctors;
  }, [cardiacDoctors]);

  const cardiacHospitalSlugs = new Set(cardiacDoctors.map((d) => d.hospitalSlug));
  const cardiacHospitals = hospitals.filter((h) => cardiacHospitalSlugs.has(h.slug));
  const cabgPricing = priceComparison.find((row) => row.treatment.toLowerCase().includes("bypass"));
  const [showMoreDoctors, setShowMoreDoctors] = useState(false);
  const displayedDoctors = showMoreDoctors ? cardiacDoctors : featuredDoctors;

  const pageWhatsApp = whatsappHref(content.whatsappMessage);

  function track(event: string) {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event, source: CAMPAIGN_SOURCE, country: content.countryName, language: content.language || "en" });
    }
  }

  return (
    <div dir={ui.dir}>
      <section className="relative overflow-hidden bg-hero-gradient py-12 dark:bg-hero-gradient-dark sm:py-20">
        <HeroGlow />
        <Container className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                {content.flag} {content.heroEyebrow}
              </p>
              <div className="mb-4 flex justify-end text-xs font-semibold">
                <a
                  href={isArabic ? "/oman/cardiac-treatment-india" : "/oman/cardiac-treatment-india/ar"}
                  className="rounded-full border border-primary-100 bg-white/70 px-3 py-1.5 text-primary-600 transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-primary-300"
                >
                  {isArabic ? "English" : "العربية"}
                </a>
              </div>
              <h1 className="max-w-3xl text-balance font-display text-4xl font-bold leading-[1.05] text-navy-500 dark:text-white sm:text-5xl lg:text-6xl">
                Cardiac treatment in India for patients from Oman
              </h1>
              <p className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-navy-300 dark:text-white/65 sm:text-xl">
                {content.heroSub}
              </p>

              <div className="mt-6 grid max-w-xl gap-3 sm:grid-cols-3">
                {ui.trust.map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-xl border border-white/60 bg-white/65 px-3 py-2.5 text-sm font-medium text-navy-500 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-white/80">
                    <CheckCircle2 size={16} className="flex-shrink-0 text-teal-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  href="#case-review"
                  variant="accent"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  onClick={() => track("case_review_cta_click")}
                >
                  {ui.heroPrimary}
                </Button>
                <Button
                  href={pageWhatsApp}
                  variant="secondary"
                  size="lg"
                  icon={<MessageCircle size={18} />}
                  onClick={() => track("whatsapp_click")}
                >
                  {ui.heroSecondary}
                </Button>
              </div>
              <p className="mt-3 text-xs text-navy-300 dark:text-white/45">
                {ui.heroNote}
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/70 bg-white/85 p-4 shadow-card backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-5">
              <div className="overflow-hidden rounded-[1.5rem] bg-navy-500 p-6 text-white sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">{ui.startEyebrow}</p>
                <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{ui.startTitle}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {ui.startBody}
                </p>
                <div className="mt-5 space-y-3 text-sm">
                  {ui.reportsList.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-teal-300" />
                      <span className="text-white/85">{item}</span>
                    </div>
                  ))}
                </div>
                <Button
                  href="#case-review"
                  variant="accent"
                  size="lg"
                  className="mt-6 w-full"
                  icon={<Upload size={18} />}
                  onClick={() => track("report_cta_click")}
                >
                  {ui.share}
                </Button>
                <p className="mt-3 text-center text-xs text-white/45">{ui.noTravel}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-navy-100/70 bg-white dark:border-white/10 dark:bg-surface-darkSoft">
        <Container className="py-7">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {localizedTrustItems.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <span className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                  <Icon size={18} />
                </span>
                <div>
                  <h3 className="font-display text-sm font-semibold text-navy-500 dark:text-white">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-navy-300 dark:text-white/50">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-primary-50/70 dark:bg-primary-500/5">
        <Container className="py-8">
          <div className="grid gap-4 md:grid-cols-3">
            {(isArabic ? [
              ["مسار عُمان → الهند", "هناك سابقة قوية للسفر الطبي من عُمان إلى الهند، ما يجعل المسار مألوفًا للمرضى والعائلات."],
              ["اختصاصيون ومراكز قلب", "استكشف أطباء ومستشفيات حقيقيين من شبكة TrueCare بدل القوائم العامة."],
              ["ابدأ بالتقارير", "يمكنك البدء بمراجعة الحالة قبل اتخاذ قرار بشأن السفر أو اختيار المستشفى."],
            ] : [
              ["Oman → India treatment corridor", "Patients from Oman already use India for overseas treatment, making the journey familiar to many families."],
              ["Specialists & cardiac centers", "Explore real doctors and hospitals from the TrueCare network instead of generic listings."],
              ["Start with your reports", "Begin with case review before deciding on travel or a hospital."],
            ]).map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-primary-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
                <h3 className="font-display text-base font-semibold text-navy-500 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-300 dark:text-white/60">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section
        eyebrow={ui.caseEyebrow}
        title={ui.caseTitle}
        description={ui.caseDesc}
      >
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ui.caseSteps.map(([n, title, desc]) => (
            <div key={n} className="rounded-2xl border border-navy-100/70 bg-surface-soft p-6 dark:border-white/10 dark:bg-white/5">
              <span className="text-xs font-bold tracking-[0.2em] text-primary-500">{n}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-navy-500 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-300 dark:text-white/60">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        className="bg-surface-soft dark:bg-surface-darkSoft"
        eyebrow={ui.areasEyebrow}
        title={ui.areasTitle}
        description={ui.areasDesc}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {localizedCardiacAreas.map((item) => (
            <div key={item.title} className="group rounded-2xl border border-navy-100/70 bg-white p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-card dark:border-white/10 dark:bg-white/5">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                  <HeartPulse size={18} />
                </span>
                <ChevronRight size={18} className="text-navy-200 transition-transform group-hover:translate-x-1 dark:text-white/20" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-navy-500 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-300 dark:text-white/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={ui.doctorsEyebrow}
        title={ui.doctorsTitle}
        description={ui.doctorsDesc}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedDoctors.map((doc) => (
            <DoctorCard key={doc.slug} doctor={doc} />
          ))}
        </div>
        {cardiacDoctors.length > featuredDoctors.length && (
          <div className="mt-8 flex flex-col items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              aria-expanded={showMoreDoctors}
              onClick={() => setShowMoreDoctors((value) => !value)}
            >
              {showMoreDoctors ? ui.showFeatured : ui.viewAll(cardiacDoctors.length)}
            </Button>
            <p className="text-xs text-navy-300 dark:text-white/45">
              {showMoreDoctors ? ui.allDoctorsNote : ui.featuredNote(featuredDoctors.length)}
            </p>
          </div>
        )}
        <div className="mt-8 text-center">
          <Button href="#case-review" variant="accent" icon={<Upload size={16} />} onClick={() => track("doctor_section_cta_click")}>
            {ui.share} for Review
          </Button>
        </div>
      </Section>

      <Section
        className="bg-surface-soft dark:bg-surface-darkSoft"
        eyebrow={ui.hospitalsEyebrow}
        title={ui.hospitalsTitle}
        description={ui.hospitalsDesc}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cardiacHospitals.map((hospital) => (
            <HospitalCard key={hospital.slug} hospital={hospital} />
          ))}
        </div>
      </Section>

      <Section eyebrow={ui.journeyEyebrow} title={ui.journeyTitle}>
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-5 md:grid-cols-2">
            {localizedJourney.map(({ number, icon: Icon, title, body }) => (
              <div key={number} className="relative rounded-2xl border border-navy-100/70 bg-white p-6 pl-20 shadow-card dark:border-white/10 dark:bg-white/5">
                <span className="absolute left-5 top-6 text-xs font-bold tracking-[0.18em] text-primary-500">{number}</span>
                <span className="absolute left-12 top-6 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                  <Icon size={18} />
                </span>
                <h3 className="font-display text-lg font-semibold text-navy-500 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-300 dark:text-white/60">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-teal-200 bg-teal-50 p-5 text-sm leading-relaxed text-teal-900 dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-100">
            <strong>{ui.important}</strong> {ui.importantText}
          </div>
        </div>
      </Section>

      <section className="bg-navy-500 py-14 text-white dark:bg-black/30">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">{ui.planningEyebrow}</p>
              <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold sm:text-4xl">{ui.planningTitle}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
                Treatment cost varies with diagnosis, procedure, hospital, complexity, investigations, ICU needs and length of stay. The range below is a planning reference from TrueCare&apos;s current cardiac pricing data, not a personal quote.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:min-w-[300px]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">CABG / bypass surgery</p>
              <p className="mt-2 font-display text-4xl font-bold">{cabgPricing?.indiaRange ?? "Discuss after review"}</p>
              <p className="mt-2 text-xs leading-relaxed text-white/50">{ui.priceNote}</p>
              <Button href="#case-review" variant="accent" size="lg" className="mt-5 w-full" onClick={() => track("cost_cta_click")}>
                {ui.costCta}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section
        className="bg-surface-soft dark:bg-surface-darkSoft"
        eyebrow={ui.supportEyebrow}
        title={ui.supportTitle}
        description={ui.supportDesc}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ui.supportCards.map(([title, desc]) => (
            <div key={title} className="rounded-2xl border border-navy-100/70 bg-white p-6 dark:border-white/10 dark:bg-white/5">
              <h3 className="font-display text-lg font-semibold text-navy-500 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-300 dark:text-white/60">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <section id="case-review" className="scroll-mt-20 bg-surface-soft py-16 dark:bg-surface-darkSoft sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary-500">
                <span className="h-[2px] w-5 bg-accent-500" aria-hidden="true" />
                {ui.formEyebrow}
              </p>
              <h2 className="text-balance text-3xl font-bold sm:text-4xl">Get your cardiac case reviewed</h2>
              <p className="mt-4 max-w-md text-navy-300 dark:text-white/60">
                Share the information and reports you already have. The goal is to help you understand the appropriate next step before you commit to an international journey.
              </p>
              <div className="mt-6 space-y-3 text-sm text-navy-400 dark:text-white/65">
                {ui.formBullets.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 size={17} className="mt-0.5 flex-shrink-0 text-teal-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a
                href={pageWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:underline dark:text-primary-300"
                onClick={() => track("whatsapp_click_case_review")}
              >
                {ui.whatsappStart} <ArrowRight size={16} />
              </a>
            </div>
            <div className="rounded-[2rem] border border-navy-100/70 bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5 sm:p-8">
              <MedicalReportForm
                whatsappNumber={WHATSAPP_NUMBER}
                country="Oman"
                source={CAMPAIGN_SOURCE}
                lang={content.language || "en"}
                onSubmitSuccess={() => track("medical_reports_received")}
              />
            </div>
          </div>
        </Container>
      </section>

      <Section eyebrow={ui.faqEyebrow} title={ui.faqTitle}>
        <FAQAccordion
          faqs={isArabic ? [
            { q: "ما التقارير التي يمكنني إرسالها؟", a: "أرسل التقارير المتوفرة لديك مثل تخطيط القلب والإيكو والقسطرة أو تقارير الخروج السابقة. سيخبرك الفريق إذا كانت هناك معلومات إضافية مطلوبة." },
            { q: "هل أحتاج إلى اختيار المستشفى قبل إرسال التقارير؟", a: "لا. يمكنك البدء بمراجعة حالتك، ثم تنسق TrueCare المعلومات مع الاختصاصي والمستشفى المناسبين." },
            { q: "هل يمكنني معرفة التكلفة التقديرية قبل السفر؟", a: "يمكن لـ TrueCare تنسيق تقدير للتكلفة عندما تتوفر معلومات كافية من المستشفى. تعتمد التكلفة النهائية على التشخيص والإجراء والمستشفى وتعقيد الحالة." },
            { q: "هل يمكنني السفر مع أحد أفراد الأسرة؟", a: "يسافر العديد من المرضى مع مرافق. يمكن لـ TrueCare تقديم الإرشادات العامة المتعلقة بالسفر والإقامة ضمن الخدمات التي تدعمها." },
            { q: "هل تتخذ TrueCare القرار الطبي؟", a: "لا. TrueCare تنسق رحلة المريض، بينما يتخذ الأطباء والمستشفيات المؤهلون القرارات السريرية." },
            { q: "هل يمكنني التحدث مع TrueCare عبر واتساب؟", a: "نعم. استخدم زر واتساب في الصفحة لبدء المحادثة." },
          ] : [
            ...cardiology.faqs,
            { q: "What reports should I send?", a: "Send the cardiac reports you already have, such as ECG, echocardiogram, angiography, CT coronary angiography, stress tests or previous discharge summaries. The team will tell you if anything additional is needed." },
            { q: "Do I need to choose a hospital before sending my reports?", a: "No. You can start with your case. TrueCare can coordinate the information with the relevant specialist and hospital team based on your needs." },
            { q: "Can I get an estimated cost before traveling?", a: "TrueCare can coordinate a treatment estimate where the hospital provides enough information. Final cost depends on your diagnosis, procedure, hospital and case complexity." },
            { q: "Can I travel with a family member?", a: "Many international patients travel with a companion. TrueCare can provide general guidance on the travel and stay arrangements it supports." },
            { q: "Does TrueCare make the medical decision?", a: "No. TrueCare coordinates the patient journey. Diagnosis, treatment recommendations and clinical decisions are made by qualified doctors and hospitals." },
            { q: "Can I speak to someone on WhatsApp?", a: "Yes. Use the WhatsApp button on this page to start a conversation with TrueCare." },
          ]}
        />
      </Section>

      <section className="bg-hero-gradient py-16 dark:bg-hero-gradient-dark sm:py-20">
        <Container className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">{ui.finalEyebrow}</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-balance text-3xl font-bold text-navy-500 dark:text-white sm:text-4xl">{ui.finalTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-navy-300 dark:text-white/60">{ui.finalBody}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="#case-review" variant="accent" size="lg" icon={<Upload size={18} />} onClick={() => track("final_cta_click")}>
              {ui.heroPrimary}
            </Button>
            <Button href={pageWhatsApp} variant="secondary" size="lg" icon={<MessageCircle size={18} />} onClick={() => track("final_whatsapp_click")}>
              {ui.heroSecondary}
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
