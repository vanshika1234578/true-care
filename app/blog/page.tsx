import type { Metadata } from "next";
import { Clock } from "lucide-react";
import Section from "@/components/Section";
import AnimatedSection from "@/components/AnimatedSection";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description: "Educational articles on medical tourism, healthcare, travel, and patient preparation.",
};

export default function BlogPage() {
  return (
    <Section
      eyebrow="Blog"
      title="Guides for patients, not pitches"
      description="Practical, educational reading on medical tourism, travel logistics, and preparing for treatment."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {blogPosts.map((post, i) => (
          <AnimatedSection
            key={post.slug}
            delay={i * 0.05}
            className="flex flex-col rounded-2xl border border-navy-100/70 bg-white p-7 shadow-card dark:border-white/10 dark:bg-white/5"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-primary-500">
              {post.category}
            </span>
            <h3 className="mt-3 font-display text-lg font-semibold text-navy-500 dark:text-white">
              {post.title}
            </h3>
            <p className="mt-2 flex-1 text-sm text-navy-300 dark:text-white/60">{post.excerpt}</p>
            <span className="mt-4 flex items-center gap-1.5 text-xs text-navy-400 dark:text-white/50">
              <Clock size={13} /> {post.readTime}
            </span>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
}
