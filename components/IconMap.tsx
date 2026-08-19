import {
  Heart,
  Bone,
  Baby,
  Smile,
  Sparkles,
  Brain,
  HeartPulse,
  Ribbon,
  Eye,
  Ear,
  Stethoscope,
  Activity,
  Pill,
  LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Heart,
  Bone,
  Baby,
  Smile,
  Sparkles,
  Brain,
  HeartPulse,
  Ribbon,
  Eye,
  Ear,
  Stethoscope,
  Activity,
  Pill,
};

export function TreatmentIcon({ name, size = 24, className = "" }: { name: string; size?: number; className?: string }) {
  const Icon = iconMap[name] ?? Heart;
  return <Icon size={size} className={className} />;
}
