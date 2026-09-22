---
title: Logic Footer
description: Technical manual and complete reference for bar-by-bar Order Flow quantitative telemetry and 27 metrics on NinjaTrader 8.
order: 2
category: indicators
---

# Logic Footer

> **Bar-by-bar quantitative microstructural telemetry and diagnostic suite for NinjaTrader 8.**  
> Computes and dissects in real time up to 27 metrics covering volume, cumulative delta, aggression, absorption, and trade counts at the foot of each candle or via hovering DataBoxes.

---

## 1. On-Chart Visual Components and Interpretation

The indicator features two independent and complementary visual presentation modes:

### A. Mode 1: Fixed Footer (Bottom-Docked Grid)
* **Location:** Docked at the bottom of the chart price pane.
* **Vertical Alignment:** Each data column aligns vertically with the exact width and coordinate of its corresponding chart candle.
* **Labels Panel:** A configurable side panel on the left or right clearly identifying abbreviated names for each active metric.
* **5-Tier Heatmaps:** Cells apply automatic thermal gradients that intensify in color or opacity according to statistical significance relative to the session baseline.

### B. Mode 2: Floating DataBox (Candle-Attached Card)
* **Location:** A compact card anchored directly above or below each candle at a configurable tick distance (`DataBox Distance`).
* **Purpose:** Enables tracking critical immediate metrics (such as Delta and Volume) without averting your eyes from price action.

---

## 2. Comprehensive 27-Metric Quantitative Catalog

Logic Footer processes order flow tick by tick across six analytical families:

### Volume Metrics
1. **`Total Volume`:** Total contracts traded across the bar.
2. **`Buy Volume`:** Volume executed at the Ask (aggressive market buyers lifting the offer).
3. **`Sell Volume`:** Volume executed at the Bid (aggressive market sellers hitting the bid).
4. **`Cumulative Volume`:** Continuous volume sum since the start of the session.

### Delta and Aggression Metrics
5. **`Delta`:** Net difference between aggressive buying and selling ($\text{Ask Vol} - \text{Bid Vol}$).
6. **`Delta %`:** Percentage proportion of delta relative to total bar volume ($\text{Delta} / \text{Total Vol} \times 100$).
7. **`Ask %`:** Percentage of aggressive buying over total volume.
8. **`Bid %`:** Percentage of aggressive selling over total volume.
9. **`Cumulative Delta`:** Continuous running sum of delta since session open.
10. **`Max Delta`:** Highest delta value reached at any point during the life of the candle.
11. **`Min Delta`:** Lowest delta value reached at any point during the life of the candle.
12. **`Delta Change`:** Net delta change compared to the preceding candle.

### Microstructural and Extreme Metrics (COT)
13. **`COT High` *(Commitment of Traders Since High)*:** Net delta accumulated strictly since the candle formed its highest price. A strongly negative value indicates aggressive sellers entered immediately after the high was touched.
14. **`COT Low` *(Commitment of Traders Since Low)*:** Net delta accumulated strictly since the candle formed its lowest price. A strongly positive value indicates aggressive buyers stepped in immediately after the low was touched.
15. **`Top Delta`:** Delta traded exclusively on the topmost price tick of the candle.
16. **`Bottom Delta`:** Delta traded exclusively on the bottommost price tick of the candle.
17. **`Cumulative Delta %`:** Cumulative delta expressed as a percentage of total session volume.

### Transaction Metrics (Trades)
18. **`Total Trades`:** Total individual executions or transactions within the bar.
19. **`Buy Trades`:** Quantity of transactions executed at the Ask.
20. **`Sell Trades`:** Quantity of transactions executed at the Bid.
21. **`Cumulative Trades`:** Total transactions accumulated throughout the session.

### Imbalance Metrics
22. **`Imb (Ratio)`:** Count of diagonal buy/sell ratio imbalances detected in the bar.
23. **`Net Ratio`:** Buy ratio imbalances minus sell ratio imbalances.
24. **`Imb (Diff)`:** Count of net volume difference imbalances detected.
25. **`Net Diff`:** Net contract difference imbalance.

