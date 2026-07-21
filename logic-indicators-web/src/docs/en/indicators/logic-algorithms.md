---
title: Logic Algorithms
description: Advanced Order Flow pattern recognition suite detecting Imbalances, Absorptions, Exhaustions, and more.
order: 7
category: indicators
---

# Logic Algorithms

> If you haven't installed the Logic Indicators suite yet, please check the [Installation Guide](/docs/installation) first.

The **Logic Algorithms** indicator is the ultimate micro-structural pattern recognition tool for Order Flow traders. Instead of staring at a footprint chart trying to manually spot hidden institutional activity, this indicator automatically scans the tape and highlights precise market events directly on your chart.

Whether you are looking for trapped traders, aggressive whale blocks, or passive absorptions, Logic Algorithms translates complex tick-by-tick data into simple, actionable visual shapes.

## Core Components

This indicator bundles 11 independent detection algorithms. Each algorithm draws a specific visual marker on your chart when triggered:

1. **Imbalance Zones:** Draws semi-transparent rectangles extending forward when aggressive buyers overwhelm sellers (or vice versa) diagonally.

2. **Advanced Clusters:** Highlights specific price levels inside a candle where massive volume or delta was concentrated (Box marker).

3. **Exhaustion:** Places a Triangle at the extreme high/low of a candle when volume completely dries up, signaling a lack of interest.

4. **Absorption Finder:** Identifies when aggressive market orders are absorbed by heavy passive limit orders. (Drawn as a Box with an Institutional Arrow).

5. **Unfinished Auctions:** Extends a solid line from the extreme of a candle if the auction at that price wasn't properly completed.

6. **Zero Nodes:** Highlights price levels where zero volume was traded (voids), acting as potential magnetic zones (Thin Box).

7. **Volume Spikes:** Detects isolated ticks with anomalously high volume compared to their immediate neighbors (Diamond marker).

8. **Whale Blocks:** Finds massive single institutional orders or unusually high average trade sizes (Circle marker).

9. **Trapped Traders:** Highlights the extreme of a candle with a Square marker when large volume is caught on the wrong side of a price reversal.

10. **Delta Reversals:** Colors the background of the chart when a candle moves in one direction but the delta strongly reverses at the end.

11. **Delta Divergences:** Colors the background when the candle's closing direction completely contradicts the overall delta.

## Interactive Tools (Toolbar)

To avoid chart clutter, Logic Algorithms includes a fully customizable "Quick Buttons" toolbar:

- **Quick Buttons (1 to 4):** You can assign any of the 11 algorithms to these four buttons. This allows you to toggle specific patterns on or off instantly with a single click without having to open the indicator settings.

## Configuration Settings

Due to the massive scope of this indicator, settings are divided into specific categories for each algorithm:

### 1. General Settings

- **Zero-Lag Engine Mode:** Controls the graphic refresh rate to save CPU. Options are **Smooth**, **Balanced**, **Max Performance**, or **Disabled** (real-time). Keep on **Balanced** for optimal performance.

- **Signals Margin (Ticks):** Adjusts how far away from the candle extreme the shapes (like Exhaustion triangles or Trapped squares) are drawn.

### 2. Algorithm-Specific Settings

Each algorithm has its own dedicated menu (e.g., *Imbalance Zones*, *Exhaustion*, *Absorptions Finder*) where you can configure the mathematical thresholds and colors:

- **Enable/Show Toggle:** Turn the algorithm on or off globally.

- **Volume / Delta Thresholds:** Define the minimum contracts or delta required to trigger the signal.

- **Filter Modes:** Apply strict filters like candle direction requirements, fading volume, or minimum displaced ticks to validate absorptions.

- **Visuals:** Fully customize the Colors, Opacity, Box Width (**Left**, **Center**, **Right** alignment), and stroke thickness for every single pattern.

### 3. Quick Buttons Setup

- **Button 1 to 4:** Select which algorithm (e.g., **Imbalances**, **Absorptions**, **TrappedTraders**) you want to bind to the top toolbar for rapid access. Choose **None** to hide the button.

## Best Practices & Tips

- **Less is More:** Do not turn on all 11 algorithms at the same time. The chart will become unreadable. Focus on 2 or 3 patterns that fit your specific trading strategy (e.g., Exhaustions + Absorptions for reversal trading).

- **Use the Quick Buttons:** Map your favorite patterns to the Quick Buttons. Keep your chart clean and only toggle the algorithms ON when price approaches your key support/resistance zones to look for confirmation.

- **Context is King:** A standalone algorithm signal (like an Imbalance) in the middle of a range is often noise. Combine these signals with high time-frame context (like Volume Profiles) for high-probability setups.

## See Also

- [Logic Footprint](/docs/indicators/logic-footprint) — Order Flow analysis per candle to look inside the algorithms.

- [Logic BigTrades](/docs/indicators/logic-bigtrades) — Dedicated large block detection.
