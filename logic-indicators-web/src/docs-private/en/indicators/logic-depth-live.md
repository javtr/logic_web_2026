---
title: Logic Depth Live
description: Complete technical manual and parameter reference for Logic Depth Live in NinjaTrader 8.
order: 9
category: indicators
---

# Logic Depth Live

> If you haven't installed the Logic Indicators suite yet, please refer to the [Installation Guide](/docs/installation) first.

The **Logic Depth Live** indicator delivers an ultra-high-speed continuous order book environment (Bookmap style) directly inside NinjaTrader 8. It merges sub-millisecond passive order book tracking with aggressive trade volume bubbles, live Best Bid/Ask spread lines, and right-hand Smart Columns (resting DOM, executed volume, and accumulated net delta per tick).

---

## Visual Components on the Chart

1. **Depth Heatmap Canvas:** Continuously visualizes resting passive liquidity across time (Bids below market, Asks above). Shading density represents contract volume waiting for execution.
2. **Best Bid and Best Ask Spread Lines:** Stepped, microsecond-accurate lines tracing the exact trajectory of the live spread.
3. **Trade Aggression Bubbles:** Circles plotted at the precise time and price an aggressive market order fills, scaled by volume, with intelligent magnetic clustering of contiguous trades.
4. **Smart Columns (Right DOM Margin):** Three integrated analytical columns:
   * **Passive DOM:** Contracts currently resting in the live book.
   * **Executed Volume:** Histogram of total executed volume at each price level during the visible time window.
   * **Net Delta:** Net aggressive buying or selling absorbed at that level.

---

## Interactive Tools and Controls

* **`[Reset]` button on the LOF master toolbar (`LOF_Configuration`):** Clears live memory cache and resets the canvas immediately in case of broker disconnects.
* **On-Chart Navigation HUD:**
  * **Row 1 (`Min Filter` with `[-]` and `[+]`):** Filters small resting orders up/down in volume steps.
  * **Row 2 (`Max Vol` with `[-]` and `[+]`):** Calibrates heatmap color saturation.
  * **Row 3 (Visual Toggles):**
    * `[HM]`: Toggles background depth heatmap on/off.
    * `[TRD]`: Toggles trade bubbles on/off.
    * `[DOM]`: Toggles right-side depth and Smart Columns on/off.
  * **Row 4 (Time Machine Controls):**
    * `[ < ]`: Pans chart backward in time by `Pan Step (Ms)`.
    * `[ + ]`: Zooms in (reduces visible millisecond window for higher micro-detail).
    * `[ R ]`: **Reset / Live:** Snaps the canvas back to the live market edge.
    * `[ - ]`: Zooms out (expands visible millisecond window for wider macro context).
    * `[ > ]`: Pans chart forward in time.
  * **Auto-Center Button:** Vertically locks and centers market price to prevent momentum runs from moving price off-screen.

---

## Configuration Options (Parameter by Parameter)

The following reference breaks down every parameter found in the NinjaTrader 8 Properties window (**F6**), organized by category:

### 1. General

* **`Instance Name`** *(String | Default: "Logic Depth Live")*  
  Identifier name within the LOF suite orchestrator.
* **`Instance Color`** *(Brush | Default: Orange)*  
  Badge color used to identify this instance in the `LOF_Configuration` master toolbar.
* **`Ticks per Level`** *(Int | Default: 1)*  
  Consolidates multiple ticks into a single price row (e.g., 4 ticks = 1 point on NQ). Keep at `1` for ES.
* **`Max Visible Levels`** *(Int | Range: 20 to 500 | Default: 200)*  
  Maximum number of price levels rendered around current market price.  
  * *Recommendation:* Set between `100` and `150` for optimal GPU performance while maintaining full context.
* **`Z-Order Mode`** *(Enum: BehindPrice, Normal, TopMost | Default: Normal)*  
  Controls visual layer stacking order on the chart.
