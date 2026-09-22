---
title: Logic Analytics
description: Technical manual and complete reference for the Effort vs. Result quantitative laboratory and analytical boxes on NinjaTrader 8.
order: 6
category: indicators
---

# Logic Analytics

> **Quantitative microstructural and statistical diagnostic laboratory for NinjaTrader 8.**  
> Isolates any price action segment within interactive boxes to audit volume, continuous cumulative delta curves, and effort vs. result anomalies using standard deviation.

---

## 1. On-Chart Visual Components and Interpretation

Each analytical box plotted on the chart is structured into three complementary analytical layers:

### 1. Main Boundary and Interactive Touch Control Nodes
* **Box Body & Shading:** Visually bounds the selected time span (X-axis) and price range (Y-axis) under study.
* **Left Node (`HitBoxLeft`):** Click and drag with the mouse to shift the box starting point forward or backward across candles.
* **Right Node (`HitBoxRight`):** Click and drag to extend or truncate the rightmost boundary into present or future price action with instant recalculation.
* **Delete Button `[X]`:** Located at the top corner to remove the box from both the chart and local disk storage with a single click.
* **Highlight Selector `[Highlight]`:** Cycles through local color highlighting modes (`Global`, `Off`, `Long`, `Short`, `Both`) to tint specific candles inside the box that exhibit anomalous Order Flow events.

### 2. Sub-Panel 1: Intra-Box Volume Histogram (`ShowVolumePanel`)
* **What it plots:** A dedicated histogram showing the traded volume bars for each candle enclosed inside the box.
* **Interpretation:** Allows you to quickly evaluate whether volume diminishes as a range consolidates (typical of healthy accumulation/consolidation) or if sudden institutional absorption spikes occur.

### 3. Sub-Panel 2: Cumulative Delta Curve (`ShowDeltaPanel`)
* **What it plots:** A continuous curve calculating the cumulative algebraic sum of delta bar by bar starting from the first candle of the box. The area beneath the curve is tinted **green** when net cumulative delta is positive (buyer dominance) and **red** when negative (seller dominance).
* **Interpretation:** Essential tool for diagnosing absorption. If price remains flat within the box while the cumulative delta curve plunges heavily into the negative, passive limit buyers are absorbing all market selling pressure (hidden institutional accumulation before a rally).

### 4. Sub-Panel 3: Quantitative Statistical Panel (`ShowStatsPanel`)
* **What it displays:** Four mathematical columns calculating average values and statistical dispersion within the range:
  * **Volume:** Average volume per candle ($\text{VolAvg}$) and Alert Threshold ($\text{VolAvg} + 1\text{ Standard Deviation}$).
  * **Delta+:** Average for candles with buying delta and their upper threshold.
  * **Delta-:** Average for candles with selling delta and their lower threshold.
  * **Range:** Average candle range in ticks and volatility expansion threshold.
* **Interpretation:** Any candle exceeding the threshold line ($\mu + 1\sigma$) represents an **objective statistical anomaly**: an extraordinary institutional effort took place on that bar.

---

## 2. Interactive Tools and Toolbar Controls

* **`[Draw]` Button on the Master Toolbar (`LOF_Configuration`):**
  * Clicking `[Draw]` enters analytical drawing mode.
  * Click on your starting candle and click a second time on your ending candle to instantiate the box immediately.
* **Real-Time Touch Resizing:**
  * Click on either lateral edge of the box to drag and adjust the range with the mouse. All statistical panels, histogram bars, and delta curves update immediately upon release.
* **One-Click Deletion:**
  * Click the `[X]` icon in the corner of any box to remove it permanently.
* **Persistent Disk Storage:**
  * All custom-drawn boxes are automatically saved into a local configuration file. You can switch chart timeframes, close NinjaTrader 8, or reboot your PC without losing your analytical areas.

---

## 3. Configuration Settings (Parameter-by-Parameter Reference)

### Group: Auto Box Settings (Scheduled Automatic Boxes)
* **`1. Enable Auto Box`** *(Bool | Default: False)*:  
  Automatically generates an analytical box every day during the scheduled market window without manual drawing.  
  * *Recommendation:* Set to `True` if you systematically trade the Opening Range or the first 60 minutes of the session.
* **`2. Start Time (HH:mm)`** *(String | Default: "09:30")*:  
  Exact start time in 24-hour military format (e.g., `09:30` for New York open, or `08:00` for London open).
* **`3. End Time (HH:mm)`** *(String | Default: "10:30")*:  
  Closing time for the automatic box (e.g., `10:30` to capture the first 60 minutes of Initial Balance).

