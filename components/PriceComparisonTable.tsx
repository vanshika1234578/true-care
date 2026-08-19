import { priceComparison, priceComparisonSources } from "@/lib/priceComparison";

/**
 * Renders the full UK / Dubai / India cost comparison table.
 * Shared across country landing pages and the homepage so the data only
 * needs to be sourced and updated in one place (lib/priceComparison.ts).
 */
export default function PriceComparisonTable() {
  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-navy-100/70 bg-white shadow-card dark:border-white/10 dark:bg-white/5">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-surface-soft dark:bg-surface-darkSoft">
              <th className="whitespace-nowrap px-5 py-4 font-display font-semibold text-navy-500 dark:text-white">
                Treatment
              </th>
              <th className="whitespace-nowrap px-5 py-4 font-display font-semibold text-navy-500 dark:text-white">
                Typical UK Private Cost
              </th>
              <th className="whitespace-nowrap px-5 py-4 font-display font-semibold text-navy-500 dark:text-white">
                Typical Dubai Cost
              </th>
              <th className="whitespace-nowrap px-5 py-4 font-display font-semibold text-primary-600 dark:text-primary-300">
                TrueCare India Estimate
              </th>
            </tr>
          </thead>
          <tbody>
            {priceComparison.map((row) => (
              <tr key={row.treatment} className="border-t border-navy-100/60 dark:border-white/10">
                <td className="whitespace-nowrap px-5 py-4 text-navy-400 dark:text-white/70">
                  {row.treatment}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-navy-400 dark:text-white/70">
                  {row.ukRange}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-navy-400 dark:text-white/70">
                  {row.dubaiRange}
                </td>
                <td className="whitespace-nowrap px-5 py-4 font-semibold text-navy-500 dark:text-white">
                  {row.indiaRange}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-navy-100/60 px-5 py-4 text-xs leading-relaxed text-navy-300 dark:border-white/10 dark:text-white/50">
        {priceComparisonSources}
      </div>
    </div>
  );
}
