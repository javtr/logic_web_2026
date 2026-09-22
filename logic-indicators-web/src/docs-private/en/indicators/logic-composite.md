---
title: Logic Composite
description: Technical manual and complete reference for macro Volume Profile, Delta, and screen-docked TPO on NinjaTrader 8.
order: 4
category: indicators
---

# Logic Composite

> **Macrostructural and multi-session profiling station for NinjaTrader 8.**  
> Condenses weeks, months, or custom historical ranges into synchronized dual-column profiles docked to your screen, projecting institutional control prices and value areas across your entire intraday chart.

---

## 1. On-Chart Visual Components and Interpretation

The indicator renders an organized macro-reading framework comprising the following visual elements:

### 1. Synchronized Dual-Column Structure (Column 1 and Column 2)
* **Column 1 (Primary Structural):** Typically configured to display general *Volume Profile*. Plots the accumulated distribution of contracts traded at each price level.
* **Column 2 (Dynamic Complementary):** Can be set to display *Delta Profile* (net buyer/seller bias per tick) or *TPO Market Profile* (time distribution via letters or blocks).

### 2. High Volume Nodes (HVN)
* **What it plots:** Prominent widened horizontal zones of the volume histogram.
* **Interpretation:** Represents areas of consensus and institutional value acceptance. The market tends to rotate and consolidate within these nodes; breakout trades are discouraged inside a macro HVN.

### 3. Low Volume Nodes (LVN)
* **What it plots:** Narrow valleys or indentations in the profile.
* **Interpretation:** Represents institutional price rejection where price moved rapidly due to thin liquidity. Functions as firm support or resistance upon initial re-test. If price breaches an LVN, it typically rockets through it toward the next HVN.

### 4. Macro Point of Control (POC Line)
* **What it plots:** The exact price tick where the largest volume was traded over the entire consolidated period, highlighted with a solid line and distinctive bar color (default Orange or Red).
* **Interpretation:** The institutional center of gravity and fair balance price of the macro auction.

### 5. Value Area (VAH / VAL)
* **What it plots:** Shaded visual band enclosing the configured volume percentage (default 70% of total volume).
* **Boundaries:** Value Area High (VAH) and Value Area Low (VAL) mark the upper and lower borders of fair value for the macro auction.

### 6. Full-Screen Extension Lines (*ScreenLeft*)
* **What it plots:** When enabled on the POC, VAH, or VAL, the line does not terminate inside the profile frame; it projects horizontally across the entire chart window all the way to the left screen border.
* **Interpretation:** Allows surgical intraday observation on 1-minute or 5-minute candles of how price reacts to major levels established weeks earlier.

### 7. Macro Quantitative Metrics Box
* **What it displays:** A numerical summary docked at the top or bottom computing Total Traded Volume, Net Delta, Tick Range, and key POC/VAH/VAL price levels.

---

## 2. Interactive Tools and Toolbar Controls

* **`[Draw]` Button on the Master Toolbar (`_LOF Control Panel`):**
  * When clicked (or when Range Mode is set to `ManualDraw`), the cursor enters interactive range selection mode.
  * Click on your starting historical bar and click a second time on your ending bar: the Composite calculates immediately across that exact temporal window.
* **Fixed Viewport Docking:**
  * The profile maintains its dock to the screen edge according to `Total Width (Pixels)` and `Screen Margin (Pixels)`. You can scroll backward in time to inspect past market sessions while the composite remains fixed without obstructing candlestick action.

---

## 3. Configuration Settings (Parameter-by-Parameter Reference)

### Group: Composite Settings (Range and Screen Setup)
* **`Range Mode`** *(Enum: VisibleBars, AllLoadedBars, DaysBack, WeeksBack, MonthsBack, CustomDate, ManualDraw | Default: VisibleBars)*:  
  Defines the analytical time horizon:
  * `VisibleBars`: Computes dynamically using only the candles currently visible on screen.
  * `AllLoadedBars`: Consolidates all chart history loaded in NinjaTrader 8.
  * `DaysBack / WeeksBack / MonthsBack`: Automatically aggregates the last $N$ days, weeks, or months.
  * `CustomDate`: Anchors calculation to a specific historical date.
  * `ManualDraw`: Enables mouse-drawn custom ranges via the `[Draw]` tool.
* **`Periods Back (If applicable)`** *(Int | Default: 2)*: Number of retrospective periods to consolidate.
* **`Custom Date (If applicable)`** *(DateTime | Default: Current Date)*: Anchor date for `CustomDate` mode.
* **`TPO Bracket (Minutes)`** *(Int | Default: 30)*: Duration in minutes assigned to each time bracket for TPO columns (standard: 30 min).
* **`Total Width (Pixels)`** *(Int | Default: 300 | Range: 100 to 800)*: Total horizontal width allocated to the profile on screen.
* **`Screen Margin (Pixels)`** *(Int | Default: 10)*: Pixel padding between the profile and the NinjaTrader 8 window edge.
* **`Alignment`** *(Enum: Left, Right | Default: Right)*: Docks the profile to the right or left margin of the screen.

