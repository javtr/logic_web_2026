---
title: Logic Footprint
description: Technical manual and complete reference for bar-by-bar multi-column Order Flow charts on NinjaTrader 8.
order: 1
category: indicators
---

# Logic Footprint

> **The flagship microstructural Order Flow chart for NinjaTrader 8.**  
> Reveals the exact mathematical distribution of aggressive buying (Ask) and selling (Bid) orders executed at every price level, stacked diagonal imbalances, and intra-bar profiles with a modular up-to-3-column architecture per candle.

---

## 1. On-Chart Visual Components and Interpretation

The indicator breaks down internal candle anatomy through the following high-precision visual elements:

### 1. Bid x Ask Numerical Cells (Diagonal Auction Match)
* **What it plots:** Two numerical figures separated by a cross or space at every price tick of the candle.
  * The number on the left represents contracts executed at the Bid (aggressive market sellers hitting passive liquidity).
  * The number on the right represents contracts executed at the Ask (aggressive market buyers lifting passive liquidity).
* **Interpretation:** The auction is evaluated diagonally: comparing the Ask at a given price against the Bid of the price tick directly below.

### 2. Diagonal Imbalances
* **What it plots:** When Ask volume exceeds the opposite diagonal Bid by the configured multiplier (e.g., 3.1:1 or 310%), the number glows **Bright Green** (buying imbalance). When Bid volume exceeds the upper diagonal Ask, it glows **Bright Red** (selling imbalance).
* **Stacked Imbalances:** The occurrence of 3 or more consecutive imbalances in the same direction marks an institutional aggressive thrust that functions as support or resistance upon future re-tests.

### 3. Intra-Candle Point of Control (POC)
* **What it plots:** A solid bounding box (default Yellow or Gold) enclosing the exact price tick where the highest volume or delta was transacted within that candle.
* **Interpretation:**
  * *POC at the base of a green candle:* Confirms institutional support driving the move.
  * *POC at the top wick of a green candle:* Warns of passive limit absorption; aggressive buyers were stopped by institutional limit sell orders (potential bull trap).

### 4. Embedded Profile Mode (`ProfileLeft` / `ProfileRight`)
* **What it plots:** Replaces rectangular numerical boxes with horizontal histogram bars proportional to volume or delta at that tick.
* **Interpretation:** Transforms the candle into an intra-bar micro-profile to evaluate candle shape at a glance: "D" shape (balance), "P" shape (short covering/trend high), or "b" shape (long liquidation/trend low).

### 5. Thermal Heatmaps
* **What it plots:** 5-tier color gradients applied to cell backgrounds based on volume concentration or delta intensity.
* **Interpretation:** Instantly highlights where primary liquidity clustered without needing to read every individual digit.

### 6. Dynamic Level of Detail (LOD Zoom Out)
* **What it plots:** When zooming out, numbers are smoothly removed to prevent visual clutter, displaying clean mini-profiles. Zooming out further smoothly renders crisp, solid candlesticks.

---

## 2. Interactive Tools and Toolbar Controls

* **`[VP]` Button on the Master Toolbar (`_LOF Control Panel`):**
  * Clicking `[VP]` instantly toggles between full numerical footprint (*Bid x Ask*) and *Intra-Bar Volume Profile* mode.
  * Enables seamless transitions from micro-numerical analysis to rapid structural shape reading with a single touch.
* **Dynamic Intelligent Zoom:**
  * Utilizing mouse wheel or time-scale adjustments automatically prompts the LOD engine to adapt visual density, ensuring 60 FPS responsiveness at all times.

---

## 3. Configuration Settings (Parameter-by-Parameter Reference)

### Group: General Settings
* **`Instance Name`** *(String | Default: "LOF_FootPrint")*: Unique identifier in the suite.
* **`Instance Color`** *(Brush | Default: DodgerBlue)*: Color label in the master toolbar.
* **`Enable Indicator`** *(Bool | Default: True)*: Master toggle for visual rendering.
* **`Tick Data Mode`** *(Enum: BidAsk, UpDownTick | Default: BidAsk)*: Always maintain on `BidAsk` for genuine tick-by-tick order flow processing.
* **`Tick Multiplier`** *(Int | Default: 1 | Range: 1 to 20)*: Aggregates contiguous ticks into a single price row.  
  * *Recommendations:* `1` for ES, Crude Oil, or Treasuries; `2` to `4` for NQ to compact vertical scaling and enhance readability.
