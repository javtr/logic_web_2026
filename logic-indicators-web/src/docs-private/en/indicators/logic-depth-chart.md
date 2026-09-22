---
title: Logic Depth Chart
description: Complete technical manual and parameter reference for Logic Depth Chart in NinjaTrader 8.
order: 8
category: indicators
---

# Logic Depth Chart

> If you haven't installed the Logic Indicators suite yet, please refer to the [Installation Guide](/docs/installation) first.

The **Logic Depth Chart** indicator projects historical and live market depth (Level 2) directly onto your price chart via an ultra-smooth continuous heatmap optimized for maximum graphics performance without overloading your CPU, complemented by an integrated Live DOM panel on the right margin.

---

## Visual Components on the Chart

1. **Historical Liquidity Heatmap (Background):** Horizontal color bands behind your bars whose brightness and color intensity represent the volume of resting limit orders at each price tick.
2. **Extend Passive Liquidity:** Projects the latest confirmed resting limit orders horizontally forward into blank chart space to anticipate support/resistance barriers.
3. **Live DOM Panel (Right Margin):** A horizontal depth histogram synchronized tick-for-tick with current price, showing volume bars and numeric contract counts.
4. **Floating Control HUD:** An on-chart touch control panel allowing immediate calibration of filters and visibility without opening properties windows.

---

## Interactive Tools and Controls

* **`[HUD]` button on the LOF master toolbar (`LOF_Configuration`):** Instantly shows or hides the on-chart calibration panel.
* **`[Reset]` button on the LOF master toolbar:** Clears local historical liquidity data and refreshes chart visualization in the event of broker data anomalies.
* **Floating HUD Controls:**
  * **Row 1 (`Min Filter` with `[-]` and `[+]`):** Steps the minimum order size filter up or down by `Volume Step Size` to filter out retail noise.
  * **Row 2 (`Max Vol` with `[-]` and `[+]`):** Adjusts the upper bound of the color saturation scale for fast/slow market conditions.
  * **Row 3 (`[HEATMAP]` and `[DOM]` Toggle buttons):** Quickly turns the background heatmap or the right-hand DOM panel on/off with a single click.
  * **Row 4 (`Ticks Group` with `[-]` and `[+]`):** Groups ticks in multiples (1, 2, 4, etc.) to consolidate the order book in volatile markets (e.g., NQ).

---

## Configuration Options (Parameter by Parameter)

The following reference breaks down every parameter found in the NinjaTrader 8 Properties window (**F6**), organized by category:

### 1. General Settings

* **`Instance Name`** *(String | Default: "Logic Depth Chart")*  
  Unique identifier for this indicator instance within the LOF suite orchestrator.
* **`Instance Color`** *(Brush | Default: Cyan)*  
  Badge color used to identify this instance in the `LOF_Configuration` master toolbar.
* **`Ticks per Level`** *(Int | Range: 1 to 20 | Default: 1)*  
  Tick aggregation multiplier. Combines multiple price ticks into a single visual row.  
  * *Recommendation:* Keep at `1` for thick-book instruments like ES, ZN, or FDAX. Set to `2` or `4` on NQ or crypto instruments to consolidate fragmented books.
* **`Zero-Lag Engine Mode`** *(Enum: Disabled, Smooth, Balanced, MaxPerformance | Default: Balanced)*  
  Zero-Lag optimization mode balancing thermal heatmap fluidity against processor load:  
  * `Disabled`: Continuous real-time rendering at stable 60 FPS.  
  * `Smooth`: High visual smoothness for powerful workstations.  
  * `Balanced` *(Recommended)*: Fluid response with minimal resource overhead; optimal for multi-chart layouts.  
  * `MaxPerformance`: Maximum resource efficiency; recommended for laptops or extreme macroeconomic releases.
* **`Clear Cache on Close`** *(Bool | Default: False)*  
  When set to `True`, immediately frees historical market depth RAM buffers upon closing the chart window.
* **`Layer Mode`** *(Enum: BehindPrice, Normal, TopMost | Default: BehindPrice)*  
  Render layer order relative to price bars:  
  * `BehindPrice` *(Recommended)*: Draws the heatmap behind bars so candles and footprint numbers stay clearly visible.  
  * `Normal`: Draws at the same Z-level as bars.  
  * `TopMost`: Draws on top of all chart drawings.
* **`Layer Priority (Offset)`** *(Int | Default: 0)*  
  Sets layer stacking priority among multiple LOF indicators on the same chart.

---

### 2. Historical Heatmap

* **`Show Historical Heatmap`** *(Bool | Default: True)*  
  Enables or disables the background thermal depth map.
* **`Extend Passive Liquidity`** *(Bool | Default: True)*  
  Horizontally projects the most recent known resting volumes into the blank area ahead of the current bar.  
  * *Recommendation:* Leave as `True` to anticipate institutional barriers before price approaches them.
* **`Max Depth Levels`** *(Int | Range: 10 to 500 | Default: 100)*  
  Maximum number of price levels above (Asks) and below (Bids) the current market price stored in memory and rendered.  
  * *Recommendation:* `50` to `100` comfortably covers daily price action in ES and NQ without consuming RAM on distant, unreachable levels.
* **`Opacity Scaling Mode`** *(Enum: Manual, AutoVisible | Default: Manual)*  
  Mathematical method used to compute color brightness and opacity:  
  * `Manual`: Strictly adheres to fixed thresholds defined in `Min Volume Filter` and `Max Volume Reference`.  
  * `AutoVisible`: Continuously scans the highest volume resting within your current screen view and dynamically normalizes color scale.
* **`Min Volume Filter`** *(Double | Default: 0)*  
  Minimum resting contract size required to paint a heat band. Any level below this threshold is rendered fully transparent.  
  * *Recommendation:* In ES set between `100` and `200`; in NQ set between `20` and `40` to filter retail noise.
