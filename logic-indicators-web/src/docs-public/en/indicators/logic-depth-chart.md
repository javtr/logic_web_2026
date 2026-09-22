---
title: Logic Depth Chart
description: Real-time institutional liquidity heatmap directly behind your price action in NinjaTrader 8.
order: 8
category: indicators
public: true
---

# Logic Depth Chart

> **Public overview** — for the complete technical manual (every NinjaTrader 8 parameter, configuration options, and best practices), [sign in to your account](/login?next=/dashboard/docs/indicators/logic-depth-chart).

## What Problem Does It Solve?

Traditional order book tools (static DOM or numerical ladders) present three critical challenges for professional traders:

1. **Cognitive exhaustion and temporal blindness:** Numbers on a DOM flicker hundreds of times per second. The human brain cannot recall how many contracts were resting at a key support level just minutes ago. The traditional DOM has no memory.
2. **The spoofing trap and ghost orders:** Institutional algorithms constantly place and cancel limit orders to mislead retail participants. On a standard numerical DOM, it is impossible to distinguish between a 1,000-contract wall that has defended price for 30 minutes versus one placed two seconds ago to simulate demand and pull back before execution.
3. **Contextual disconnection:** Analyzing the DOM in a separate floating window while watching price candles on another fragments focus during high-volatility events.

**The Logic Depth Chart Solution:** Projects the entire historical market depth (Level 2) directly onto your chart background as a **continuous thermal heatmap**. It provides instant visual confirmation of when liquidity appeared, whether price was attracted to it, and whether institutions absorbed aggressive flow or pulled their orders (spoofing).

## What Is It?

**Logic Depth Chart** is an institutional-grade indicator for NinjaTrader 8 that merges historical and live market depth with standard price charts. Powered by a high-performance graphics engine accelerated by your computer's graphics hardware, it displays order book changes as ultra-smooth thermal color bands behind your candlestick, range, volume, or tick bars, accompanied by a clean **Live DOM panel**. The result is continuous, transparent visibility into passive supply and demand without slowing down your platform or causing frame rate drops.

## Key Features

- **Continuous Historical Heatmap:** Records and visualizes the presence, persistence, and cancellation of passive limit orders behind every bar.
- **Extend Passive Liquidity:** Projects confirmed passive liquidity forward into empty chart space to anticipate inflection points and barriers before price reaches them.
- **Integrated Live DOM Panel with Digital Readout:** A right-aligned depth histogram displaying exact contract quantities and visual bar lengths on every price tick.
- **Zero-Lag 60 FPS Performance:** Engineered to process high-volatility economic news releases (FOMC, NFP, CPI) smoothly without degrading platform responsiveness or frame rates.
- **On-Chart Floating HUD Controller:** Calibrate minimum volume filters, maximum color references, tick grouping, and toggle visual elements on the fly with a single click.
- **High-Density Color Palettes (Dual & Single Heatmap):** High-contrast color modes to distinguish Bid support from Ask resistance, or clean monochromatic gradient maps.
- **Multi-Timeframe & Multi-Bar Compatibility:** Operates smoothly across high-liquidity futures (ES, NQ, YM, RTY, CL, GC, ZN, FDAX) on minute, second, tick, volume, or range charts.

## Who Is It For?

- **Day Traders and Futures Operators:** Who need to verify whether key technical levels (support, resistance, session highs and lows) are backed by authentic institutional limit orders.
- **Order Flow & Auction Market Traders:** Who want to combine passive liquidity (Depth Chart) with executed aggression (Footprint / BigTrades) to confirm high-probability reversals.
- **Scalpers:** Who need to identify low-friction zones (liquidity vacuums for swift moves) and heavy limit walls where price is likely to stall.

## Access the Complete Documentation

The complete technical manual — detailing every NinjaTrader 8 parameter, setting guidelines, and trading methods for identifying absorption and spoofing — is exclusively available to active members.

[Sign in to access the technical manual →](/login?next=/dashboard/docs/indicators/logic-depth-chart)