### Group: Profile Settings
* **`Session Mode`** *(Enum: Continuous, Custom | Default: Continuous)*:
  * `Continuous`: Processes all transactions without time restrictions (full 24h ETH session).
  * `Custom`: Restricts calculation to specified hours in `Start Time` and `End Time` (e.g., RTH 09:30 to 16:00).
* **`Value Area (%)`** *(Double | Default: 70.0 | Range: 50.0 to 95.0)*: Percentage of total volume used to calculate the Value Area (institutional standard: 70%).

### Group: Multipliers & Compression (Tick Compaction)
* **`Bar Spacing (px)`** *(Int | Default: 0)*: Vertical pixel spacing between price steps (0 = contiguous bars).
* **`VP: Tick Multiplier`** *(Int | Default: 2 | Range: 1 to 20)*: Tick aggregation for Volume Profile. In NQ or volatile assets, grouping 2 to 4 ticks compacts the histogram for enhanced clarity.
* **`VP: Box Visual Mode`** *(Enum: Summation, MaximumPeak | Default: Summation)*:
  * `Summation`: Sums volume of grouped ticks.
  * `MaximumPeak`: Displays peak volume of the dominant tick in the group.
* **`VP: POC Calculation`** *(Enum: OriginalMaximumPeak, AdjustedSummation | Default: OriginalMaximumPeak)*: Point of Control calculation method.
* **`D: Tick Multiplier`** *(Int | Default: 2)*: Tick grouping for Delta column.
* **`TPO: Tick Multiplier`** *(Int | Default: 2)*: Tick grouping for TPO column.

### Groups: Col. 1 General & Col. 2 General
* **`Enable Column`** *(Bool | Default: True on C1 / True on C2)*: Enables or disables the respective column.
* **`Column Width (%)`** *(Int | Default: 50)*: Screen width distribution between columns (e.g., 50% for C1 and 50% for C2).
* **`Used Width (%)`** *(Int | Default: 80)*: Horizontal span utilized by bars before reaching maximum column width.
* **`Profile Type`** *(Enum: Volume, Delta, DeltaOverVolume, VolumeAndDelta, DeltaAndVolume, TPO | Default: Volume on C1 / Delta on C2)*: Selects the data type calculated and rendered in the column (Volume, Delta, or TPO).
* **`Highlight Open/Close`** *(Bool | Default: False)*: Visual markers at opening and closing prices of the consolidated macro span.

### Groups: C1 / C2 Volume Profile
* **`Draw Style`** *(Enum: Bars, Geometry | Default: Bars)*:
  * `Bars`: Traditional discrete horizontal bar histogram.
  * `Geometry`: Smooth high-definition continuous polygon contour.
* **`Alignment`** *(Enum: Left, Right | Default: Right on C1 / Left on C2)*: Growth direction of bars (enables mirror-style opposing profiles).
* **`Fill Color / Fill Opacity`** *(Default: Silver, 80%)*: Profile body color and opacity.
* **`Enable Stacked Bid/Ask`** *(Bool | Default: False)*: Splits each volume bar internally to show exact proportions of Ask buys and Bid sells.

### Groups: C1 / C2 Delta Profile
* **`Bid Color / Ask Color`** *(Default: Red / SpringGreen)*: Colors for negative and positive net delta levels.
* **`Fill Opacity / Border Opacity`** *(Default: 20% / 100%)*: Delta histogram transparency.
* **`Custom Width (%)`** *(Int | Default: 50)*: Width percentage assigned to delta histogram inside its column.

### Groups: C1 / C2 TPO (Market Profile)
* **`Visualization`** *(Enum: Blocks, Letters, BlocksAndLetters, Geometry | Default: Blocks)*: Visual rendering via monochromatic blocks, classic letters (A, B, C...), or geometry.
* **`Color Mode`** *(Enum: Solid, Heatmap | Default: Solid)*: Enables 5-tier chronological thermal heatmap from open (blue) to close (red).
* **`Font Size / Letter Color`** *(Default: 10 / White)*: Typography settings for TPO letters.

