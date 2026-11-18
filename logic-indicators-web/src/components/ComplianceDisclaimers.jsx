// src/components/ComplianceDisclaimers.jsx
// Descargos legales estándar en letra pequeña para pasarelas de pago (MoR),
// regulación CFTC Rule 4.41 y marca registrada de NinjaTrader®.

export const ComplianceDisclaimers = ({ compact = false }) => {
  return (
    <div
      className={`text-[11px] leading-relaxed text-text-muted/80 space-y-2.5 ${
        compact
          ? 'bg-dark-800/40 border border-dark-700/70 rounded-2xl p-5 md:p-6'
          : 'border-t border-dark-700/80 pt-6 mt-8'
      }`}
    >
      <p>
        <strong className="text-text-muted font-semibold">Software Notice:</strong>{' '}
        Logic Indicators develops and licenses downloadable charting software and technical analysis tools for NinjaTrader® 8. All software tools and documentation are provided strictly for informational, educational, and technical chart analysis purposes, and do not constitute financial, investment, or brokerage advice.
      </p>

      <p>
        <strong className="text-text-muted font-semibold">Risk Disclosure:</strong>{' '}
        Futures and forex trading contains substantial risk and is not for every investor. An investor could potentially lose all or more than the initial investment. Risk capital is money that can be lost without jeopardizing one’s financial security or lifestyle. Only risk capital should be used for trading and only those with sufficient risk capital should consider trading. Past performance is not necessarily indicative of future results.
      </p>

      <p>
        <strong className="text-text-muted font-semibold">Hypothetical Performance Disclosure (CFTC Rule 4.41):</strong>{' '}
        Hypothetical or simulated performance results have certain limitations. Unlike an actual performance record, simulated results do not represent actual trading. Also, since the trades have not been executed, the results may have under-or-over compensated for the impact, if any, of certain market factors, such as lack of liquidity. Simulated trading programs in general are also subject to the fact that they are designed with the benefit of hindsight. No representation is being made that any account will or is likely to achieve profit or losses similar to those shown.
      </p>

      <p>
        <strong className="text-text-muted font-semibold">Trademark Disclosure:</strong>{' '}
        NinjaTrader® is a registered trademark of NinjaTrader Group, LLC. No NinjaTrader company has any affiliation with the owner, developer, or provider of the products or services described herein, nor does any NinjaTrader company endorse or recommend any of our software products.
      </p>
    </div>
  );
};
