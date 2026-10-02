export type TestimonialFolder = {
  slug: string;
  name: string;
  summary: string;
  driveUrl: string;
  // Matches the `icon` keys in components/IconMap.tsx
  icon: string;
  // Matches a treatment slug in lib/data.ts
  treatmentSlug: string;
};

export const testimonialFolders: TestimonialFolder[] = [
  {
    slug: "orthopedics",
    name: "Orthopedics",
    summary: "Joint replacement, spine surgery, and sports injury recoveries.",
    driveUrl:
      "https://drive.google.com/drive/folders/1Lrx_BZo7Clr7eC1j3_vvYlvnEwN91AIk?usp=sharing",
    icon: "Bone",
    treatmentSlug: "orthopedics",
  },
  {
    slug: "cancer-care",
    name: "Cancer Care",
    summary: "Surgery, chemotherapy, and radiation journeys in oncology.",
    driveUrl:
      "https://drive.google.com/drive/folders/1eHt0_-8b3btM92poU-BRKeEqSQwD7y4l?usp=sharing",
    icon: "Ribbon",
    treatmentSlug: "oncology",
  },
  {
    slug: "cardiology",
    name: "Cardiology",
    summary: "Bypass, valve repair, and interventional heart care.",
    driveUrl:
      "https://drive.google.com/drive/folders/1KK84efrp2PyudBjkzieutIfrKjzrpMkB?usp=sharing",
    icon: "HeartPulse",
    treatmentSlug: "cardiology",
  },
  {
    slug: "kidney-liver-transplant",
    name: "Kidney & Liver Transplant",
    summary: "Patients and families who completed a transplant with us.",
    driveUrl:
      "https://drive.google.com/drive/folders/1PLdTKpZqG_IK4cVWHXQaCUwaY_NtMsHM?usp=share_link",
    icon: "Activity",
    treatmentSlug: "transplants",
  },
];
