---
title: Logic Analytics
description: The quantitative Effort vs. Result laboratory to audit volume, cumulative delta curves, and statistical anomalies on NinjaTrader 8.
order: 6
category: indicators
public: true
---

# Logic Analytics

> **The quantitative Effort vs. Result laboratory over any range of your chart.**  
> *Isolate consolidations, breakouts, or entire market sessions within interactive boxes to audit volume, cumulative delta curves, and institutional statistical anomalies down to the millimeter.*

---

## What Problem Does It Solve?

Analyzing an entire chart often overwhelms traders with scattered data and subjective guesses:

1. **Difficulty Measuring Balance in Key Zones:** When price enters a lateral range or consolidation, it is nearly impossible to tell at a glance who is in control. Is it accumulation or distribution? Are aggressive buyers driving price higher or getting passively absorbed by heavy limit sellers?
2. **Slow and Inaccurate Mental Math:** Trying to manually sum the net delta of 10 or 20 consecutive candles to gauge structural pressure is exhausting and error-prone during live market conditions.
3. **Lack of Objective Statistical Rigor:** Most traders label a candle as "high volume" purely on intuition, without a mathematical baseline to determine whether that effort truly exceeded the session average.

### The Logic Analytics Solution

Enables you to draw interactive analytics boxes directly over any temporal segment of your chart with a simple click-and-drag. Instantly, the box breaks down **Total Volume**, the **Continuous Cumulative Delta Curve**, and a **Quantitative Statistical Panel based on Standard Deviation** ($\mu + 1\sigma$), objectively exposing institutional anomalies of effort versus result (classic Wyckoff principles amplified by modern Order Flow).

---

## What Exactly Is the Indicator?

**Logic Analytics** is a structural and statistical diagnostic tool for NinjaTrader 8. It allows you to isolate any price segment — whether an entire trading session, the first 60 minutes of market open (*Initial Balance*), or a tight consolidation — within smart analytical boxes. Each box incorporates three deep-reading sub-panels (relative volume histogram, geometric cumulative delta curve, and standard deviation telemetry) with interactive touch nodes to resize, drag, or delete boxes on the fly, auto-saving to disk so your analysis is never lost.

---

## Key Features

* **One-Click Interactive Drawing:** Click the on-chart drawing button (`[Draw]`), pick your desired candle range, and receive an instant microstructural diagnosis without opening settings or formulas.
* **Intra-Box Geometric Cumulative Delta Curve:** Plots the exact trajectory of aggressive buying and selling pressure across the selected range, spotting early divergences and absorptions before price breaks out.
* **Statistical Telemetry Panel ($\mu + 1\sigma$):** Automatically calculates the average and standard deviation for Volume, Positive Delta, Negative Delta, and Tick Range, highlighting bars where institutional effort was extraordinary.
* **Automated Daily Box Scheduling (*Auto Box*):** Program recurring boxes to generate automatically every day during strategic market windows (e.g., the first 60 minutes of the New York RTH open or London open).
* **Real-Time Interactive Edit Nodes:** Adjust start and end boundaries directly with your mouse; statistical formulas recalculate instantly upon mouse release.
* **Persistent Disk Storage:** All custom boxes, ranges, and visual notes are automatically saved to local storage. Your analysis remains intact even after restarting NinjaTrader or rebooting your PC.
* **Adaptive Visual Alignment:** Flexible width modes to synchronize histogram bars perfectly with your chart's candlestick widths or display them as an elegant percentage.
* **Ultra-Fast 60 FPS Performance:** Engineered to update smoothly in real time without causing platform lag or high CPU usage.

---

## Who Is It For?

* **Range and Consolidation Traders (Wyckoff / Range Trading):** Who need to verify whether a price balance is an accumulation before a rally or distribution before a markdown.
* **Quantitative and Methodical Traders:** Who demand mathematical objectivity (averages and standard deviations) over gut feelings.
* **Breakout and Re-Test Day Traders:** Who utilize the opening range / Initial Balance to define daily directional bias and measure the strength of range departures.

---

## Access the Complete Technical Manual

If you are already a Logic Indicators member, explore step-by-step parameter breakdowns, sub-panel interpretation, and Auto Box session strategies in the private manual:

[Access the Logic Analytics Technical Manual →](/dashboard/docs/indicators/logic-analytics)