### Group: Graphic Settings (Visual Styling and Panels)
* **`Box Background`** *(Brush | Default: Silver)*: Background tint color of the analytical box.
* **`Background Opacity`** *(Int | Default: 15 | Range: 5 to 100)*: Box background opacity (15% keeps the chart clean without obscuring candlestick price action).
* **`Box Border`** *(Brush | Default: DodgerBlue)*: Outer boundary frame color.
* **`Volume Color`** *(Brush | Default: Goldenrod)*: Histogram bar color for intra-box volume.
* **`Positive Delta Color`** *(Brush | Default: MediumSeaGreen)*: Color for positive buying delta curves and stats.
* **`Negative Delta Color`** *(Brush | Default: Red)*: Color for negative selling delta curves and stats.
* **`Text Color`** *(Brush | Default: Silver)*: Typography color for labels and numbers.
* **`Font Size`** *(Int | Default: 12)*: Font size for statistical metrics.
* **`Abbreviate Values (K, M)`** *(Bool | Default: False)*: When `True`, abbreviates large numbers for readability (e.g., `1.5K` instead of `1500`, or `2.3M` instead of `2300000`).
* **`Show Volume Panel`** *(Bool | Default: True)*: Toggles the volume histogram sub-panel.
* **`Show Delta Panel`** *(Bool | Default: True)*: Toggles the Cumulative Delta curve sub-panel.
* **`Show Statistics Panel`** *(Bool | Default: True)*: Toggles the 4 standard deviation statistical columns at the bottom.
* **`Volume Box Height (px)`** *(Int | Default: 0)*: Pixel height for volume panel (if 0, sizes proportionally).
* **`Delta Box Height (px)`** *(Int | Default: 80)*: Pixel height for the Cumulative Delta curve.
* **`Stats Box Height (px)`** *(Int | Default: 80)*: Pixel height for the quantitative statistics table.
* **`Histogram Internal Margin (%)`** *(Int | Default: 10)*: Vertical internal padding so histogram bars do not touch panel borders.
* **`Width: Match Candle`** *(Bool | Default: False)*: When `True`, histogram bar widths dynamically synchronize with chart candlestick widths.
* **`Width: Percentage (%)`** *(Int | Default: 80)*: If not matching candle widths, width percentage allocated to each histogram bar.

### Group: General Settings
* **`Instance Name`** *(String | Default: "Logic Analytics")*: Unique identifier for this instance in the master toolbar.
* **`Instance Color`** *(Brush | Default: Cyan)*: Identification color in the toolbar indicator list.
* **`Visuals Enabled`** *(Bool | Default: True)*: Master toggle to pause all box rendering without clearing saved data.
* **`Tick Data Mode`** *(Enum: BidAsk, UpDownTick | Default: BidAsk)*: Tick calculation mode. Always maintain on `BidAsk` for true Order Flow delta calculations.
* **`Zero-Lag Engine Mode`** *(Enum: Disabled, Smooth, Balanced, MaxPerformance | Default: Disabled)*: Graphic refresh cadence control. Under standard workloads, `Disabled` or `Balanced` provides maximum responsiveness.
* **`Layer Mode`** *(Enum: BehindPrice, Normal, TopMost | Default: Normal)*: Visual z-ordering relative to price bars. `Normal` allows effortless mouse interaction with edge control nodes.
* **`Priority (Offset)`** *(Int | Default: 0)*: Rendering priority relative to other suite indicators.

---

## 4. Best Practices and Pro Trading Strategies

### A. Diagnosing Effort vs. Result (Wyckoff Logic with Delta)
One of the most powerful applications of **Logic Analytics** is verifying whether participant effort produces the expected directional result:
* **Absorption / Accumulation Scenario:** If you enclose a lateral consolidation where price does not move and you observe the **Cumulative Delta Curve plunging deeply negative (aggressive market sellers attacking)**, but price refuses to break down below the box floor, you are witnessing **passive institutional absorption**. Smart money is filling all sell orders with limit bids. A bullish breakout from the box holds an extraordinarily high win rate.
* **Breakout Exhaustion Scenario:** If price attempts to break through the box ceiling but the delta curve flattens or turns down, the breakout lacks institutional commitment and is likely a bull trap.

### B. The Quantitative Standard Deviation Filter ($\mu + 1\sigma$)
* Not all volume bars warrant trading decisions. Monitor the **Volume** and **Delta+ / Delta-** columns in the box stats panel.
* When an individual candle surpasses the **Threshold** line ($\text{Average} + 1\text{ Standard Deviation}$), that bar is a certified **statistical anomaly**. When this occurs while testing an outer boundary of the box (ceiling or floor), you have mathematical confirmation of institutional presence.

### C. Auto Box Strategy: The Initial Balance (09:30 to 10:30)
1. Enable `Enable Auto Box` with start time `09:30` and end time `10:30`.
2. Every day at 10:30, you will have an automated range covering the first 60 minutes of the New York session.
3. Observe the final Cumulative Delta value in the box header:
   * If delta finished heavily positive and price trades above the box ceiling, daily bias is predominantly bullish (*Trend Day*). Look for long entries on pullbacks to the box high.
   * If delta finished heavily negative and price trades below the box floor, look for continuation shorts.
   * If delta is near zero and price oscillates inside the box, the session is balanced (*Rotational Day*); trade mean-reversions between the box extremes.

### D. Chart Organization Tips
* To prevent screen clutter when maintaining multiple manual boxes, selectively disable secondary panels (e.g., turn off `Show Volume Panel` and keep only `Cumulative Delta` and `Statistics`).
* Use the `[X]` button on completed boxes once the market has broken away and moved on, preserving an uncluttered chart focused on current auction dynamics.

---

## Next Steps and Related Tools

* **[Logic Footprint](/dashboard/docs/indicators/logic-footprint):** Inspect internal candle order flow to see bid/ask aggression within your analytics box.
* **[Logic BigTrades](/dashboard/docs/indicators/logic-bigtrades):** Track individual high-volume institutional market orders inside your analytical ranges.
* **[General Settings](/dashboard/docs/configuration):** Learn how to use the master `LOF_Configuration` toolbar and manage templates in NinjaTrader 8.
