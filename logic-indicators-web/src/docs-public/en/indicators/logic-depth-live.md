---
title: Logic Depth Live
description: Continuous HD order book visualization with sub-millisecond microstructure in NinjaTrader 8.
order: 9
category: indicators
public: true
---

# Logic Depth Live

> **Public overview** — for the complete technical manual (every NinjaTrader 8 parameter, configuration options, and best practices), [sign in to your account](/login?next=/dashboard/docs/indicators/logic-depth-live).

## What Problem Does It Solve?

For high-speed scalpers and modern auction market operators, standard candlestick charts suffer from a fatal flaw: **time compression conceals microstructural truth**.

1. **Intra-bar blindness:** In a 1-minute bar covering 15 points, thousands of executions happen at sub-millisecond intervals. A candlestick reveals only four data points (Open, High, Low, Close), completely hiding internal interaction: did aggressive market orders sweep through the book or was there fierce absorption at a single tick?
2. **Inability to track passive vs. aggressive matching simultaneously:** Most trading platforms separate Time & Sales (executions tape) from DOM depth. Traders must monitor multiple screens and mentally match figures at impossible speeds.

**The Logic Depth Live Solution:** Generates a **continuous, fluid time canvas** where the resting limit order book and aggressive market aggressions live together in microsecond synchronization. Watch in real time as Best Bid and Best Ask trajectories cut through resting liquidity walls.

## What Is It?

**Logic Depth Live** is an advanced execution and order flow reading environment built to run as an ultra-fast sub-chart directly inside your NinjaTrader 8 workspace. Powered by a continuous or event-based time engine, it delivers HD thermal order book visualization, live Best Bid/Ask spread lines, trade bubbles with magnetic clustering, and integrated **Smart Columns** on the DOM (passive depth, executed volume, and accumulated net delta per level).

## Key Features

- **Continuous Sub-Millisecond Thermal Canvas:** Smooth visualization of live resting liquidity with color interpolation updating every order book delta at stable 60 FPS.
- **Smart Trade Bubbles with Magnetic Clustering:** Displays every aggressive market transaction as a bubble sized and shaded proportionally to executed volume. Merges simultaneous trades to eliminate clutter and highlight true institutional size.
- **Continuous Best Bid & Best Ask Trajectories:** Plots high-precision spread lines in real time, revealing slippage, spread widening, and Market Maker withdrawal during volatile moments.
- **Smart Columns on the DOM:** Integrates three analytical columns on the right margin:
  1. *Passive DOM:* Live resting contract depth.
  2. *Executed Volume:* Total volume absorbed at each price across the visible window.
  3. *Net Delta:* Net aggressive buying or selling pressure per tick.
- **Interactive On-Chart HUD Time Machine:** Step backward in time, pause flow, zoom in down to milliseconds, or snap back to live market action with on-chart touch controls.
- **Constant vs. Event-Based Time Flow:** Choose between uniform millisecond pacing or automatic event-driven chart progression for low-volume sessions.
- **Auto-Center Sync:** Keeps price centered vertically on your screen, communicating directly with NinjaTrader's render pipeline.

## Who Is It For?

- **Professional Futures Scalpers:** Targeting 4 to 12 ticks in highly liquid markets who must spot absorption before a bar finishes printing.
- **Microstructure Specialists:** Identifying where massive blocks of passive liquidity absorb aggressive momentum at auction extremes.
- **News and Market Open Traders:** Monitoring liquidity dry-ups, spread expansion, and rapid book replenishment during high-momentum events.

## Access the Complete Documentation

The complete technical manual — detailing every NinjaTrader 8 parameter, Smart Column configuration, and order flow trading setups — is exclusively available to active members.

[Sign in to access the technical manual →](/login?next=/dashboard/docs/indicators/logic-depth-live)
