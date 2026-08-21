export type Treatment = {
  slug: string;
  name: string;
  icon: string;
  summary: string;
  overview: string;
  symptoms: string[];
  options: string[];
  recovery: string;
  whyIndia: string;
  estimatedStay: string;
  faqs: { q: string; a: string }[];
};

export const treatments: Treatment[] = [
  {
    slug: "cardiology",
    name: "Cardiology",
    icon: "Heart",
    summary: "Heart screening, bypass surgery, valve repair, and interventional cardiology.",
    overview:
      "Our partner hospitals offer diagnostic cardiology, angioplasty, bypass surgery, and valve procedures using internationally recognized protocols, with cardiologists who regularly treat international patients.",
    symptoms: ["Chest discomfort or pain", "Shortness of breath", "Irregular heartbeat", "Fatigue during routine activity"],
    options: ["Coronary angiography", "Angioplasty and stenting", "Coronary artery bypass (CABG)", "Valve repair or replacement"],
    recovery: "Most cardiac procedures involve a hospital stay of 5–7 days, followed by 1–2 weeks of monitored recovery before international travel is advised.",
    whyIndia: "India's cardiac centers perform a high volume of complex procedures annually, with outcomes tracked against international benchmarks.",
    estimatedStay: "2–3 weeks",
    faqs: [
      { q: "Will I need multiple visits?", a: "Most cardiology cases are resolved in a single visit, with follow-up consultations handled remotely once you're home." },
      { q: "Can my cardiologist back home share my records?", a: "Yes. We help coordinate secure transfer of prior reports so your treating doctor in India has full context before you arrive." },
    ],
  },
  {
    slug: "oncology",
    name: "Cancer Care",
    icon: "Ribbon",
    summary: "Multidisciplinary cancer treatment including surgery, chemotherapy, and radiation.",
    overview:
      "Partner oncology centers offer tumor boards that bring together surgeons, oncologists, and radiologists to plan treatment jointly, rather than in isolation.",
    symptoms: ["Unexplained weight loss", "Persistent pain or lumps", "Changes in existing symptoms after prior treatment", "Abnormal test results requiring specialist review"],
    options: ["Surgical oncology", "Chemotherapy and targeted therapy", "Radiation therapy (including IMRT/IGRT)", "Bone marrow transplant"],
    recovery: "Recovery timelines vary widely by cancer type and stage. Your treatment plan will include a specific recovery and follow-up schedule before you travel.",
    whyIndia: "Leading cancer centers in India offer advanced radiation technology and multidisciplinary planning, often at a fraction of comparable costs elsewhere.",
    estimatedStay: "Varies by treatment plan — discussed during medical review",
    faqs: [
      { q: "Can treatment continue after I return home?", a: "Yes, for treatments like chemotherapy, we help identify how remaining cycles can be coordinated with a doctor in your home country when medically appropriate." },
      { q: "How is my case reviewed before I travel?", a: "Your reports go to a tumor board for review, and you receive a written treatment plan before committing to travel." },
    ],
  },
  {
    slug: "orthopedics",
    name: "Orthopedics",
    icon: "Bone",
    summary: "Joint replacement, spine surgery, and sports injury treatment.",
    overview:
      "From knee and hip replacement to complex spine surgery, our partner hospitals use established implant brands and structured rehabilitation programs.",
    symptoms: ["Joint pain limiting daily activity", "Reduced mobility or stiffness", "Chronic back or spine pain", "Sports-related injury not improving with rest"],
    options: ["Total knee/hip replacement", "Arthroscopic surgery", "Spine decompression and fusion", "Sports medicine and rehabilitation"],
    recovery: "Joint replacement typically requires 10–14 days in India, including physiotherapy, before you're cleared to fly home.",
    whyIndia: "High surgical volumes mean orthopedic teams have deep experience with both standard and complex cases, supported by dedicated physiotherapy units.",
    estimatedStay: "2–3 weeks",
    faqs: [
      { q: "Will I need physiotherapy after surgery?", a: "Yes, physiotherapy begins within a day or two of most orthopedic surgeries and continues through your recovery stay." },
      { q: "What implant brands are used?", a: "Hospitals typically offer a choice of internationally recognized implant brands, discussed with you during treatment planning." },
    ],
  },
  {
    slug: "ivf",
    name: "IVF & Fertility",
    icon: "Baby",
    summary: "Fertility evaluation, IVF, ICSI, and related reproductive treatments.",
    overview:
      "Fertility clinics offer a full diagnostic workup for both partners, followed by a personalized treatment plan and transparent success-rate discussions.",
    symptoms: ["Difficulty conceiving after 12 months of trying", "Recurrent pregnancy loss", "Diagnosed reproductive health conditions", "Prior unsuccessful fertility treatment"],
    options: ["IVF (In Vitro Fertilization)", "ICSI", "Egg/sperm freezing", "Fertility preservation before other medical treatment"],
    recovery: "An IVF cycle typically requires 2–3 weeks in India for monitoring, egg retrieval, and embryo transfer.",
    whyIndia: "Fertility clinics combine modern lab technology with experienced embryologists, and are transparent about realistic success rates for your specific case.",
    estimatedStay: "2–3 weeks per cycle",
    faqs: [
      { q: "How many clinic visits are needed?", a: "Most of the cycle involves monitoring visits every 2–3 days, with two key procedure days — retrieval and transfer." },
      { q: "Is donor egg or sperm available if needed?", a: "Yes, where medically indicated and legally permitted, this is discussed as part of your treatment planning." },
    ],
  },
  {
    slug: "dental",
    name: "Dental Care",
    icon: "Smile",
    summary: "Implants, full-mouth rehabilitation, and cosmetic dentistry.",
    overview:
      "Dental partners handle everything from single implants to full-mouth rehabilitation, using digital scanning and same-visit planning where possible.",
    symptoms: ["Missing or damaged teeth", "Chronic jaw pain", "Need for full-mouth rehabilitation", "Cosmetic concerns affecting confidence"],
    options: ["Dental implants", "Full-mouth rehabilitation", "Root canal and crowns", "Cosmetic dentistry (veneers, smile design)"],
    recovery: "Simple procedures may be completed in 3–5 days. Implant cases with grafting may require a longer stay or a planned second visit.",
    whyIndia: "Dental centers offer digital planning tools and a wide range of implant systems, with same-city lab support for faster turnaround.",
    estimatedStay: "5 days – 2 weeks depending on procedure",
    faqs: [
      { q: "Can implants be completed in one trip?", a: "Straightforward implant cases often can. Cases needing bone grafting may require healing time before the final crown, sometimes across two visits." },
    ],
  },
  {
    slug: "cosmetic",
    name: "Cosmetic Surgery",
    icon: "Sparkles",
    summary: "Reconstructive and aesthetic procedures with board-certified surgeons.",
    overview:
      "Cosmetic procedures are performed by board-certified plastic surgeons, with clear pre- and post-operative guidance and realistic expectation-setting.",
    symptoms: ["Aesthetic concerns affecting confidence", "Post-injury or post-surgical reconstruction needs", "Prior surgery requiring revision"],
    options: ["Rhinoplasty", "Body contouring", "Reconstructive surgery", "Hair transplantation"],
    recovery: "Recovery ranges from a few days to two weeks depending on the procedure, with clear activity restrictions provided in writing.",
    whyIndia: "Surgeons combine aesthetic training with high case volumes, and hospitals maintain dedicated recovery suites for privacy.",
    estimatedStay: "1–2 weeks",
    faqs: [
      { q: "How is privacy handled?", a: "Partner hospitals offer private recovery rooms and discreet scheduling for cosmetic patients." },
    ],
  },
  {
    slug: "neurology",
    name: "Neurology & Neurosurgery",
    icon: "Brain",
    summary: "Brain and spine surgery, stroke care, and neurological disorders.",
    overview:
      "Neurology teams manage conditions ranging from complex brain tumors to spine disorders, supported by advanced imaging and neuro-monitoring during surgery.",
    symptoms: ["Persistent headaches or seizures", "Numbness, weakness, or coordination issues", "Diagnosed brain or spine tumors", "Post-stroke rehabilitation needs"],
    options: ["Brain tumor surgery", "Spine surgery", "Stroke management and rehabilitation", "Deep brain stimulation"],
    recovery: "Recovery timelines depend heavily on the specific condition and are outlined clearly as part of your treatment plan.",
    whyIndia: "Neurosurgical teams have experience with complex, high-risk cases and access to intraoperative imaging and monitoring technology.",
    estimatedStay: "Varies by diagnosis — discussed during medical review",
    faqs: [
      { q: "Can a second opinion be arranged before I decide on surgery?", a: "Yes, we can arrange a second specialist opinion on your existing scans and reports before you commit to travel." },
    ],
  },
  {
    slug: "transplants",
    name: "Organ Transplants",
    icon: "HeartPulse",
    summary: "Kidney, liver, and bone marrow transplant programs.",
    overview:
      "Transplant programs follow strict legal and ethical protocols, with transparent guidance on donor eligibility requirements under Indian law.",
    symptoms: ["End-stage organ failure diagnosis", "Physician recommendation for transplant evaluation", "Existing transplant list registration elsewhere"],
    options: ["Kidney transplant (living donor)", "Liver transplant (living donor)", "Bone marrow / stem cell transplant"],
    recovery: "Transplant recovery typically requires 4–6 weeks in India for the recipient, with additional monitoring for the donor.",
    whyIndia: "India has an established legal framework for living-donor transplants and experienced transplant teams with structured post-operative care.",
    estimatedStay: "4–6 weeks",
    faqs: [
      { q: "Who is eligible to be a donor?", a: "Donor eligibility follows Indian legal requirements, typically involving close relatives; we explain these requirements clearly before you travel." },
    ],
  },
  {
    slug: "ophthalmology",
    name: "Ophthalmology",
    icon: "Eye",
    summary: "Cataract surgery, glaucoma treatment, LASIK, and pediatric eye care.",
    overview:
      "Ophthalmology teams handle everything from routine cataract surgery to complex glaucoma management, using micro-incision techniques and modern lens-implant options.",
    symptoms: ["Blurred or cloudy vision", "Difficulty seeing at night", "Eye pain or pressure", "Sudden vision changes"],
    options: ["Micro-incision cataract surgery with lens implant", "Glaucoma management", "LASIK and refractive surgery", "Pediatric ophthalmology"],
    recovery: "Cataract surgery is typically a same-day procedure with vision improving within days; most patients can travel home within a week.",
    whyIndia: "High-volume eye centers mean surgeons have performed thousands of procedures, often with same-day discharge and modern lens-implant technology.",
    estimatedStay: "3–7 days",
    faqs: [
      { q: "Is cataract surgery painful?", a: "No — it's typically done under local anesthesia with eye drops, and most patients feel only mild pressure, not pain." },
    ],
  },
  {
    slug: "ent",
    name: "ENT (Ear, Nose & Throat)",
    icon: "Ear",
    summary: "Sinus surgery, hearing restoration, thyroid surgery, and head & neck care.",
    overview:
      "ENT specialists treat conditions across the ear, nose, throat, and head and neck, using endoscopic and microsurgical techniques for faster recovery.",
    symptoms: ["Chronic sinus congestion", "Hearing loss", "Snoring or sleep apnea", "Thyroid or salivary gland swelling"],
    options: ["Endoscopic sinus surgery", "Cochlear implants / hearing restoration", "Tonsil and adenoid surgery", "Thyroid and salivary gland surgery"],
    recovery: "Most ENT procedures are day-care or single-night-stay surgeries, with recovery measured in days rather than weeks.",
    whyIndia: "Specialists use advanced tools like microdebriders, coblation, and endoscopes, allowing many procedures to be near-bloodless and same-day.",
    estimatedStay: "3–5 days",
    faqs: [
      { q: "Will I need to stay in the hospital overnight?", a: "Many ENT procedures are day-care surgeries; more involved cases like sinus or skull-base surgery may need a short overnight stay." },
    ],
  },
  {
    slug: "gi-bariatric-surgery",
    name: "GI & Bariatric Surgery",
    icon: "Stethoscope",
    summary: "Laparoscopic GI surgery, bariatric (weight-loss) surgery, and advanced endoscopy.",
    overview:
      "Gastrointestinal and bariatric surgeons use minimally invasive laparoscopic techniques for conditions ranging from severe obesity to complex GI disorders.",
    symptoms: ["Severe obesity with related health conditions", "Chronic digestive disorders", "Gallbladder or hernia issues", "Diabetic foot or chronic wounds"],
    options: ["Laparoscopic bariatric surgery", "Advanced laparoscopic GI surgery", "Single-incision laparoscopic surgery", "Varicose vein treatment (laser/RFA)"],
    recovery: "Laparoscopic approaches typically mean shorter hospital stays and faster return to normal activity than open surgery.",
    whyIndia: "Surgeons trained in advanced and single-incision laparoscopic techniques offer minimally invasive options for procedures that are often done as open surgery elsewhere.",
    estimatedStay: "1–2 weeks",
    faqs: [
      { q: "Is bariatric surgery reversible?", a: "Some procedures are adjustable or reversible and others are not; your surgeon will walk you through which option fits your case before you decide." },
    ],
  },
  {
    slug: "rheumatology",
    name: "Rheumatology",
    icon: "Activity",
    summary: "Diagnosis and management of arthritis, autoimmune, and connective tissue disorders.",
    overview:
      "Rheumatologists manage chronic joint and autoimmune conditions like psoriatic arthritis and spondyloarthritis, often coordinating with orthopedics for joint-related complications.",
    symptoms: ["Persistent joint pain or swelling", "Morning stiffness lasting over an hour", "Unexplained fatigue with joint symptoms", "Skin changes alongside joint pain"],
    options: ["Disease-modifying therapy for inflammatory arthritis", "Management of psoriatic arthritis and spondyloarthritis", "Connective tissue disorder treatment", "Rheumatology emergency care"],
    recovery: "Rheumatology is typically an ongoing outpatient management relationship rather than a single procedure with a fixed recovery timeline.",
    whyIndia: "Specialists trained internationally in rheumatology emergencies and connective tissue disorders offer coordinated, outpatient-based care plans.",
    estimatedStay: "Varies — often outpatient consultation-based",
    faqs: [
      { q: "Will I need ongoing visits after I return home?", a: "Likely yes for chronic conditions — we help coordinate follow-up care and medication management with a rheumatologist closer to home where possible." },
    ],
  },
  {
    slug: "dermatology",
    name: "Dermatology",
    icon: "Sparkles",
    summary: "Medical and surgical care for skin, hair, nail, and cosmetic dermatology conditions.",
    overview: "Dermatologists diagnose and treat skin, hair, and nail disorders, including inflammatory, infectious, pigmentary, and cosmetic concerns.",
    symptoms: ["Persistent rash or itching", "Acne or scarring", "New or changing skin growths", "Hair loss or nail changes"],
    options: ["Medical dermatology", "Dermatosurgery", "Laser and cosmetic dermatology", "Hair and scalp treatment"],
    recovery: "Most dermatology consultations are outpatient; recovery depends on the procedure performed.",
    whyIndia: "Specialist dermatology centres combine medical, procedural, laser, and surgical expertise in one setting.",
    estimatedStay: "Usually outpatient",
    faqs: [{ q: "Do dermatology treatments require a hospital stay?", a: "Most consultations and minor procedures are outpatient, while larger procedures may require a short stay." }],
  },
  {
    slug: "clinical-dietetics",
    name: "Clinical Dietetics",
    icon: "Activity",
    summary: "Personalized nutrition care for disease management, recovery, and healthy weight goals.",
    overview: "Clinical dietitians design nutrition plans around medical conditions, treatment plans, recovery needs, and long-term health goals.",
    symptoms: ["Unintentional weight change", "Nutrition-related deficiencies", "Diet needs during medical treatment", "Need for therapeutic nutrition planning"],
    options: ["Therapeutic diet planning", "Medical nutrition therapy", "Weight management", "Post-treatment nutrition support"],
    recovery: "Nutrition care is generally outpatient and may involve ongoing follow-up.",
    whyIndia: "Hospital-based dietetics teams can coordinate nutrition with physicians, surgeons, and rehabilitation specialists.",
    estimatedStay: "Usually outpatient",
    faqs: [{ q: "Can a dietitian coordinate with my doctor?", a: "Yes. Clinical diet plans are often coordinated with the treating medical team." }],
  },
  {
    slug: "endocrinology",
    name: "Endocrinology",
    icon: "Activity",
    summary: "Specialist care for diabetes, thyroid, adrenal, pituitary, and metabolic disorders.",
    overview: "Endocrinologists diagnose and manage hormonal and metabolic disorders, including diabetes and thyroid disease.",
    symptoms: ["Persistent fatigue or unexplained weight change", "Abnormal blood sugar", "Thyroid symptoms", "Hormonal or metabolic concerns"],
    options: ["Diabetes management", "Thyroid disorders", "Adrenal and pituitary disorders", "Metabolic disease care"],
    recovery: "Most endocrinology care is outpatient and focused on long-term management.",
    whyIndia: "Specialized endocrine teams offer multidisciplinary management for complex metabolic conditions.",
    estimatedStay: "Usually outpatient",
    faqs: [{ q: "Will I need follow-up after my consultation?", a: "Many endocrine conditions require ongoing monitoring and medication adjustment." }],
  },
  {
    slug: "interventional-radiology",
    name: "Interventional Radiology",
    icon: "Stethoscope",
    summary: "Image-guided minimally invasive procedures for vascular and organ conditions.",
    overview: "Interventional radiologists use imaging guidance to perform targeted procedures through small access points.",
    symptoms: ["Vascular disease symptoms", "Organ lesions requiring targeted treatment", "Need for minimally invasive intervention", "Bleeding or drainage conditions"],
    options: ["Image-guided vascular procedures", "Biopsy and drainage", "Tumor-directed procedures", "Embolization procedures"],
    recovery: "Recovery is typically shorter than open surgery, depending on the procedure.",
    whyIndia: "Advanced imaging and minimally invasive expertise can support targeted procedures with shorter recovery times.",
    estimatedStay: "Same day to 2–3 days",
    faqs: [{ q: "Are interventional radiology procedures minimally invasive?", a: "Yes. Many procedures use small access points and image guidance instead of open surgery." }],
  },
  {
    slug: "medical-genetics",
    name: "Medical Genetics",
    icon: "Stethoscope",
    summary: "Evaluation and management of inherited, genetic, and rare disorders.",
    overview: "Medical geneticists assess inherited conditions, congenital disorders, family risk, and complex cases that may benefit from genetic testing.",
    symptoms: ["Unexplained congenital differences", "Family history of inherited disease", "Unusual developmental or multisystem findings", "Need for genetic testing or counselling"],
    options: ["Clinical genetic assessment", "Genetic testing coordination", "Inherited disease counselling", "Rare disease evaluation"],
    recovery: "Genetic evaluation is generally outpatient and may involve staged testing and counselling.",
    whyIndia: "Specialist teams can combine clinical assessment with laboratory testing and multidisciplinary counselling.",
    estimatedStay: "Usually outpatient",
    faqs: [{ q: "Does genetic evaluation always require testing?", a: "Not always. Testing is recommended when the clinical assessment suggests it would add useful information." }],
  },
  {
    slug: "paediatrics",
    name: "Paediatrics",
    icon: "Baby",
    summary: "Comprehensive medical care for infants, children, and adolescents.",
    overview: "Paediatricians provide preventive, acute, and chronic care across childhood and coordinate specialist paediatric services when needed.",
    symptoms: ["Fever or recurrent infections", "Growth or development concerns", "Feeding difficulties", "Chronic childhood conditions"],
    options: ["General paediatric care", "Growth and development assessment", "Paediatric chronic disease care", "Preventive child health"],
    recovery: "Care is usually outpatient, with hospital admission when medically necessary.",
    whyIndia: "Multidisciplinary paediatric services bring medical and surgical specialists together for children.",
    estimatedStay: "Usually outpatient; varies for admissions",
    faqs: [{ q: "Can paediatricians coordinate specialist care?", a: "Yes. They commonly coordinate referrals and follow-up with paediatric subspecialists." }],
  },
  {
    slug: "paediatric-endocrinology",
    name: "Paediatric Endocrinology",
    icon: "Activity",
    summary: "Specialist endocrine and metabolic care for children and adolescents.",
    overview: "Paediatric endocrinologists manage childhood diabetes, growth disorders, thyroid disease, puberty concerns, and other hormonal conditions.",
    symptoms: ["Poor or excessive growth", "Early or delayed puberty", "Childhood diabetes symptoms", "Thyroid or hormonal concerns"],
    options: ["Growth disorders", "Childhood diabetes", "Thyroid disorders", "Puberty and hormonal conditions"],
    recovery: "Most care is outpatient with longitudinal follow-up.",
    whyIndia: "Dedicated paediatric endocrine services provide age-appropriate diagnosis and long-term management.",
    estimatedStay: "Usually outpatient",
    faqs: [{ q: "Do children need long-term follow-up?", a: "Many endocrine conditions require monitoring as a child grows and treatment needs change." }],
  },
  {
    slug: "paediatric-surgery",
    name: "Paediatric Surgery",
    icon: "Stethoscope",
    summary: "Surgical care for infants, children, and adolescents.",
    overview: "Paediatric surgeons treat congenital and acquired surgical conditions using age-appropriate techniques and multidisciplinary support.",
    symptoms: ["Congenital surgical conditions", "Abdominal or groin problems", "Paediatric masses or swellings", "Conditions requiring specialist childhood surgery"],
    options: ["Congenital surgery", "Minimal-access paediatric surgery", "Neonatal surgery", "Paediatric emergency surgery"],
    recovery: "Recovery depends on the procedure and the child's age and condition.",
    whyIndia: "Specialist paediatric surgical teams work with neonatology, anaesthesia, and paediatric critical care when needed.",
    estimatedStay: "1–7 days, depending on procedure",
    faqs: [{ q: "Are children cared for by a dedicated paediatric team?", a: "Specialist paediatric surgery is typically supported by dedicated paediatric anaesthesia, nursing, and critical-care services." }],
  },
  {
    slug: "pain-medicine",
    name: "Pain Medicine",
    icon: "HeartPulse",
    summary: "Multidisciplinary management of acute, chronic, and cancer-related pain.",
    overview: "Pain medicine specialists assess the source of pain and combine medication, procedures, rehabilitation, and palliative approaches when appropriate.",
    symptoms: ["Persistent pain", "Neuropathic pain", "Cancer-related pain", "Pain affecting daily function"],
    options: ["Chronic pain management", "Interventional pain procedures", "Cancer pain support", "Palliative pain care"],
    recovery: "Many pain procedures are outpatient; rehabilitation and chronic pain management may require ongoing follow-up.",
    whyIndia: "Multidisciplinary pain teams can coordinate interventional, medical, rehabilitation, and palliative approaches.",
    estimatedStay: "Usually outpatient",
    faqs: [{ q: "Is pain medicine only for severe chronic pain?", a: "No. Pain specialists may treat acute, chronic, postoperative, cancer-related, and neuropathic pain." }],
  },
  {
    slug: "internal-medicine",
    name: "Internal Medicine",
    icon: "Pill",
    summary: "Diagnosis and management of complex, chronic, and infectious conditions.",
    overview:
      "Internal medicine physicians manage complex or overlapping conditions — diabetes, thyroid disorders, infectious diseases — often as the coordinating point across specialists.",
    symptoms: ["Unexplained or persistent fever", "Diabetes or thyroid concerns", "Multiple overlapping health issues", "Need for a coordinating physician across specialists"],
    options: ["Infectious disease management", "Diabetes and metabolic disorder care", "Thyroid disorder management", "Coordinated care across specialists"],
    recovery: "Recovery and management timelines vary widely depending on the underlying condition being treated.",
    whyIndia: "Physicians with fellowship training in infectious disease and metabolic disorders can coordinate care across multiple specialists during your visit.",
    estimatedStay: "Varies by condition",
    faqs: [
      { q: "Can an internal medicine physician coordinate my other specialist visits?", a: "Yes — this is often exactly their role when your case involves more than one specialty." },
    ],
  },
];

