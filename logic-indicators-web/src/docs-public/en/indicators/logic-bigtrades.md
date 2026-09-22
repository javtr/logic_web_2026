---
title: Logic BigTrades
description: Real-time institutional order tracker and dynamic defense level projector for NinjaTrader 8.
order: 5
category: indicators
public: true
---

# Logic BigTrades

> **The real-time tracker of massive institutional orders and defense levels.**  
> *Instantly spot transactions from the market's true whales: project proportional volume bubbles, automatic mitigation lines, and untested defense zones.*

---

## What Problem Does It Solve?

In modern financial markets, the vast majority of retail volume does not move price. Price discovery is driven by institutional players executing blocks of hundreds or thousands of contracts:

1. **The Illusion of Traditional Time & Sales:** The order tape runs faster than the human eye can process. High-frequency algorithms slice massive orders into hundreds of micro-orders of 1 or 2 contracts to conceal their presence. Spotting that an institution just swept 1,000 contracts in a single second is practically impossible.
2. **Hidden Defense Levels:** When an institutional whale enters the market with 500 contracts at a specific price, that level becomes their defensive trench. On a standard candlestick chart, no visual trace remains of where that massive capital injection occurred once the candle closes.
3. **False Signals from Volume Dispersion:** Moments of fragmented small orders frequently look like institutional momentum, prompting premature and costly false entries.

### The Logic Big Trades Solution

Continuously scans every aggressive market transaction and visualizes it through **dynamic proportional bubbles** at the exact price tick where it took place. With its proprietary **Magnetic Clustering** algorithm, it consolidates split orders into a single, clean mega-order bubble. Furthermore, it automatically projects **Auto Naked Lines and Mitigation Areas** into the future, mathematically mapping where institutional participants will defend their entries.

---

## What Exactly Is the Indicator?

**Logic Big Trades** is an institutional Order Flow radar for NinjaTrader 8. It identifies, filters, and displays extraordinary market executions hitting the Bid (aggressive selling) and the Ask (aggressive buying). It integrates scalable visual bubbles, 3-level volume heatmaps, dynamic support/resistance lines that cut on touch (*CutOnTouch*), an intra-candle accumulated institutional histogram, and a live HUD tape scanner reporting whale orders in real time.

---

## Key Features

* **Intelligent Magnetic Clustering:** Algorithmic merging that detects when an institutional block was fragmented across milliseconds at the same or adjacent ticks, reconstructing the full order into one unified, transparent bubble.
* **Auto Naked Lines & Defense Areas:** Automatically extends horizontal support and resistance lines forward from large volume blocks with a customizable tick tolerance band. Lines truncate precisely when future price action returns to mitigate the level (*CutOnTouch*).
* **Proportional Scaling & 3-Tier Heatmaps:** Basic or thermal color modes where bubbles not only scale in physical radius with contract size, but also shift in color intensity to highlight aggressive absorption or panic selling.
* **Integrated Institutional Histogram:** Bottom sub-panel displaying accumulated Big Trade volume per candle in Stacked, Bidirectional, or Side-by-Side formats.
* **Live Institutional HUD Tape Scanner:** Compact on-chart terminal displaying real-time data blocks for every whale transaction (timestamp, order direction, volume, and price).
* **Interactive Line Drawing Tool (`[Line]`):** Quick-action toolbar button allowing traders to click any historical bubble to project a custom defense line into the future.
* **Custom Acoustic Audio Alerts:** Configurable sound alerts that trigger immediately when a trade surpasses your defined institutional volume threshold.
* **Ultra-Smooth 60 FPS Real-Time Engine:** High-performance visual rendering designed to process sub-millisecond order bursts without freezing NinjaTrader 8 or dropping frame rates.

---

## Who Is It For?

* **Futures Day Traders & Scalpers (ES, NQ, YM, RTY, CL, GC):** Who seek to trail smart money footprints and enter alongside large liquidity injections.
* **Dynamic Support & Resistance Traders:** Who want key levels based on actual institutional execution volume rather than subjective swing highs and lows.
* **Momentum & Breakout Traders:** Who need to verify whether a range breakout is backed by real institutional buying/selling or is merely a low-volume retail trap.

---

## Access the Complete Technical Manual

If you are already a Logic Indicators member, explore step-by-step parameters, HUD scanner customization, and the recommended volume calibration table per instrument in the private manual:

[Access the Logic Big Trades Technical Manual →](/dashboard/docs/indicators/logic-bigtrades)
