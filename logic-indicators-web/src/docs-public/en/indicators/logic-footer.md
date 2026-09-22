---
title: Logic Footer
description: The ultimate bar-by-bar Order Flow quantitative telemetry at the foot of every candle in NinjaTrader 8.
order: 2
category: indicators
public: true
---

# Logic Footer

> **The ultimate bar-by-bar Order Flow quantitative telemetry at the foot of every candle.**  
> *Transform your chart into an institutional data center: compute and audit in real time up to 27 metrics of volume, cumulative delta, aggression, and absorption on every bar.*

---

## What Problem Does It Solve?

Relying exclusively on candlestick geometry conceals critical information regarding who is truly winning the auction:

1. **The Deception of Price Candles:** A wide-range bullish candlestick may appear strong on the surface, but if its internal delta was deeply negative or aggressive buying completely dried up at the highs, that candle is an impending liquidity trap. Reading candlesticks alone is trading half-blind.
2. **Inability to Audit Intra-Bar Dynamics:** Standard traders cannot see the point of maximum buying effort (*Max Delta*) or maximum selling pressure (*Min Delta*) prior to bar close, nor how much aggressive flow entered once the high or low of the bar was marked (*COT High / Low*).
3. **Cluttered and Inflexible Footers:** Most conventional tools provide bulky tabular footers that consume a third of the screen, lacking proportional heatmaps and unable to dock data directly to individual candles.

### The Logic Footer Solution

Delivers a quantitative control center featuring **27 auction metrics computed tick-by-tick** for every bar. Its hybrid architecture lets you choose between a traditional **Fixed Footer** docked to the bottom of the chart or an agile **Floating DataBox** hovering over each candle, reinforced by **5-tier quantitative thermal heatmaps** that instantly illuminate extraordinary market readings.

---

## What Exactly Is the Indicator?

**Logic Footer** is a bar-by-bar quantitative diagnostic suite for NinjaTrader 8. It measures, classifies, and dissects volume behavior, market order aggression, and bid/ask imbalances in real time. Powered by an adaptive contrast typography engine and flexible relative scale modes (per session, per visible screen, or manual thresholds), it enables traders to scientifically verify whether a trend possesses genuine institutional participation or is stalling in an exhaustion divergence.

---

## Key Features

* **Comprehensive 27-Metric Institutional Catalog:** Real-time auditing of Volumes (Total, Buy, Sell, Cumulative), Deltas (Net, %, Cumulative, Change, Max, Min, Top, Bottom), Transactions (Total Trades, Buy Trades, Sell Trades), COT Metrics (*Commitment of Traders* High/Low), Imbalances (Ratio and Difference), Tick Range, and Bar Duration in seconds.
* **Dual Presentation Modes (Fixed Footer & Floating DataBox):** Switch between a bottom-docked tabular grid or compact floating cards attached to each candle to keep your eyes focused on price action.
* **5-Tier Quantitative Heatmaps:** Applies intelligent thermal gradients to cell backgrounds so extreme volumes, delta bursts, or trade spikes instantly stand out visually.
* **Auto-Contrast Typography Engine:** Automatically shifts text color between black and white based on cell background luminance, ensuring effortless readability across any custom color scheme.
* **Advanced Microstructural Telemetry (COT High & COT Low):** Measures the net delta that hit the market since the candle established its high or low, exposing passive absorptions and aggressive rejections in real time.
* **Level of Detail Adaptive Visibility (LOD Zoom Out):** Automatically collapses text labels, DataBoxes, or footer panels when zooming out, preserving a clean and responsive chart.
* **Quick-Action `[FT]` Toolbar Button:** Toggle the fixed footer on or off with a single click from the floating master toolbar to switch between deep numerical analysis and a clean price view.
* **Ultra-Fast 60 FPS Performance:** Engineered to process high-speed tick bursts without causing NinjaTrader platform stutter or excessive CPU draw.

---

## Who Is It For?

* **Quantitative Day Traders & Scalpers:** Who base execution decisions on objective numerical confirmations (positive Delta, expanding Max Delta, Delta % thresholds).
* **Order Flow Traders Using Traditional Candles:** Who prefer not to clutter charts with full-footprint numeric grids but require the exact same underlying microstructural data.
* **Trend & Continuation Traders:** Who need to confirm whether Cumulative Delta and buy/sell volumes validate new session highs and lows.

---

## Access the Complete Technical Manual

If you are already a Logic Indicators member, explore full breakdowns of all 27 metrics, Floating DataBox setup, and COT validation strategies in the private manual:

[Access the Logic Footer Technical Manual →](/dashboard/docs/indicators/logic-footer)