### Dimensional and Temporal Metrics
26. **`Range (Ticks)`:** Total candle amplitude in ticks from high to low.
27. **`Time (Duration)`:** Elapsed time in seconds to complete the candle (crucial on volume, tick, or range bars).

---

## 3. Interactive Tools and Toolbar Controls

* **`[FT]` Button on the Master Toolbar (`_LOF Control Panel`):**
  * Instantly toggles the Fixed Footer visibility (`Show / Hide Fixed Footer`) with a single click. Ideal for toggling tabular data on during entries and off for maximized candlestick area.
* **Dynamic Auto-Alignment:**
  * When zooming or panning, both the Fixed Footer and Floating DataBoxes automatically recalculate coordinates to maintain perfect alignment with each bar.

---

## 4. Configuration Settings (Parameter-by-Parameter Reference)

### Group: Footer Graphics (Fixed Footer Appearance)
* **`Enable Fixed Footer`** *(Bool | Default: True)*: Enables the bottom tabular footer.
* **`Auto-Fit Footer Scale`** *(Bool | Default: False)*: Compresses price scale upward so candles never overlap the footer.
* **`Base Color Vol / Trades`** *(Brush | Default: Goldenrod)*: Base color for volume and trade cells.
* **`Base Color Buy / Ask`** *(Brush | Default: Green)*: Base color for buyer aggression data.
* **`Base Color Sell / Bid`** *(Brush | Default: Crimson)*: Base color for seller aggression data.
* **`Footer Background Color`** *(Brush | Default: DimGray)*: Table background fill.
* **`Min / Max Opacity (%)`** *(Int | Default: 20% to 80%)*: Cell heatmap opacity range.
* **`Font Size`** *(Int | Default: 11)*: Numeric typography size.
* **`Row Padding`** *(Int | Default: 2)*: Vertical padding between table rows.
* **`Show Footer Labels`** *(Bool | Default: True)*: Toggles the descriptive metric title column.
* **`Footer Labels Position`** *(Enum: Left, Right, Hidden | Default: Left)*: Placement of label column.
* **`Footer Labels Width`** *(Float | Default: 90f)*: Pixel width for metric label column.
* **`Text Color Mode`** *(Enum: AutoContrast, CustomColor, SameAsCell | Default: AutoContrast)*:
  * `AutoContrast`: Text automatically shifts between black and white based on cell background luminance for optimal contrast.
* **`Enable Footer Heatmap`** *(Bool | Default: True)*: Enables background thermal gradients in cells.

### Group: Footer Metrics (Row Selection)
* Features **27 boolean checkboxes** (`FooterShowVolTotal`, `FooterShowDelta`, `FooterShowMaxDelta`, `FooterShowCotHigh`, etc.) to toggle each metric row individually.

### Groups: DataBox Graphics & DataBox Metrics (Floating Card)
* **`Enable Floating DataBox`** *(Bool | Default: False)*: Enables hovering cards above/below candles.
* **`DataBox Distance (Ticks)`** *(Int | Default: 4)*: Tick separation from candle extreme to card.
* **`Fixed DataBox Width (%)`** *(Int | Default: 80)*: Card width relative to candle horizontal slot.
* **`DataBox Metrics`**: Identical checkboxes to pick which metrics appear inside floating cards.

### Group: Max Value Scale Mode (Heatmap Scaling)
* **`Max Calculation Mode`** *(Enum: Off, CustomSession, VisibleBars, AllData, Manual | Default: CustomSession)*:  
  Defines the data pool for heatmap normalization:
  * `CustomSession`: Normalizes against highs recorded during custom session hours.
  * `VisibleBars`: Normalizes exclusively against bars visible on screen.
  * `AllData`: Evaluates entire loaded chart history.
  * `Manual`: Normalizes against static limits in `Manual Value`.
