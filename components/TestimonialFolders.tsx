import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { TreatmentIcon } from "./IconMap";
import { testimonialFolders } from "@/lib/testimonialFolders";

export default function TestimonialFolders() {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {testimonialFolders.map((folder) => (
        <li
          key={folder.slug}
          className="flex h-full flex-col rounded-2xl border border-navy-100/70 bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-glow dark:border-white/10 dark:bg-white/5"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-300">
            <TreatmentIcon name={folder.icon} size={22} />
          </div>

          <h3 className="mt-4 font-display text-xl font-semibold text-navy-500 dark:text-white">
            {folder.name}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-300 dark:text-white/60">
            {folder.summary}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-navy-100/60 pt-5 dark:border-white/10">
            <a
              href={folder.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${folder.name} testimonials (opens Google Drive in a new tab)`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 font-display text-sm font-semibold text-white shadow-glow transition-colors duration-300 hover:bg-primary-600"
            >
              View testimonials
              <ExternalLink size={16} aria-hidden="true" />
            </a>
            <Link
              href={`/treatments/${folder.treatmentSlug}`}
              className="text-sm font-semibold text-primary-600 underline-offset-4 hover:underline dark:text-primary-300"
            >
              About {folder.name} treatment
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