export type Hospital = {
  slug: string;
  name: string;
  city: string;
  specialties: string[];
  accreditations: string[];
  overview: string;
  beds: string;
  image?: string;
};

export const hospitals: Hospital[] = [
  {
    slug: "artemis-hospitals-gurugram",
    name: "Artemis Hospitals, Gurugram",
    image: "/hospitals/artemis-gurugram.jpg",
    city: "Gurugram",
    specialties: ["Cardiology", "Oncology", "Orthopedics", "Neurology", "Transplant Surgery"],
    accreditations: ["JCI Accredited", "NABH Accredited"],
    overview: "A multi-specialty hospital in Gurugram — the first hospital in Gurugram to hold both JCI and NABH accreditation, with dedicated centres in cardiac sciences, oncology, neurosciences, orthopaedics, and organ transplant.",
    beds: "Verify with hospital",
  },
  {
    slug: "max-vaishali",
    name: "Max Super Speciality Hospital, Vaishali",
    image: "/hospitals/max-vaishali.jpg",
    city: "Ghaziabad",
    specialties: ["Cardiology", "Oncology", "Orthopedics", "Neurology", "Transplant Surgery", "IVF & Fertility", "Dental Care"],
    accreditations: ["NABH Accredited", "NABL Accredited"],
    overview: "A Max Healthcare multi-specialty hospital in Vaishali, Ghaziabad, part of the Max network serving the Delhi NCR region.",
    beds: "Verify with hospital",
  },
  {
    slug: "max-super-speciality-noida",
    name: "Max Super Speciality Hospital, Noida",
    image: "/hospitals/max-sector128-noida.jpg",
    city: "Noida",
    specialties: ["Cardiology", "Oncology", "Transplant Surgery"],
    accreditations: ["NABH Accredited", "NABL Accredited"],
    overview: "Formerly Jaypee Hospital, Noida — a large multi-specialty hospital in Wish Town, Sector-128, with dedicated units in nephrology/kidney transplant, surgical and medical oncology, interventional cardiology, cardiac surgery, and liver transplant.",
    beds: "Verify with hospital",
  },
  {
    slug: "aster-medcity-kochi",
    name: "Aster Medcity, Kochi",
    image: "/hospitals/aster-medcity-kochi.jpg",
    city: "Kochi",
    specialties: ["Cardiology", "Oncology", "Orthopedics", "Neurology", "Transplant Surgery", "IVF & Fertility", "Dental Care"],
    accreditations: ["JCI Accredited", "NABH Accredited", "NABL Accredited"],
    overview: "An 800-bed quaternary-care hospital on a 40-acre waterfront campus in Kochi — the first JCI-accredited quaternary care hospital in Kerala, with dedicated Centres of Excellence in cardiac sciences, neurosciences, oncology, orthopaedics, nephrology & urology, gastro sciences, liver care, women's health, paediatrics, and multi-organ transplant.",
    beds: "800 beds (700 in-patient + 100 daycare)",
  },
  {
    slug: "fortis-hospital-noida",
    name: "Fortis Hospital, Noida",
    image: "/hospitals/fortis-noida.jpg",
    city: "Noida",
    specialties: ["Cardiology", "Oncology", "Orthopedics", "Neurology", "Transplant Surgery", "Cosmetic Surgery", "IVF & Fertility"],
    accreditations: ["NABH Accredited"],
    overview: "A large multi-specialty hospital in Sector-62, Noida, co-located with the International Oncology Cancer Institute (IOCI), with dedicated units in cardiac sciences, surgical and medical oncology, neurosurgery, liver and kidney transplant, and plastic/cosmetic surgery.",
    beds: "Verify with hospital",
  },
];

