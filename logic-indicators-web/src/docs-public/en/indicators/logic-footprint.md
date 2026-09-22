---
title: Logic Footprint
description: The ultimate bar-by-bar auction x-ray with multi-column architecture on NinjaTrader 8.
order: 1
category: indicators
public: true
---

# Logic Footprint

> **The ultimate bar-by-bar auction x-ray with multi-column architecture.**  
> *Open the candles and witness the true battle between Bid and Ask: detect diagonal imbalances, intra-bar volume profiles, and the exact Point of Control where buyers and sellers clash.*

---

## What Problem Does It Solve?

Trading exclusively with traditional candlestick charts leaves traders blind during critical decision moments:

1. **The Deception of Candle Closes:** Two candlesticks with identical bodies and wicks can conceal diametrically opposed auction realities. One may have developed through steady aggressive buying, while the other was the result of a massive passive limit absorption where 80% of contracts were transacted on the final tick right before close.
2. **Invisible Market Imbalances:** Cross-market aggression (where aggressive buyers lifting the Ask exceed sellers hitting the diagonal Bid by 300% or 400%) is completely invisible on a standard chart. Without a Footprint, traders often buy right when aggressive demand has already exhausted itself.
3. **Sluggish Platforms and Illegible Screens:** Most conventional Footprint indicators suffer from severe visual clutter. When zooming out, numbers compress into an illegible blur while the platform begins to drop frames and lag.

### The Logic Footprint Solution

Transforms every candle into a crystal-clear, transparent window of real-time Order Flow. Its **modular architecture of up to 3 independent columns per candle** enables you to customize exactly what data to observe on each side of the bar (traditional Bid x Ask, net Delta, Delta %, Volume, or internal profiles). Furthermore, with its **Intelligent Level of Detail (LOD Zoom Out)** system, zooming out dynamically transitions numbers into elegant mini-profiles and then into clean standard candlesticks, ensuring absolute clarity and fluid performance.

---

## What Exactly Is the Indicator?

**Logic Footprint** is the flagship microstructural Order Flow tool for NinjaTrader 8. It displays the precise mathematical distribution of buy orders (Ask) and sell orders (Bid) executed at every price tick within each bar. It features automatic imbalance detection via diagonal ratios and net difference, candle Point of Control (POC) highlighting, 5-tier graduated thermal heatmaps, and a quick-action on-chart toolbar button (`[VP]`) to toggle instantly between the numerical footprint and intra-candle volume profiles.

---

## Key Features

* **Modular Architecture of up to 3 Columns per Candle:** Customize each candle with professional layout combinations (e.g., Column 1: *Delta*, Column 2: *Bid x Ask*, Column 3: *Mini Volume Profile*), with independent alignments, widths, and cell types.
* **Hybrid Cell Rendering (Full vs. Embedded Profile):** Choose between classic rectangular cell backgrounds or horizontal micro-histograms drawn inside the candle body to visually gauge volume concentration at a single glance.
* **Dual Imbalance Detection (Diagonal Ratio & Net Difference):** Highlights in vibrant colors when market demand overwhelms diagonal supply (e.g., 3:1 ratio) or when the net contract difference surpasses your defined threshold.
* **Intra-Candle Point of Control (POC) & Value Area:** Accents the peak volume or peak delta price tick with high-visibility frames, allowing you to instantly identify reversals when the POC migrates to rejection wicks.
* **5-Tier Thermal Heatmaps (Volume, Delta, Bid, and Ask):** Intelligent color gradients that apply deeper or brighter tones to levels where genuine institutional liquidity committed capital.
* **Adaptive Level of Detail (LOD Zoom Out):** Smoothly transitions across three zoom tiers: *Full Numerical Footprint* $\rightarrow$ *Mini Intra-Bar Profile* $\rightarrow$ *Standard Candlestick*, keeping your chart clean and responsive at any zoom level.
* **Smart Auto-Contrast Typography:** Automatically flips number fonts between black and white based on cell background brightness to ensure flawless legibility across all color palettes.
* **Ultra-Fast 60 FPS Real-Time Engine:** High-performance visual rendering designed to process sub-millisecond order bursts without freezing NinjaTrader 8 or dropping frame rates.

---

## Who Is It For?

* **Professional Futures Scalpers (ES, NQ, CL, GC, FDAX):** Who require micro-level confirmation before pulling the trigger by observing Bid/Ask exhaustion.
* **Breakout & Re-Test Day Traders:** Who need to verify whether range breakouts are driven by aggressive market buying or are simply low-volume retail traps.
* **Auction & Order Flow Specialists:** Who audit bar-by-bar POC migration to confirm trend continuation or exhaustion.

---

## Access the Complete Technical Manual

If you are already a Logic Indicators member, explore step-by-step parameters, multi-column setups, and the recommended volume calibration table per instrument in the private manual:

[Access the Logic Footprint Technical Manual →](/dashboard/docs/indicators/logic-footprint)
