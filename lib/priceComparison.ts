// Verified, sourced cost comparisons — UK and Dubai figures come from
// independent, named sources (not marketing aggregators with an incentive to
// inflate numbers). India figures are typical ranges from published
// international-patient pricing, including Max Healthcare's own published
// rate for knee replacement (one of TrueCare's actual partner hospitals).
//
// DO NOT add a row here without a named, checkable source for every column.
// If solid data doesn't exist for a procedure yet, leave it out rather than
// estimating — see the FAQ/cost section copy for how we handle that gap.

export type PriceComparisonRow = {
  treatment: string;
  ukRange: string;
  dubaiRange: string;
  indiaRange: string;
  // Numeric bounds (USD), used only to compute an honest "save up to X%"
  // figure — kept separate from the display strings above so that figure is
  // always derived from real data, never a separately-typed claim that could
  // drift out of sync with the table.
  ukHigh: number;
  indiaLow: number;
};

export const priceComparison: PriceComparisonRow[] = [
  {
    treatment: "Coronary Bypass Surgery (CABG)",
    ukRange: "$25,000 – $32,000",
    dubaiRange: "$22,000 – $40,000",
    indiaRange: "$6,000 – $12,500",
    ukHigh: 32000,
    indiaLow: 6000,
  },
  {
    treatment: "Total Knee Replacement",
    ukRange: "$13,000 – $22,000",
    dubaiRange: "$12,000 – $23,000",
    indiaRange: "$4,000 – $9,000",
    ukHigh: 22000,
    indiaLow: 4000,
  },
];

// Derived, not hardcoded — recalculates automatically if the rows above
// change, so this figure can never silently drift out of sync with the
// table. Rounded down to the nearest 5% to stay conservative rather than
// overstating the best-case number.
export const maxSavingsPercent = (() => {
  const best = Math.max(
    ...priceComparison.map((row) => 1 - row.indiaLow / row.ukHigh)
  );
  return Math.floor(best * 100 / 5) * 5;
})();

export const priceComparisonSources =
  "UK figures: PHIN (Private Healthcare Information Network) and multiple independent UK private-hospital-group sources (Circle Health, Practice Plus Group), 2026. Dubai figures: DOH (Dubai Health Authority) Mandatory Tariff-sourced market data and multiple Dubai hospital-published rates, 2026 — Dubai's range is wide because it spans standard to ultra-premium 'British-standard' facilities. India figures: typical published international-patient rates, including Max Healthcare's own published knee replacement rate. All figures are typical ranges for planning purposes, not quotes — your exact cost is confirmed only after your medical reports are reviewed.";

