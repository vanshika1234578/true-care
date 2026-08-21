// Featured, image-led treatment cards for specific regions where real
// (AI-generated, not depicting real/identifiable people) visuals have been
// supplied. Only reference an image here once the actual file exists under
// public/images/treatments/ — do not add an entry pointing at a file that
// hasn't been placed yet.

export type FeaturedTreatmentImage = {
  treatmentSlug: string;
  image: string;
  title: string; // matches the text already baked into the image
  subtitle: string;
};

export const africaFeaturedTreatments: FeaturedTreatmentImage[] = [
  {
    treatmentSlug: "orthopedics",
    image: "/images/treatments/orthopaedic.jpg",
    title: "Orthopaedic",
    subtitle: "Joint, Spine & Mobility Care",
  },
  {
    treatmentSlug: "oncology",
    image: "/images/treatments/oncology.jpg",
    title: "Oncology",
    subtitle: "Personalized, Compassionate Cancer Care",
  },
  {
    treatmentSlug: "cardiology",
    image: "/images/treatments/cardiac.jpg",
    title: "Cardiac",
    subtitle: "Heart & Vascular Health",
  },
];

export const europeFeaturedTreatments: FeaturedTreatmentImage[] = [
  {
    treatmentSlug: "orthopedics",
    image: "/images/treatments/europe-orthopaedic.jpg",
    title: "Orthopaedic",
    subtitle: "Joint, Spine & Mobility Care",
  },
  {
    treatmentSlug: "cardiology",
    image: "/images/treatments/europe-cardiovascular.jpg",
    title: "Cardiovascular",
    subtitle: "Heart, Vascular & Circulation Care",
  },
  {
    treatmentSlug: "oncology",
    image: "/images/treatments/europe-oncology.jpg",
    title: "Oncology",
    subtitle: "Comprehensive Cancer Care & Treatment",
  },
];

export const middleEastFeaturedTreatments: FeaturedTreatmentImage[] = [
  {
    treatmentSlug: "orthopedics",
    image: "/images/treatments/middleeast-orthopaedic.jpg",
    title: "Orthopaedic Excellence",
    subtitle: "Hand, Wrist & Physical Therapy Care",
  },
  {
    treatmentSlug: "oncology",
    image: "/images/treatments/middleeast-oncology.jpg",
    title: "Comprehensive Oncology Care",
    subtitle: "Expert Cancer Treatments & Supportive Services",
  },
  {
    treatmentSlug: "cardiology",
    image: "/images/treatments/middleeast-cardiac.jpg",
    title: "Comprehensive Cardiac Care",
    subtitle: "Expert Heart Function Assessment & Personalized Treatment",
  },
];

// Central Asia only — explicitly not used for Bangladesh (South Asia),
// per the founder's direction when this set was supplied.
export const centralAsiaFeaturedTreatments: FeaturedTreatmentImage[] = [
  {
    treatmentSlug: "orthopedics",
    image: "/images/treatments/centralasia-orthopaedic.jpg",
    title: "Orthopaedic",
    subtitle: "Upper Extremity & Motion Care",
  },
  {
    treatmentSlug: "oncology",
    image: "/images/treatments/centralasia-oncology.jpg",
    title: "Oncology",
    subtitle: "Comprehensive Diagnosis & Treatment",
  },
  {
    treatmentSlug: "cardiology",
    image: "/images/treatments/centralasia-cardiology.jpg",
    title: "Cardiology",
    subtitle: "Comprehensive Heart Health & Care",
  },
];