* **`Scale Intensity (%)`** *(Int | Default: 100)*: Heatmap color gradient sensitivity.
* **`Reset Delta per Session`** *(Bool | Default: True)*: Resets cumulative delta to zero at the start of each daily session.

### Heatmap Groups: (Vol & Trades, Ask, Bid, Range & Time)
* Each group includes **5 configurable color tiers** (Level 1 minimum to Level 5 maximum) to shade cells progressively based on volume and order aggression.

### Group: Zoomed Out View (Level of Detail - LOD)
* **`Hide Labels (Candle Width)`** *(Int | Default: 20)*: Candle pixel width below which text labels hide.
* **`Hide DataBox (Candle Width)`** *(Int | Default: 50)*: Candle width below which DataBoxes hide to prevent clutter.
* **`Hide Footer (Candle Width)`** *(Int | Default: 10)*: Candle width below which footer numbers hide on wide zoom-out.

### Group: General Settings
* **`Instance Name`** *(String | Default: "LOF_Footer")*: Suite identifier.
* **`Instance Color`** *(Brush | Default: Cyan)*: Master toolbar indicator color.
* **`Tick Data Mode`** *(Enum: BidAsk, UpDownTick | Default: BidAsk)*: Always maintain on `BidAsk` for real order flow.
* **`Zero-Lag Engine Mode`** *(Enum: Disabled, Smooth, Balanced, MaxPerformance | Default: Disabled)*: Refresh rate optimization.

---

## 5. Best Practices and Pro Trading Strategies

### A. The Classic Trend Confirmation Triad: Delta, Delta %, and Max/Min Delta
Physical candle size can be confirmed or invalidated using three key Footer metrics:

1. **Healthy Bullish Continuation:**
   * Candle closes green.
   * `Delta` is positive and `Delta %` exceeds `+20%`.
   * `Max Delta` is high while `Min Delta` remains near zero or negligible.
   * **Interpretation:** Buyers controlled the auction from start to finish without meaningful seller pushback. The trend holds strong continuation potential.
2. **Exhaustion / Passive Absorption Trap at Highs:**
   * Candle closes bullish with an upper rejection wick.
   * `Delta` is very low or negative (e.g., `-80`), despite the candle closing green.
   * `Max Delta` touched `+600`, but faded near zero by bar close.
   * **Interpretation:** Aggressive buying was completely absorbed by passive limit orders. Immediate warning of an impending bearish reversal or breakout trap.

### B. Reversal Triggers with COT High and COT Low
* **COT High (At Resistance):** When price tests a resistance level and `COT High` registers a heavy negative print (e.g., `-400` contracts in ES), institutional sellers hit the bid aggressively the moment the high was touched.
* **COT Low (At Support):** When price tests support and `COT Low` registers a heavy positive print (e.g., `+500`), institutional buyers stepped in aggressively, securing the candle low.

### C. The 6 Essential Daily Metrics
To prevent chart clutter from all 27 rows, the recommended standard setup enables these 6 rows in the **Fixed Footer**:
1. **`Total Volume`:** Total effort expended.
2. **`Delta`:** Net auction result.
3. **`Delta %`:** Relative strength of institutional bias.
4. **`Max Delta`:** Maximum bullish push achieved.
5. **`Min Delta`:** Maximum bearish push achieved.
6. **`Cumulative Delta`:** Macro directional flow of the session.

---

## Next Steps and Related Tools

* **[Logic Footprint](/dashboard/docs/indicators/logic-footprint):** Inspect exact price distributions for contracts summarized in the Footer.
* **[Logic Analytics](/dashboard/docs/indicators/logic-analytics):** Isolate consolidations inside quantitative effort vs. result boxes.
* **[General Settings](/dashboard/docs/configuration):** Learn how to utilize the `[FT]` toolbar button and manage templates in NinjaTrader 8.
