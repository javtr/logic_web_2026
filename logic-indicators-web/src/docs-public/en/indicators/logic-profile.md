---
title: Logic Profile
description: The ultimate Auction Market Theory workstation with dual-column Volume Profile, Delta Profile, and TPO Market Profile for NinjaTrader 8.
order: 3
category: indicators
public: true
---

# Logic Profile

> **The ultimate Auction Market Theory workstation featuring dual-column Volume Profile, Delta Profile, and TPO Market Profile.**  
> *Discover where true market value resides session by session: visualize Value Areas (VA), Points of Control (POC), Initial Balance (IB), and TPO single prints within a state-of-the-art visual architecture.*

---

## What Problem Does It Solve?

Traders relying solely on conventional technical indicators face three severe structural handicaps:

1. **"Fair Price" Blindness:** Candlestick charts display which prices were touched, but fail to show whether the market accepted or rejected those price levels. Buying at a price where the auction lacks volume acceptance is one of the leading causes of consistent trading losses.
2. **The Volume vs. Time Disconnect:** Traditional *Volume Profile* indicates how many contracts traded at each price, but reveals nothing about how much time the market spent there. Conversely, classic time-based *Market Profile* reveals auction duration, but ignores executed volume. Trading with only one side of the equation leaves you with half the map.
3. **Sluggish Platforms and Clunky Indicators:** Most NinjaTrader profiling tools require loading two or three separate indicators to display Volume, Delta, and TPO, bogging down PC resources, cluttering the screen, and forcing chart reloads on every parameter adjustment.

### The Logic Profile Solution

Integrates comprehensive Auction Market Theory (AMT) analysis into a single, institutional-grade engine. Its **synchronized dual-column session architecture** allows you to place a geometric *Volume Profile* alongside a *Delta Profile* or a traditional lettered *TPO Market Profile*, accurately projecting the **Value Area (70%)**, **unmitigated Naked POCs**, the **Initial Balance (first 60 minutes)**, and **Single Print rejection zones**.

---

## What Exactly Is the Indicator?

**Logic Profile** is the professional session-by-session auction analysis solution (daily, weekly, monthly, or custom ranges) for NinjaTrader 8. It dissects and contrasts the interaction between price, volume, and time across every trading day. Supporting automated schedules (24h continuous ETH or regular RTH hours) and **interactive mouse-drawn profiles**, Logic Profile pinpoints the natural support and resistance levels where institutions defend their inventory and where price reacts with maximum precision.

---

## Key Features

* **Synchronized Dual-Column Architecture:** Renders two complementary profiles per session side-by-side within the same visual boundary (e.g., Column 1: *Volume Profile* in bars or continuous geometry; Column 2: *TPO Market Profile* or *Delta Profile*).
* **Full TPO Market Profile with Letters and Blocks:** Groups configurable time brackets (standard 30-minute intervals) rendered as clean blocks, classic letters (A, B, C...), or smooth geometry, with automatic detection of aggressive rejections (*Single Prints*).
* **5-Level Chronological Time Heatmaps in TPO:** Color-codes letters or blocks based on the time of day they formed (from session open in blue to session close in red), allowing you to reconstruct the day's chronological narrative at a glance.
* **Point of Control (POC) and Naked POC Extensions:** Highlights the session's peak consensus price and projects horizontal lines into the future that automatically terminate upon the first retest (*CutOnTouch*).
* **Automated Initial Balance (IB) Delineation:** Traces the price range of the first 60 minutes of the regular session alongside key statistics to project intraday range expansion targets.
* **Floating Session Metrics HUD Box:** Anchors a quantitative summary widget in the top or bottom corner displaying Total Volume, Net Delta, Range in ticks, IB Range, and exact POC/VAH/VAL quote levels.
* **Interactive Mouse Drawing Tool:** Activate the on-chart `[Draw]` button to construct custom Volume/TPO profiles across any impulse, consolidation, or candle range with just two clicks.
* **Fluid 60 FPS Performance:** Hardware-accelerated graphics engine designed to load months of historical sessions instantaneously using ultra-fast data loading algorithms.

---

## Who Is It For?

* **Futures Day Traders (ES, NQ, YM, RTY, CL, GC, FDAX):** Who start every trading session mapping actionable levels from the previous day's Value Area (VAH/VAL) and POC.
* **Auction & Market Profile Operators (AMT):** Who correlate time (TPO) with volume to identify Trend Days, Rotational Balance Days, and auction failures.
* **Scalpers:** Who rely on Initial Balance extremes and unmitigated Naked POCs for high-precision entry triggers and profit targets.

---

## Access the Complete Technical Manual

If you already hold an active Logic Indicators license, access the detailed technical manual covering every parameter, calculation mode, and advanced operational setup:

[Go to the Logic Profile Technical Manual (Members Area) →](/dashboard/docs/indicators/logic-profile)