* **`Max Volume Reference`** *(Double | Default: 300)*  
  Contract size threshold that produces maximum color intensity (Level 5 / full brightness). Any volume equal to or exceeding this value gets the brightest color.  
  * *Recommendation:* In ES set between `800` and `1,500`; in NQ set between `100` and `250`.
* **`Heatmap Color Style`** *(Enum: Solid, HeatmapDual, HeatmapSingle | Default: Solid)*  
  Visual color scheme for the heatmap:  
  * `Solid`: Soft monochromatic tone with volume-proportional opacity (minimal visual distraction).  
  * `HeatmapDual`: Dual color scheme (blue shades for Bids / red shades for Asks).  
  * `HeatmapSingle`: Universal heat gradient (Blue $\rightarrow$ Orange $\rightarrow$ Gold) based purely on concentration.
* **`Enable Transparency`** *(Bool | Default: True)*  
  Enables color transparency so chart grid lines, candles, and drawings remain clearly visible beneath the liquidity bands.
* **`Sync with DepthLive Panel`** *(Bool | Default: True)*  
  Automatically synchronizes color palettes and filters with the `LOF_DepthLive` instance if both run on the same chart.

---

### 3. Live DOM Panel

* **`Show Live DOM`** *(Bool | Default: True)*  
  Shows or hides the right-side horizontal depth histogram.
* **`DOM Color Style`** *(Enum: Solid, HeatmapDual, HeatmapSingle | Default: Solid)*  
  Color palette applied to the side panel depth bars.
* **`DOM Opacity Scaling`** *(Enum: Manual, AutoVisible | Default: Manual)*  
  Opacity normalization algorithm for side panel bars.
* **`DOM Min Volume Filter`** *(Double | Default: 0)*  
  Numeric filter for DOM bars; levels with volume below this value are not drawn.
* **`DOM Max Volume Ref.`** *(Double | Default: 100)*  
  Volume threshold at which a depth bar reaches the full pixel width defined by `Panel Width`.
* **`Enable Transparency`** *(Bool | Default: True)*  
  Applies transparency to DOM depth bars.
* **`Panel Width (Px)`** *(Int | Default: 150)*  
  Total width in pixels reserved for the Live DOM panel.
* **`Right Margin (Px)`** *(Int | Default: 0)*  
  Spacing in pixels between the DOM panel and the right chart border.
* **`Bar Spacing (Px)`** *(Int | Default: 1)*  
  Vertical pixel gap between adjacent price tick bars.
* **`Text Size`** *(Int | Default: 11)*  
  Font size for resting contract numbers at each tick.
* **`Ask Color`** *(Brush | Default: Crimson)*  
  Bar color for resting sell limit orders (Asks).
* **`Bid Color`** *(Brush | Default: DodgerBlue)*  
  Bar color for resting buy limit orders (Bids).
* **`Text Color`** *(Brush | Default: White)*  
  Font color for resting order contract counts.

---

### 4. Control HUD

* **`HUD Position`** *(Enum: BottomLeft, BottomRight | Default: BottomRight)*  
  Screen placement of the on-chart calibration HUD.
* **`HUD Margin (Px)`** *(Int | Default: 10)*  
  Offset in pixels from screen boundaries.
* **`Volume Step Size`** *(Double | Default: 10)*  
  Contract size added or subtracted with each click of the `[+]` and `[-]` buttons on the HUD.

---

### 5. Color Palettes: Colors Heatmap

* **`Colors: Heatmap Global`:** Levels 1 to 5 (Indigo $\rightarrow$ Purple $\rightarrow$ DarkOrange $\rightarrow$ Orange $\rightarrow$ Gold) for universal heat gradient.
* **`Colors: Heatmap Resistance`:** Levels 1 to 5 (DarkRed $\rightarrow$ Firebrick $\rightarrow$ Crimson $\rightarrow$ Red $\rightarrow$ OrangeRed) for passive sell orders (Asks).
* **`Colors: Heatmap Support`:** Levels 1 to 5 (MidnightBlue $\rightarrow$ MediumBlue $\rightarrow$ RoyalBlue $\rightarrow$ DodgerBlue $\rightarrow$ DeepSkyBlue) for passive buy orders (Bids).
* **`Colors: Solid Mode`:** Neutral base color (Silver by default) with volume-scaled opacity for clean aesthetics.

---

## Best Practices and Operational Guidelines

### 1. Identifying Genuine Liquidity vs. Spoofing
* **Persistence Test:** Genuine institutional limit orders remain resting at the same level for several minutes, even as price inches closer.
* **Spoofing Alert:** If a dense limit wall disappears 1 or 2 ticks before price touches it, you are witnessing an order book pull designed to simulate fake buying or selling pressure. **Never enter a trade expecting support/resistance from a wall that continuously retreats as price approaches.**
* **Magnet Effect:** Heavy concentrations of authentic resting liquidity often act as price targets, attracting price to fill orders before a sustained directional push occurs.

### 2. Spotting Institutional Absorption
* Absorption happens when price attacks a dense heatmap band and, despite high aggressive volume printed on the Footprint at the Bid/Ask, the Depth Chart band holds firm and price is rejected. This confluence provides one of the highest-probability counter-trend setups in Order Flow.

### 3. NinjaTrader 8 Performance Optimization
* **Do not inflate `Max Depth Levels`:** Keep this setting at `100` or lower on fast markets like NQ. Tracking depth hundreds of ticks away wastes RAM with zero trading value.
* **Use `Min Volume Filter`:** Setting an appropriate minimum filter (e.g., 30 in NQ, 100 in ES) avoids drawing thousands of 1-contract micro-rectangles, preserving smooth 60 FPS performance.