* **`Zero-Lag Engine Mode`** *(Enum: Disabled, Smooth, Balanced, MaxPerformance | Default: Balanced)*  
  Regulates idle rendering cadence to conserve CPU cycles.  
  * *Recommendation:* `Balanced` for standard multi-chart setups; `Disabled` for uncapped 60 FPS on high-end dedicated GPUs.

---

### 2. Canvas Settings

* **`Time Flow Mode`** *(Enum: Constant, EventBased | Default: Constant)*  
  Time progression behavior along the horizontal X-axis:  
  * `Constant`: Time progresses continuously at fixed millisecond speed (Bookmap style).  
  * `EventBased`: The X-axis advances only when executions or book updates occur (ideal for low-volume overnight sessions).
* **`Panel Width (Px)`** *(Int | Default: 500)*  
  Total width in pixels allocated to the Depth Live canvas within the NinjaTrader chart window.
* **`Visible Window (Ms)`** *(Long | Range: 10000 to 300000 | Default: 60000)*  
  Visible duration in milliseconds.  
  * *Recommendation:* `60000` (1 minute) for scalping; `180000` (3 minutes) for broader view. Exceeding 300,000 ms increases graphics memory consumption.
* **`Grid Interval (Ms)`** *(Long | Default: 10000)*  
  Time spacing between vertical grid lines (10,000 ms = 10 seconds).
* **`Draw Grid in Foreground`** *(Bool | Default: False)*  
  Draws time grid lines above the heatmap for maximum timing precision.
* **`Auto-Adjust Chart Margin`** *(Bool | Default: False)*  
  Automatically sets native chart margins so the canvas fits seamlessly without overlapping other panels.
* **`Right / Left Margins (Px)`** *(Int | Default: 0 / 50)*  
  Pixel padding from screen edges.

---

### 3. Depth Heatmap

* **`Show Heatmap`** *(Bool | Default: True)*  
  Enables the resting order book heatmap on the canvas.
* **`Min Volume Filter`** *(Double | Default: 0)*  
  Hides resting orders below this contract count to eliminate background noise.
* **`Scaling Mode`** *(Enum: Manual, AutoVisible | Default: Manual)*  
  * `Manual`: Adheres strictly to the ceiling defined in `Volume Reference (Max)`.  
  * `AutoVisible`: Dynamically adjusts color intensity based on the highest resting limit order visible on screen.
* **`Volume Reference (Max)`** *(Double | Default: 100)*  
  Contract size required to achieve maximum color intensity.  
  * *Recommendation:* On NQ set between `50` and `120`; on ES set between `500` and `1,000`.
* **`Color Style`** *(Enum: Solid, HeatmapDual, HeatmapSingle | Default: Solid)*  
  Color palette applied to resting depth bands.
* **`Enable Background Color Interpolation`** *(Bool | Default: True)*  
  Smooths color transitions between adjacent price levels for HD visual fidelity.

---

### 4. Bubbles and Lines Settings

* **`Show Trades (Bubbles)`** *(Bool | Default: True)*  
  Enables rendering of aggressive market trade bubbles.
* **`Merge Nearby Bubbles`** *(Bool | Default: True)*  
  **Crucial performance and clarity parameter.** Clusters simultaneous or rapid contiguous trades at the same price into a single weighted bubble.  
  * *Recommendation:* Keep **always enabled (`True`)**. During high-volatility news events, this prevents rendering thousands of overlapping micro-bubbles, preserving zero CPU lag and emphasizing genuine institutional size.
* **`Min Volume Filter`** *(Double | Default: 5)*  
  Minimum executed contract size to plot a bubble.  
  * *Recommendation:* On ES set between `10` and `25`; on NQ set between `5` and `15` to filter retail 1-lot noise.
* **`Max Volume Reference`** *(Double | Default: 100)*  
  Contract volume at which a bubble reaches `Max Radius`.
* **`Min / Max Radius (Px)`** *(Float | Default: 2f to 25f)*  
  Minimum and maximum physical pixel diameter for bubbles.