export type Doctor = {
  slug: string;
  name: string;
  specialty: string;
  treatmentSlug: string;
  hospital: string;
  hospitalSlug: string;
  experience: string;
  qualifications?: string;
  languages: string[];
  photo?: string;
};

export const doctors: Doctor[] = [
  {slug: "dr-aanchal-sablok", name: "Dr. Aanchal Sablok", specialty: "Fetal Medicine", treatmentSlug: "ivf", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "10+ years", qualifications: "MBBS, MS (Obstetrics & Gynaecology), DNB, Fellowship in Fetal Medicine", languages: ["English", "Hindi"]},
  {slug: "dr-aditya-gupta", name: "Dr. Aditya Gupta", specialty: "Neurosurgery & Neuro-Radiation Surgery", treatmentSlug: "neurology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS (AIIMS New Delhi), MCh (Neurosurgery, AIIMS New Delhi)", languages: ["English", "Hindi"]},
  {slug: "dr-ajit-singh-baghela", name: "Dr. Ajit Singh Baghela", specialty: "Paediatric Neurology", treatmentSlug: "neurology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "9+ years", qualifications: "MBBS, MD (Paediatrics), DNB (Paediatrics), Fellowship in Paediatric Neurology", languages: ["English", "Hindi"]},
  {slug: "dr-amit-kumar-chaurasia", name: "Dr. Amit Kumar Chaurasia", specialty: "Interventional Cardiology & Structural Heart", treatmentSlug: "cardiology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS (JIPMER), MD (Internal Medicine, AIIMS), DM (Cardiology, SCTIMST)", languages: ["English", "Hindi"]},
  {slug: "dr-anju-singh", name: "Dr. Anju Singh", specialty: "Paediatric Rheumatology", treatmentSlug: "rheumatology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "13 years", qualifications: "MBBS, DCH, MD (Paediatrics), Fellowship in Pediatric Rheumatology", languages: ["English", "Hindi"]},
  {slug: "dr-anuvrat-sinha", name: "Dr. Anuvrat Sinha", specialty: "Neurosurgery", treatmentSlug: "neurology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MS (General Surgery), MCh (Neurosurgery)", languages: ["English", "Hindi"]},
  {slug: "dr-arpit-jain", name: "Dr. Arpit Jain", specialty: "Internal Medicine", treatmentSlug: "internal-medicine", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "11+ years", qualifications: "MD (Internal Medicine)", languages: ["English", "Hindi"]},
  {slug: "dr-aseem-r-srivastava", name: "Dr. Aseem R. Srivastava", specialty: "Paediatric & Congenital Cardiac Surgery", treatmentSlug: "cardiology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MCh (Cardio Vascular & Thoracic Surgery), MS (General Surgery), Clinical Fellowships in Congenital & Pediatric Cardiac Surgery", languages: ["English", "Hindi"]},
  {slug: "dr-ashu-kumar-jain", name: "Dr. Ashu Kumar Jain", specialty: "Pain Medicine & Palliative Care", treatmentSlug: "pain-medicine", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "14+ years", qualifications: "MBBS, MD (Anaesthesiology), Fellowship in Pain Medicine", languages: ["English", "Hindi"]},
  {slug: "dr-deepak-jha", name: "Dr. Deepak Jha", specialty: "Breast & Surgical Oncology", treatmentSlug: "oncology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MS (General Surgery), Surgical Oncology (AIIMS), Fellowships in Breast Surgery & Oncoplasty", languages: ["English", "Hindi"]},
  {slug: "dr-deepika-aggarwal", name: "Dr. Deepika Aggarwal", specialty: "Laparoscopic Gynaecology & Robotic Surgery", treatmentSlug: "ivf", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "26+ years", qualifications: "MBBS, DGO, MRCOG, FRCOG, CCT (OBGYN), Advanced Laparoscopy & Robotic Surgery training", languages: ["English", "Hindi"]},
  {slug: "dr-dheeraj-kapoor", name: "Dr. Dheeraj Kapoor", specialty: "Endocrinology", treatmentSlug: "endocrinology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "30+ years", qualifications: "MBBS, MD (Medicine), DM (Endocrinology), FRCP/FACP", languages: ["English", "Hindi"]},
  {slug: "dr-dilpreet-bajwa", name: "Dr. Dilpreet Bajwa", specialty: "ENT", treatmentSlug: "ent", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MS (ENT)", languages: ["English", "Hindi"]},
  {slug: "dr-giriraj-bora", name: "Dr. Giriraj Bora", specialty: "Liver Transplant, GI & HPB Surgery", treatmentSlug: "transplants", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MS, advanced training in GI, HPB & liver transplantation", languages: ["English", "Hindi"]},
  {slug: "dr-hemant-k-gogia", name: "Dr. Hemant K. Gogia", specialty: "Paediatrics", treatmentSlug: "paediatrics", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MD (Paediatrics)", languages: ["English", "Hindi"]},
  {slug: "dr-hitesh-garg", name: "Dr. Hitesh Garg", specialty: "Orthopaedic Spine Surgery", treatmentSlug: "orthopedics", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MS (Orthopaedics), Fellowships in Spine Surgery", languages: ["English", "Hindi"]},
  {slug: "dr-i-p-s-oberoi", name: "Dr. I P S Oberoi", specialty: "Orthopaedics, Joint Replacement & Arthroscopy", treatmentSlug: "orthopedics", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MS (Orthopaedics), MCh Orthopaedics (Liverpool, UK)", languages: ["English", "Hindi"]},
  {slug: "dr-kanika-singh", name: "Dr. Kanika Singh", specialty: "Medical Genetics", treatmentSlug: "medical-genetics", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MD (Paediatrics), specialist training in Medical Genetics", languages: ["English", "Hindi"]},
  {slug: "dr-kapil-dev-jamwal", name: "Dr. Kapil Dev Jamwal", specialty: "Gastroenterology & Hepatology", treatmentSlug: "gi-bariatric-surgery", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "Fellowship in Advanced GI Endoscopy (FAGIE), Christian Medical College, Vellore", languages: ["English", "Hindi"]},
  {slug: "dr-kuldeep-arora", name: "Dr. Kuldeep Arora", specialty: "Interventional Cardiology", treatmentSlug: "cardiology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MD (General Medicine), DM (Cardiology), advanced Interventional Cardiology training", languages: ["English", "Hindi"]},
  {slug: "dr-manju-aggarwal", name: "Dr. Manju Aggarwal", specialty: "Nephrology", treatmentSlug: "transplants", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "DNB (Nephrology), MBA (Healthcare Administration)", languages: ["English", "Hindi"]},
  {slug: "dr-manzoor-ahmed-mir", name: "Dr. Manzoor Ahmed Mir", specialty: "Gastroenterology, Liver & Digestive Diseases", treatmentSlug: "gi-bariatric-surgery", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "17+ years", qualifications: "Gastroenterology and Endoscopy specialist training", languages: ["English", "Hindi"]},
  {slug: "dr-mohit-anand", name: "Dr. Mohit Anand", specialty: "Neurology & Movement Disorders", treatmentSlug: "neurology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MD (Internal Medicine), specialist training in Neurology & Movement Disorders", languages: ["English", "Hindi"]},
  {slug: "dr-monica-bambroo", name: "Dr. Monica Bambroo", specialty: "Dermatology", treatmentSlug: "dermatology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, DVD, FCPS, PGDHMM, Fellowship in Laser & Dermatosurgery", languages: ["English", "Hindi"]},
  {slug: "dr-shabana-parveen", name: "Dr. Shabana Parveen", specialty: "Clinical Dietetics", treatmentSlug: "clinical-dietetics", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "Registered Dietician, B.Ed", languages: ["English", "Hindi"]},
  {slug: "dr-nidhi-rawal", name: "Dr. Nidhi Rawal", specialty: "Paediatric Cardiology", treatmentSlug: "cardiology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS (KGMC Lucknow), MD (GSV Medical College Kanpur), Fellowship in Pediatric Cardiology", languages: ["English", "Hindi"]},
  {slug: "dr-nitin-goel", name: "Dr. Nitin Goel", specialty: "Paediatric Surgery", treatmentSlug: "paediatric-surgery", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MCh (Paediatric Surgery), MS (General Surgery)", languages: ["English", "Hindi"]},
  {slug: "dr-padam-yadav", name: "Dr. Padam Yadav", specialty: "Paediatrics & Neonatology", treatmentSlug: "paediatrics", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MD (Paediatrics)", languages: ["English", "Hindi"]},
  {slug: "dr-paritosh-s-gupta", name: "Dr. Paritosh S. Gupta", specialty: "General & Minimally Invasive Surgery", treatmentSlug: "gi-bariatric-surgery", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MS (General Surgery), DNB (General Surgery)", languages: ["English", "Hindi"]},
  {slug: "dr-parveen-yadav", name: "Dr. Parveen Yadav", specialty: "Thoracic & Surgical Oncology, Robotic & Minimally Invasive Surgery", treatmentSlug: "oncology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MS (General Surgery), FAIS, FAIGES", languages: ["English", "Hindi"]},
  {slug: "dr-pawan-goyal", name: "Dr. Pawan Goyal", specialty: "Neurosurgery & Neuroendoscopy", treatmentSlug: "neurology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MS, MCh (Neurosurgery)", languages: ["English", "Hindi"]},
  {slug: "dr-piush-girdhar", name: "Dr. Piush Girdhar", specialty: "Liver Transplant Critical Care & Intensive Care Medicine", treatmentSlug: "transplants", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MD (Anaesthesia)", languages: ["English", "Hindi"]},
  {slug: "dr-poonam-gautam", name: "Dr. Poonam Gautam", specialty: "ENT", treatmentSlug: "ent", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MS (ENT)", languages: ["English", "Hindi"]},
  {slug: "dr-prabhat-maheshwari", name: "Dr. Prabhat Maheshwari", specialty: "Neonatal & Paediatric Critical Care", treatmentSlug: "paediatrics", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MD (Paediatrics), DNB (Paediatrics)", languages: ["English", "Hindi"]},
  {slug: "dr-pradeep-kumar-singh", name: "Dr. Pradeep Kumar Singh", specialty: "Cosmetic & Plastic Surgery", treatmentSlug: "cosmetic", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MCh (Burns & Plastic Surgery), Fellowship in Aesthetic Surgery", languages: ["English", "Hindi"]},
  {slug: "dr-priya-tiwari", name: "Dr. Priya Tiwari", specialty: "Medical Oncology", treatmentSlug: "oncology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "DM (Medical Oncology), MD (Medicine), MBBS", languages: ["English", "Hindi"]},
  {slug: "dr-priyanka-raina", name: "Dr. Priyanka Raina", specialty: "Head & Neck Surgical Oncology", treatmentSlug: "oncology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MDS (Oral & Maxillofacial Surgery), Diploma in Oral Oncology", languages: ["English", "Hindi"]},
  {slug: "dr-rahul-naithani", name: "Dr. Rahul Naithani", specialty: "Haematology, Oncology & Bone Marrow Transplant", treatmentSlug: "transplants", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MD (Paediatrics), DM (Clinical Haematology)", languages: ["English", "Hindi"]},
  {slug: "dr-rajiv-chhabra", name: "Dr. Rajiv Chhabra", specialty: "Paediatrics", treatmentSlug: "paediatrics", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MD (Paediatrics), MRCPCH (London)", languages: ["English", "Hindi"]},
  {slug: "dr-rajiv-sharma", name: "Dr. Rajiv Sharma", specialty: "Interventional Radiology", treatmentSlug: "interventional-radiology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MD, specialist training in Interventional Radiology", languages: ["English", "Hindi"]},
  {slug: "dr-rajiv-yadav", name: "Dr. Rajiv Yadav", specialty: "Urology, Uro-Oncology & Robotic Surgery", treatmentSlug: "transplants", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MS (Surgery, AIIMS), MCh (Urology, AIIMS)", languages: ["English", "Hindi"]},
  {slug: "dr-rakesh-durkhure", name: "Dr. Rakesh Durkhure", specialty: "General, Minimally Invasive & Bariatric Surgery", treatmentSlug: "gi-bariatric-surgery", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MS (General Surgery)", languages: ["English", "Hindi"]},
  {slug: "dr-renu-raina-sehgal", name: "Dr. Renu Raina Sehgal", specialty: "Obstetrics & Gynaecology", treatmentSlug: "ivf", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "20+ years", qualifications: "MBBS, DNB (Obstetrics & Gynaecology), MNAMS, Fellowships in Advanced Gynae Endoscopy & Minimal Access Surgery", languages: ["English", "Hindi"]},
  {slug: "dr-sakshi-karkra", name: "Dr. Sakshi Karkra", specialty: "Paediatric Gastroenterology & Hepatology", treatmentSlug: "gi-bariatric-surgery", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MD (Paediatrics), MRCPCH (Part II), Fellowship in Paediatric Gastroenterology, Hepatology & Liver Transplant", languages: ["English", "Hindi"]},
  {slug: "dr-sameer-kaushal", name: "Dr. Sameer Kaushal", specialty: "Ophthalmology & Organ Transplantation", treatmentSlug: "ophthalmology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MD (Ophthalmology, AIIMS New Delhi)", languages: ["English", "Hindi"]},
  {slug: "dr-sameer-mehrotra", name: "Dr. Sameer Mehrotra", specialty: "Interventional Cardiology & Electrophysiology", treatmentSlug: "cardiology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MD (General Medicine), DM (Cardiology)", languages: ["English", "Hindi"]},
  {slug: "dr-sandeep-chauhan", name: "Dr. Sandeep Chauhan", specialty: "Orthopaedics", treatmentSlug: "orthopedics", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, Diploma in Orthopaedics", languages: ["English", "Hindi"]},
  {slug: "dr-sanjay-sarup", name: "Dr. Sanjay Sarup", specialty: "Paediatric Orthopaedics & Spine Surgery", treatmentSlug: "orthopedics", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, specialist training in Paediatric Orthopaedics & Spine Surgery", languages: ["English", "Hindi"]},
  {slug: "dr-shashidhar-shree-niwas", name: "Dr. Shashidhar Shree Niwas", specialty: "Nephrology", treatmentSlug: "transplants", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MD, DM (Nephrology)", languages: ["English", "Hindi"]},
  {slug: "dr-sidharth-kumar-sethi", name: "Dr. Sidharth Kumar Sethi", specialty: "Paediatric Nephrology", treatmentSlug: "transplants", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "European Board Certification in Pediatric Nephrology, Fellow (Indian Academy of Pediatrics)", languages: ["English", "Hindi"]},
  {slug: "dr-sk-rajan", name: "Dr. SK Rajan", specialty: "Neurosurgery & Spinal Neurosurgery", treatmentSlug: "neurology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MS (Surgery), advanced Neurosurgery and Spine Surgery training", languages: ["English", "Hindi"]},
  {slug: "dr-subodh-chandra-pande", name: "Dr. Subodh Chandra Pande", specialty: "Radiation Oncology & CyberKnife", treatmentSlug: "oncology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "DMRE, MD", languages: ["English", "Hindi"]},
  {slug: "dr-sumeet-agrawal", name: "Dr. Sumeet Agrawal", specialty: "Rheumatology & Clinical Immunology", treatmentSlug: "rheumatology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "DM (Clinical Immunology), MD, APLAR Fellowship (UK)", languages: ["English", "Hindi"]},
  {slug: "dr-sumeet-arora", name: "Dr. Sumeet Arora", specialty: "Paediatric Endocrinology", treatmentSlug: "paediatric-endocrinology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MD Paediatrics, Fellowship in Pediatric Endocrinology", languages: ["English", "Hindi"]},
  {slug: "dr-sumit-singh", name: "Dr. Sumit Singh", specialty: "Neurology", treatmentSlug: "neurology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MD (Medicine), specialist training in Neurology", languages: ["English", "Hindi"]},
  {slug: "dr-surendra-nath-khanna", name: "Dr. (Prof.) Surendra Nath Khanna", specialty: "Adult Cardiac Surgery & Heart-Lung Transplant", treatmentSlug: "cardiology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "30+ years", qualifications: "MBBS, MS, MCh, FICS (USA), FIACS, FAMS, FICC", languages: ["English", "Hindi"]},
  {slug: "dr-tapan-singh-chauhan", name: "Dr. Tapan Singh Chauhan", specialty: "Surgical Oncology", treatmentSlug: "oncology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MS (General Surgery), MRCS (UK), MCh (Surgical Oncology)", languages: ["English", "Hindi"]},
  {slug: "dr-tariq-matin", name: "Dr. Tariq Matin", specialty: "Neurointerventional Surgery", treatmentSlug: "neurology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "15+ years", qualifications: "MBBS, DMRD, DNB (Radiodiagnostic)", languages: ["English", "Hindi"]},
  {slug: "dr-trisha-srivastava", name: "Dr. Trisha Srivastava", specialty: "ENT", treatmentSlug: "ent", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "10+ years", qualifications: "MBBS, MS (Otorhinolaryngology), DNB (ENT)", languages: ["English", "Hindi"]},
  {slug: "dr-varun-mittal", name: "Dr. Varun Mittal", specialty: "Kidney Transplant, Uro-Oncology & Robotic Surgery", treatmentSlug: "transplants", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MS (General Surgery), MCh (Urology & Kidney Transplant), DNB, fellowship in Robotic Urology", languages: ["English", "Hindi"]},
  {slug: "dr-vishal-arora", name: "Dr. Vishal Arora", specialty: "Ophthalmology", treatmentSlug: "ophthalmology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MD (Ophthalmology, AIIMS), Fellowship in Phacoemulsification & Refractive Surgery", languages: ["English", "Hindi"]},
  {slug: "dr-vivek-barun", name: "Dr. Vivek Barun", specialty: "Neurology & Epilepsy", treatmentSlug: "neurology", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "Confirm with hospital", qualifications: "MBBS, MD (Medicine), DM (Neurology), Postdoctoral Fellowship in Epilepsy", languages: ["English", "Hindi"]},
  {slug: "dr-vivek-vaibhav", name: "Dr. Vivek Vaibhav", specialty: "Robotic Joint Replacement & Sports Medicine", treatmentSlug: "orthopedics", hospital: "Artemis Hospitals, Gurugram", hospitalSlug: "artemis-hospitals-gurugram", experience: "10+ years", qualifications: "MBBS, D Ortho, DNB Ortho, advanced fellowship in Arthroplasty & Arthroscopy", languages: ["English", "Hindi"]},
];

export const journeySteps = [
  { title: "Inquiry", description: "Share your medical concern and reports through our form or WhatsApp." },
  { title: "Medical Review", description: "Specialists review your case and outline realistic options." },
  { title: "Hospital Recommendation", description: "We match you with hospitals suited to your specific condition." },
  { title: "Treatment Plan", description: "You receive a written plan with procedure details and estimated costs." },
  { title: "Visa Support", description: "We guide you through medical visa documentation requirements." },
  { title: "Travel", description: "Arrival assistance, airport pickup, and local orientation are arranged." },
  { title: "Treatment", description: "Your procedure takes place with a dedicated care coordinator nearby." },
  { title: "Recovery", description: "Monitored recovery with physiotherapy or follow-up care as needed." },
  { title: "Follow-up", description: "We help coordinate remote follow-up with your treating doctor after you return home." },
];

export const testimonials = [
  {
    name: "Amina H.",
    country: "Kenya",
    treatment: "Cardiology",
    quote: "Every step was explained before it happened, so nothing felt uncertain when we arrived.",
  },
  {
    name: "Rashed K.",
    country: "Bangladesh",
    treatment: "Orthopedics",
    quote: "Our coordinator was reachable at every stage, from the first call to the flight back home.",
  },
  {
    name: "Malika T.",
    country: "Uzbekistan",
    treatment: "IVF & Fertility",
    quote: "The clinic answered every question honestly, including the ones we were nervous to ask.",
  },
];

export const homeFaqs = [
  { q: "Is TrueCare a hospital?", a: "No. TrueCare is an independent patient guidance service. We help you find and coordinate care at accredited hospitals — we don't perform treatment ourselves." },
  { q: "How much does treatment cost?", a: "Costs vary by hospital, procedure, and complexity. After medical review, you receive a written estimate directly from the treating hospital." },
  { q: "Do you help with visas?", a: "Yes. We guide you through medical visa documentation and connect you with the hospital's visa assistance letter when required." },
  { q: "What languages is support available in?", a: "Our coordinators support English, Hindi, and Arabic, with translation assistance arranged for other languages where needed." },
  { q: "Can someone travel with the patient?", a: "Yes. Most patients travel with a companion, and we help arrange accommodation for both." },
];

export const blogPosts = [
  {
    slug: "what-is-a-medical-visa",
    title: "What is a Medical Visa, and Who Needs One?",
    category: "Patient Education",
    excerpt: "A plain-language walkthrough of medical visa requirements for patients traveling to India for treatment.",
    readTime: "5 min read",
  },
  {
    slug: "questions-to-ask-before-surgery-abroad",
    title: "10 Questions to Ask Before Choosing to Have Surgery Abroad",
    category: "Medical Tourism",
    excerpt: "Practical questions that help you evaluate any hospital or provider, wherever you're considering treatment.",
    readTime: "7 min read",
  },
  {
    slug: "preparing-for-your-first-consultation",
    title: "How to Prepare for Your First Medical Consultation",
    category: "Patient Education",
    excerpt: "What to gather, what to expect, and how to make the most of your first specialist review.",
    readTime: "4 min read",
  },
  {
    slug: "traveling-with-a-companion",
    title: "Traveling for Treatment with a Companion: A Practical Guide",
    category: "Travel",
    excerpt: "Accommodation, local transport, and day-to-day logistics for the person accompanying a patient.",
    readTime: "6 min read",
  },
];

export const whyIndiaStats = [
  { label: "JCI-accredited hospitals", value: "40+" },
  { label: "Typical cost savings vs. US/UK", value: "60–80%" },
  { label: "Avg. specialist experience", value: "15+ yrs" },
  { label: "Countries served", value: "30+" },
];

export type Destination = {
  city: string;
  code: string;
};

export const destinations: Destination[] = [
  { city: "Delhi NCR", code: "DEL" },
  { city: "Mumbai", code: "BOM" },
  { city: "Chennai", code: "MAA" },
  { city: "Bengaluru", code: "BLR" },
  { city: "Hyderabad", code: "HYD" },
  { city: "Kolkata", code: "CCU" },
];
