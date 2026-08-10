import { ShieldCheck, Stethoscope, LifeBuoy, Compass } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "Trusted Hospitals" },
  { icon: Stethoscope, label: "Experienced Doctors" },
  { icon: LifeBuoy, label: "End-to-End Support" },
  { icon: Compass, label: "Transparent Guidance" },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {badges.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-2.5 rounded-2xl border border-navy-100/70 bg-white/70 px-4 py-5 text-center shadow-card backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
            <Icon size={20} />
          </div>
          <span className="text-sm font-medium text-navy-500 dark:text-white/80">{label}</span>
        </div>
      ))}
    </div>
  );
}