### Groups: C1 / C2 POC (Point of Control)
* **`Highlight in VP / Delta / TPO`** *(Bool | Default: True)*: Accents the highest volume price tick with distinctive color.
* **`Color / Fill Opacity`** *(Default: Orange / 100%)*: POC block color and fill.
* **`Enable POC Line`** *(Bool | Default: True)*: Plots horizontal reference line at the POC tick.
* **`Line Style / Thickness`** *(Default: Solid / 2)*: Line stroke styling.
* **`Line Extension`** *(Enum: Column, CompositeBox, ScreenLeft | Default: ScreenLeft)*:  
  **Crucial setting:**
  * `Column`: Confined inside the column.
  * `CompositeBox`: Extends across both columns (C1 + C2).
  * `ScreenLeft`: **Extends line horizontally across the entire screen to the left edge**, projecting the macro POC directly under live execution candles.
* **`Show Label / Show Price`** *(Default: True)*: Displays "POC" label and exact numeric price.

### Groups: C1 / C2 Value Area
* **`Enable VA`** *(Bool | Default: True)*: Toggles 70% volume area background shading.
* **`Color / Fill Opacity`** *(Default: CornflowerBlue / 80%)*: Value Area color and opacity.
* **`Enable VA Line`** *(Bool | Default: True)*: Plots upper (VAH) and lower (VAL) boundary lines.
* **`Line Extension`** *(Enum: Column, CompositeBox, ScreenLeft | Default: ScreenLeft)*: Projects macro VAH and VAL lines across the entire chart to the left edge.

### Group: Metrics (Quantitative Summary)
* **`Enable Metrics`** *(Bool | Default: False)*: Enables floating statistics box.
* **`Block Position`** *(Enum: Top, Bottom | Default: Bottom)*: Docking position inside the composite frame.
* **`Show Volume / Show Delta / Show Range / Show POC`**: Boolean toggles for metric displays.

### Group: General Settings
* **`Historical Load Speed`** *(Enum: Standard_DeltaEnabled, Medium_NoDelta, Fast_NoDelta, Ultra_NoDelta | Default: Fast_NoDelta)*:  
  **Historical loading speed optimizer:**
  * `Fast_NoDelta` / `Ultra_NoDelta`: Aggregates historical data to load weeks or months of volume in seconds (recommended when using Volume Profile).
  * `Standard_DeltaEnabled`: Processes tick-by-tick order flow with exact Delta calculations.
* **`Instance Name`** *(String | Default: "LOF_Composite")*: Suite identifier.
* **`Layer Mode`** *(Enum: BehindPrice, Normal, TopMost | Default: Normal)*: Z-order rendering mode.

---

## 4. Best Practices and Pro Trading Strategies

### A. Identifying Structural Support and Resistance (HVN vs. LVN)
The structural roadmap provided by **Logic Composite** prevents trading against institutional flow:

1. **High Volume Node (HVN) Rules:**
   * An HVN marks a price zone where institutional buyers and sellers agreed that price represented fair value.
   * When price revisits a macro HVN, momentum typically stalls into a rotational or consolidation phase. **Avoid trading breakouts within a macro HVN; seek mean reversions toward the POC or take profits on trend positions**.
2. **Low Volume Node (LVN) Rules:**
   * An LVN marks institutional price rejection. Price traversed this zone rapidly due to liquidity voids.
   * **Trading Trigger:** LVN boundaries function as **uncompromising support and resistance**. If price pulls back into a 2-week macro LVN and prints an absorption on the intraday chart, enter with a tight stop beyond the LVN edge. If price penetrates the LVN, it will traverse it rapidly toward the adjacent HVN.

### B. The Advantage of `ScreenLeft` Extension Lines
* Set `Line Extension` to **`ScreenLeft`** on the **POC**, **VAH**, and **VAL**.
* By projecting to the left screen boundary, these lines cross underneath your 1-minute, 5-minute, or range bars.
* This allows you to execute intraday scalps with multi-week institutional context constantly visible on your primary execution screen.

### C. Recommended Configurations by Trading Style
* **For Futures Day Traders (ES / NQ):**
  * `Range Mode`: `DaysBack` with `Periods Back = 5` (displays the rolling 1-week composite).
  * Column 1: `Volume Profile` right-aligned.
  * Column 2: `Delta Profile` left-aligned.
  * `Historical Load Speed`: `Fast_NoDelta` for immediate chart initialization.
* **For Swing Traders & Weekend Preparation:**
  * `Range Mode`: `WeeksBack` with `Periods Back = 4` or `MonthsBack = 1` to `3`.
  * Column 1: `Volume Profile` in `Geometry` mode.
  * Column 2: `TPO` in `Blocks` mode with chronological thermal heatmap enabled.

---

## Next Steps and Related Tools

* **[Logic Profile](/dashboard/docs/indicators/logic-profile):** Standard session-by-session profiles (RTH, ETH, intraday splits).
* **[Logic Footprint](/dashboard/docs/indicators/logic-footprint):** Examine tick-by-tick order flow inside candles testing macro HVN and LVN levels.
* **[General Settings](/dashboard/docs/configuration):** Learn how to save your composite templates and optimize workspace load performance.
