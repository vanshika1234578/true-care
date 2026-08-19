import type { ComponentProps } from "react";
import MedicalReportForm from "@/components/MedicalReportForm";

export default function LegacyBangladeshCardiacReportForm(props: Omit<ComponentProps<typeof MedicalReportForm>, "country" | "source"> & { country?: string; source?: string }) {
  return <MedicalReportForm {...props} country={props.country ?? "Bangladesh"} source={props.source ?? "cardiac-treatment-india"} />;
}