* **`Min / Max Opacity (%)`** *(Int | Default: 15% to 70%)*  
  Alpha transparency range, keeping background heatmap details visible through bubbles.
* **`Show Volume Text`** *(Bool | Default: True)*  
  Prints contract size numerals inside each bubble.
* **`Text Size`** *(Int | Default: 10)*  
  Font size for trade volume numbers.
* **`Bid Color (TradeAskColor)`** *(Brush | Default: Fuchsia / Crimson)*  
  Color for aggressive sell orders executed at the Bid.
* **`Ask Color (TradeBidColor)`** *(Brush | Default: DeepSkyBlue / Green)*  
  Color for aggressive buy orders executed at the Ask.
* **`Best Ask Line Color`** *(Brush | Default: Green)*  
  Color for the stepped line tracking the best offer price.
* **`Best Bid Line Color`** *(Brush | Default: Red)*  
  Color for the stepped line tracking the best bid price.
* **`Best Lines Opacity (%)`** *(Int | Default: 80%)*  
  Opacity percentage for spread lines.

---

### 5. DOM Settings & Smart Columns

* **`Show Right Profile`** *(Bool | Default: True)*  
  Enables the right-hand analytical depth columns.
* **`Draw Over DOM`** *(Bool | Default: False)*  
  Allows overlaying statistical columns directly across the resting DOM area.
* **`DOM Width (Px)`** *(Int | Default: 30)*  
  Width in pixels for resting limit depth.
* **`Executed Vol Width (Px)`** *(Int | Default: 70)*  
  Width in pixels for the executed volume histogram over the visible window.
* **`Delta Width (Px)`** *(Int | Default: 40)*  
  Width in pixels for the net delta column.
* **`Positive / Negative Delta Colors`** *(Brush | Default: LimeGreen / Crimson)*  
  Colors indicating net aggressive buying or selling pressure per tick.
* **`LiveDOM Dynamic Text / Border Color`** *(Bool | Default: True)*  
  Dynamically matches borders and numbers to the underlying heat intensity of each level.

---

### 6. HUD Control

* **`HUD Position`** *(Enum: BottomLeft, BottomRight | Default: BottomLeft)*  
  Screen corner placement for the interactive controls.
* **`Pan Step (Ms)`** *(Long | Default: 5000)*  
  Milliseconds stepped backward or forward with the `[ < ]` and `[ > ]` buttons.
* **`Zoom Step (Ms)`** *(Long | Default: 10000)*  
  Milliseconds added or subtracted from the visible window with `[ + ]` and `[ - ]`.

---

## Best Practices and Operational Guidelines

### 1. Spotting Real-Time Absorption
* **High-Probability Reversal Setup:** Watch for price slamming directly into a dense, bright resting liquidity wall on the heatmap.
* If large **Ask trade bubbles (aggressive buys)** print rapidly on the level, but the **Best Ask line fails to advance a single tick higher** and price immediately turns back, institutional passive limit orders absorbed all aggressive demand.
* **Smart Column Confirmation:** Check the `Delta` column at that exact tick: if delta is strongly positive (e.g., `+600`) but price drops, buyers are trapped. This is an optimal confirmation to enter short.

### 2. Trading the "Liquidity Vacuum" Effect
* When an area shows complete absence of resting liquidity bands (dark background on the heatmap), price frequently accelerates through this zone with rapid spread widening. Scalpers should use these low-friction pockets as swift take-profit corridors and avoid entering counter-trend within them.

### 3. Latency and Hardware Optimization
* **Always enable `Merge Nearby Bubbles`:** During volatile economic releases, thousands of individual trades occur in seconds. Clustering groups trades instantly in real time, keeping chart motion completely smooth and preventing platform lag.
* **Keep `Visible Window (Ms)` calibrated:** Maintain window length between 60,000 ms and 120,000 ms. Attempting to display 15+ minutes of continuous sub-millisecond data places excessive demands on your graphics card and dilutes scalping focus.