* **`Zero-Lag Engine Mode`** *(Enum: Disabled, Smooth, Balanced, MaxPerformance | Default: Disabled)*: Frame rate optimization cadence.
* **`Layer Mode`** *(Enum: BehindPrice, Normal, TopMost | Default: Normal)*: Graphical z-order placement.

### Groups: Column 1, Column 2, and Column 3 (Modular Columns)
* **`Enable Column`** *(Bool | Default: True on Col 1 & 2 / False on Col 3)*: Enables or disables each of the 3 columns per candle.
* **`Column Width (%)`** *(Int | Default: 50 on Col 1 & 2)*: Candle width allocation among active columns.
* **`Column Separation Margin`** *(Int | Default: 2)*: Pixel spacing between adjacent columns.
* **`Text Value Type`** *(Enum: None, Volume, Trades, BidAsk, Delta, DeltaPct, Bid, Ask | Default: Delta on Col 1 / BidAsk on Col 2)*:  
  Defines which numerical metric prints in the cell.
* **`Text Alignment`** *(Enum: Left, Center, Right | Default: Right on Col 1 / Center on Col 2)*: Typography alignment within the cell.
* **`Cell Type`** *(Enum: Full, ProfileLeft, ProfileRight | Default: ProfileRight on Col 1 / Full on Col 2)*:
  * `Full`: Rectangular bounding box filling the tick slot.
  * `ProfileLeft / ProfileRight`: Horizontal histogram bar growing toward center.
* **`Cell Profile Metric`** *(Enum: Volume, Delta, DeltaPct, Trades, Bid, Ask)*: Data used to size profile bar width.
* **`Cell Color Type`** *(Enum: Delta, BidColor, AskColor, Custom, Heatmaps)*: Background coloring scheme.
* **`Cell Opacity`** *(Enum: Volume, Delta, DeltaPct, Trades, None)*: Regulates cell transparency based on metric density.
* **`Min / Max Opacity (%)`** *(Int | Default: 10% to 100%)*: Transparency limits.
* **`POC Type`** *(Enum: Volume, Metric, None | Default: Volume on Col 2)*: Selects Point of Control calculation metric.
* **`POC Color / Border Thickness`** *(Default: Yellow / 2f)*: Visual style of the POC boundary.
* **`Minimum Filter (Hide Below)`** *(Int | Default: 0)*: Conceals data in cells falling below this volume filter.

### Group: Imbalances (Diagonal Ratio & Net Difference)
* **`Enable Ratio Imbalances`** *(Bool | Default: True)*: Activates diagonal multiplication imbalance detection.
* **`Imbalance Ratio (x:1)`** *(Double | Default: 3.1 | Range: 2.5 to 4.0)*: Required multiplier (e.g., `3.1` requires buying volume to exceed diagonal selling by 310%).
* **`Min Volume (Ratio)`** *(Int | Default: 10)*: Minimum contracts required to qualify for imbalance evaluation.  
  * *Recommendations:* ES `80` to `150`; NQ `15` to `30`.
* **`Imbalance Color Buys (Ask) / Sells (Bid)`** *(Brush | Default: Lime / Red)*: Colors for imbalance numbers.
* **`Enable Difference Imbalances`** *(Bool | Default: True)*: Evaluates imbalances by absolute contract subtraction ($\text{Ask} - \text{Bid}_{\text{diagonal}}$).
* **`Net Difference (Subtraction)`** *(Double | Default: 100)*: Net contracts required.
* **`Difference Color Buys / Sells`** *(Default: Cyan / DarkOrange)*: Visual colors for difference imbalances.

### Group: Relative Maximum Value (Heatmap Normalization)
* **`Scale Mode (Relative)`** *(Enum: Bar, CustomSession, Visible, AllData, Manual | Default: Bar)*:
  * `Bar`: Normalizes color and profile bars against the peak volume of that specific candle.
  * `CustomSession`: Normalizes against the highest volume recorded during configured session hours.
  * `Visible`: Normalizes against candles currently visible on screen.
  * `Manual`: Normalizes against static user-defined limits.
* **`Scale Intensity (%)`** *(Int | Default: 100)*: Color gradient sensitivity.

### Heatmap Groups: (Volume, Delta, Ask, Bid)
* Each group includes **5 configurable thermal tiers** (Level 1 minimum to Level 5 maximum) to progressively shade cell backgrounds based on contract concentration.

### Group: Texts (Typography & Contrast)
* **`Base Text Size`** *(Int | Default: 13)*: Maximum font size.
* **`Auto-Contrast`** *(Bool | Default: True)*: Automatically flips number font between black and white based on cell background darkness.
* **`Abbreviate (k, M)`** *(Bool | Default: True)*: Abbreviates large figures (e.g., `1.5k` instead of `1500`).
* **`Text Internal Margin`** *(Int | Default: 2)*: Padding preventing text from touching cell edges.

### Group: Zoomed Out View (Adaptive LOD)
* **`Auto Candle Width`** *(Bool | Default: True)*: Smoothly adjusts candle slot width when zooming.
* **`Threshold to Hide Texts`** *(Int | Default: 60)*: Pixel distance between bars below which numbers are hidden.
* **`Footprint to Profile Threshold`** *(Int | Default: 40)*: Pixel width below which candles transition to mini volume profiles.
* **`Profile to Bars Threshold`** *(Int | Default: 20)*: Pixel width below which profiles collapse into standard candlesticks.
* **`Bullish / Bearish / Doji Candle Colors`** *(Default: Lime / Red / Gray at 70% opacity)*: Candlestick colors for wide zoom-out views.

---

## 4. Best Practices and Pro Trading Strategies

### A. Reading Stacked Imbalances
* When **3 or more consecutive buying imbalances (Green)** print during a breakout candle, that price block marks institutional aggression.
* **Execution Strategy:** Avoid chasing price at candle extremes. Await a technical pullback testing the stacked imbalance zone. If selling delta dries up upon re-test and price prints a rejection, enter long with a protective stop placed just below the lowest imbalance level.

### B. Absorption Setups at Candle Extremes
* **Ceiling Absorption Trap (Buying Absorption):**
  * Observe a bullish candle sporting an upper wick.
  * At the peak price tick, heavy buying volume appears (e.g., `500` on Ask), yet price fails to push higher and the lower tick closes with a selling imbalance.
  * The **candle POC is trapped at the extreme high**.
  * **Interpretation:** Breakout buyers lifted the offer aggressively but were completely absorbed by passive limit sell orders. High-probability short reversal trigger.
* **Finished vs. Unfinished Auctions:**
  * When a candle wick extreme prints a zero on the opposing side (e.g., `0 x 85`), the auction completed: no participant was willing to bid higher. This serves as an objective structural ceiling for Stop Loss placement.

### C. Recommended Footprint Settings by Instrument

| Parameter | E-mini S&P 500 (`ES`) | E-mini Nasdaq (`NQ`) | Crude Oil (`CL`) | Gold (`GC`) |
| :--- | :--- | :--- | :--- | :--- |
| **`Tick Multiplier`** | `1` tick (0.25 pt) | `2` to `4` ticks (0.50 - 1.0 pt) | `1` tick (0.01) | `1` tick (0.10) |
| **`Imbalance Ratio`** | `3.1` (or 300%) | `3.5` to `4.0` | `3.0` | `3.0` |
| **`Min Volume (Ratio)`** | `80` to `150` contracts | `15` to `30` contracts | `25` to `50` contracts | `20` to `40` contracts |
| **`Col 1 Setup`** | Delta Profile | Delta Profile | Delta Profile | Volume Profile |
| **`Col 2 Setup`** | Bid x Ask with Volume POC | Bid x Ask with Volume POC | Bid x Ask with Volume POC | Bid x Ask with Volume POC |

---

## Next Steps and Related Tools

* **[Logic Footer](/dashboard/docs/indicators/logic-footer):** Pair your footprint with bar-by-bar delta and 27-metric telemetry.
* **[Logic Algorithms](/dashboard/docs/indicators/logic-algorithms):** Automate the detection of trapped traders, exhaustion, and absorption signals without manual calculations.
* **[General Settings](/dashboard/docs/configuration):** Learn how to save your footprint templates for ES and NQ in NinjaTrader 8.
