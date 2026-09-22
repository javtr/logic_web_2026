---
title: Logic BigTrades
description: Technical manual and complete reference for institutional block order tracking, naked lines, and magnetic clustering on NinjaTrader 8.
order: 5
category: indicators
---

# Logic BigTrades

> **Institutional Order Flow radar for NinjaTrader 8.**  
> Detects, filters, and projects extraordinary aggressive orders hitting the Bid and Ask, consolidating fragmented executions via magnetic clustering and projecting automatic support and resistance lines with real-time mitigation.

---

## 1. On-Chart Visual Components and Interpretation

The indicator renders four high-precision visual components directly onto the chart:

### 1. Market Execution Bubbles
* **Location:** Plotted at the exact price tick and candle where the aggressive market order occurred.
* **Default Color Palette:**
  * *Sky Blue / Green:* Aggressive market buying at the Ask (participants lifting the offer or short stop-loss orders triggered).
  * *Magenta / Red:* Aggressive market selling at the Bid (participants hitting the bid or long stop-loss orders triggered).
* **Proportional Scaling:** Diameter scales dynamically between `Min Radius` and `Max Radius` based on traded contract volume.
* **Numeric Value:** Displays the exact contract volume inside the bubble (e.g., `250`, `600`, `1.5k`).

### 2. Auto Naked Lines & Defense Areas
* **What it plots:** A horizontal line originating from the center of the institutional bubble projecting to the right.
* **Shaded Defense Area:** A translucent zone surrounding the line with a customizable thickness in ticks (default 4 ticks). Represents the institutional tolerance buffer around their average entry price.
* **Automatic Mitigation (*CutOnTouch*):** The line travels indefinitely until a future candle touches its exact price tick. At that precise microsecond, the line truncates, verifying the level has been mitigated and preventing chart clutter.

### 3. Bottom Big Trades Histogram
* **What it displays:** A sub-panel at the bottom of the chart showing accumulated institutional volume per candle.
* **Interpretation:** Allows you to identify whether institutional buying dominated a bullish candle or if contrary institutional selling pressure absorbed the move.

### 4. Live Institutional HUD Tape Scanner
* **What it displays:** A compact on-chart floating terminal reporting real-time whale transactions (exact timestamp, order direction, contract volume, and execution price).

---

## 2. Interactive Tools and Toolbar Controls

* **`[Line]` Button on the Floating Master Toolbar (`_LOF Control Panel`):**
  * Clicking `[Line]` activates interactive anchor mode.
  * Click on any historical institutional bubble on your chart.
  * A **Naked Line with Shaded Area** will immediately project forward based on your mitigation rule (`CutOnTouch` or `ExtendInfinite`). Ideal for anchoring levels that did not meet automatic thresholds but hold strategic importance.
* **HUD Scanner Interaction:**
  * The scanner window can be freely repositioned or resized on screen to suit your workspace layout.

---

## 3. Configuration Settings (Parameter-by-Parameter Reference)

### Group: Filter Settings (Volume and Scale)
* **`Scale Mode`** *(Enum: Fixed, VisibleWindow | Default: Fixed)*:
  * `Fixed`: Bubble radius is calculated against a static reference volume set in `Max Volume (Fixed Reference)`, maintaining consistent visual proportions regardless of bar zoom.
  * `VisibleWindow`: Normalizes bubble sizes relative to the largest order visible in the current chart window.
* **`Min Volume (Filter)`** *(Double | Default: 150)*:  
  Absolute minimum volume for an order to qualify and render as a bubble.  
  * *Recommended values:* E-mini S&P 500 (`ES`) `150` to `250`; Nasdaq (`NQ`) `40` to `80`; Crude Oil (`CL`) `50` to `100`; Gold (`GC`) `40` to `80`.
* **`Max Volume (Fixed Reference)`** *(Double | Default: 800)*:  
  Volume threshold at which the bubble reaches its configured maximum radius (`Max Radius`).  
  * *Recommended values:* ES `800` to `1,500`; NQ `150` to `300`.

### Group: Visual Settings (Bubble Styling)
* **`Ask Color (Buys)`** *(Brush | Default: DeepSkyBlue)*: Color assigned to aggressive buying at the Ask.
* **`Bid Color (Sells)`** *(Brush | Default: Magenta)*: Color assigned to aggressive selling at the Bid.
* **`Text Color`** *(Brush | Default: White)*: Color of the contract count inside bubbles.
* **`Min Radius / Max Radius`** *(Float | Default: 10f / 40f)*: Minimum and maximum radius in pixels for bubble circles.
* **`Bubble Opacity (%)`** *(Int | Default: 40 | Range: 10 to 100)*: Fill opacity of the bubble to avoid concealing price candlesticks.
* **`Bubble Border Thickness`** *(Float | Default: 2f)*: Border stroke thickness.
* **`Border Opacity (%)`** *(Int | Default: 100)*: Outer border opacity for crisp boundary definition.
* **`Show Volume Text`** *(Bool | Default: True)*: Shows or hides the contract number inside the bubble.
* **`Bubble Text Size`** *(Int | Default: 11)*: Font size of the internal volume label.
* **`Color Mode`** *(Enum: Basic, Heatmap | Default: Basic)*:
  * `Basic`: Exclusively uses colors defined in `Ask Color` and `Bid Color`.
  * `Heatmap`: Activates 3-tier thermal gradients according to order block magnitude.
* **`Show Historical Bubbles`** *(Bool | Default: True)*: Toggles bubbles on historical candles or restricts to the live session only.
* **`Magnetic Clustering`** *(Bool | Default: False)*:  
  **Recommended feature:** Merges simultaneous or adjacent executions at the same price tick within the same candle into one single institutional mega-order.  
  * *Recommendation:* Set to `True` on algorithmically fragmented instruments like NQ or ES.

### Groups: Heatmap Ask Settings & Heatmap Bid Settings
* **`Ask / Bid: Level 1 (Min)`** *(Bool | Default: True)*: First tier color for moderately large orders (e.g., Dark Green / Dark Red).
* **`Ask / Bid: Level 2`** *(Bool | Default: True)*: Mid-tier color for large institutional blocks (e.g., Forest Green / Crimson).
* **`Ask / Bid: Level 3 (Max)`** *(Bool | Default: True)*: Maximum high-intensity color for mega-whales (e.g., Lime Green / Bright Tomato).

### Group: Naked Lines Settings (Defense Lines and Bands)
* **`Enable Auto-Lines`** *(Bool | Default: False)*:  
  When `True`, automatically projects a support/resistance line each time an order surpasses `AutoLineMinVolume`.
* **`Min Volume (Auto-Lines)`** *(Double | Default: 500)*:  
  Minimum volume threshold required to trigger an automatic defense line.  
  * *Recommended values:* ES `500` to `1,000`; NQ `100` to `200`.
* **`Mitigation Mode`** *(Enum: CutOnTouch, ExtendInfinite | Default: CutOnTouch)*:
  * `CutOnTouch`: Truncates the line the exact moment a future bar touches its price tick, keeping charts clean and focused solely on unmitigated levels.
  * `ExtendInfinite`: Continues the line indefinitely regardless of re-crosses.
* **`Line Horizon`** *(Enum: All, SessionOnly | Default: All)*:
  * `All`: Preserves unmitigated lines across multiple sessions.
  * `SessionOnly`: Truncates all active lines at the end of the trading session.
* **`Enable Line`** *(Bool | Default: True)*: Plots the trajectory line.
* **`Line Style`** *(Enum: Solid, Dash | Default: Dash)*: Stroke style for mitigation lines.
* **`Line Thickness`** *(Float | Default: 2f)*: Line stroke thickness.
* **`Line Opacity (%)`** *(Int | Default: 100)*: Line stroke opacity.
* **`Enable Area`** *(Bool | Default: True)*: Activates the shaded defense buffer surrounding the line.
* **`Area Height (Ticks)`** *(Int | Default: 4 | Range: 1 to 12)*: Vertical height of defense buffer in ticks (e.g., 4 ticks = 1 full point in ES).
* **`Area Opacity (%)`** *(Int | Default: 20)*: Transparency of the defense area fill.
* **`Enable Label / Label Color / Label Size`** *(Default: True, White, 11)*: Volume label anchored to the mitigation line.

### Group: Histogram Settings (Bottom Panel)
* **`Enable Histogram`** *(Bool | Default: False)*: Enables the institutional volume sub-panel.
* **`Visual Style`** *(Enum: Stacked, Bidirectional, SideBySide | Default: Stacked)*:
  * `Stacked`: Stacks buying and selling volume into one single bar per candle.
  * `Bidirectional`: Plots buying volume upward from baseline and selling volume downward.
  * `SideBySide`: Displays two adjacent parallel bars per candle.
* **`Histogram Height (%)`** *(Int | Default: 10)*: Percentage of vertical chart window allocated to the sub-panel.
* **`Auto-Fit Scale`** *(Bool | Default: False)*: Automatically scales price action to prevent candlesticks from overlapping the histogram.
* **`Grid Settings`** *(Grid Divisions, Grid Color, Opacity)*: Visual reference grid lines for measuring volume magnitudes.

### Group: Scanner Settings (HUD Tape Scanner)
* **`Background Color / Opacity (%)`** *(Default: Black / 85%)*: Background fill for the on-chart terminal.
* **`Border Color / Opacity (%)`** *(Default: DarkGray / 100%)*: Terminal border stroke.
* **`Text Size / Text Color`** *(Default: 10f / White)*: Typography settings for order feed.
* **`Ask / Bid Colors`** *(Default: LimeGreen / Crimson)*: Colors indicating whether the reported trade was aggressive buying or selling.

### Group: Alert Settings (Acoustic Audio Alerts)
* **`Enable Sound Alerts`** *(Bool | Default: False)*: Enables real-time sound notifications.
* **`Min Volume (Alert)`** *(Double | Default: 1000)*: Minimum volume required to trigger audio alerts.
* **`Sound File (.wav) or Path`** *(String | Default: "Alert2.wav")*: Filename within the NinjaTrader sound directory or full path to a custom `.wav` file.

### Group: General Settings
* **`Instance Name`** *(String | Default: "LOF_BigTrades")*: Unique instance name in the suite.
* **`Instance Color`** *(Brush | Default: Cyan)*: Indicator color in the master toolbar.
* **`Visuals Enabled`** *(Bool | Default: True)*: Master toggle to pause bubble and line rendering.
* **`Tick Data Mode`** *(Enum: BidAsk, UpDownTick | Default: BidAsk)*: Always maintain on `BidAsk` to evaluate genuine order aggression.
* **`Layer Mode`** *(Enum: BehindPrice, Normal, TopMost | Default: Normal)*: Visual layer ordering relative to candlesticks.
* **`Zero-Lag Engine Mode`** *(Enum: Disabled, Smooth, Balanced, MaxPerformance | Default: Disabled)*: Frame rate refresh optimization.

---

## 4. Best Practices and Pro Trading Strategies

### A. Institutional Absorption vs. Momentum Breakout (Sweep)
Distinguishing the context where a Big Trade appears is essential for consistency:

1. **Absorption Trap at Resistance:**
   * Price reaches a key resistance level or session high.
   * A **massive buying bubble (Ask / Blue or Green)** of 1,000 contracts appears.
   * However, the candle **fails to close above the bubble and prints an upper rejection wick**, closing red.
   * **Interpretation:** Aggressive breakout buyers were absorbed entirely by institutional passive limit sell orders. This represents a high-probability bearish reversal setup.
2. **Genuine Momentum Breakout:**
   * Price tests a resistance level.
   * A massive buying bubble appears, and the candle **closes with a wide, solid body cleanly above the bubble level**, displacing price immediately.
   * **Interpretation:** The institutional order swept available passive liquidity with expansion intent. Await a pullback to the bubble price to join the long trend.

### B. Pullback Entries on Auto Naked Lines
* When an automatic line with its shaded defense area (*Naked Area*) is generated, that level represents the average price where an institution committed major capital.
* In approximately 70% of healthy trending markets, price performs a technical pullback seeking to test that line.
* **Entry Trigger:** Wait for price to pull back into the shaded area. If price rejects with a wick and the line truncates (*CutOnTouch*), enter in the direction of the original trend with a protective stop beyond the opposite edge of the shaded area.

### C. Recommended Volume Calibration Table by Instrument
Calibrating filters to individual market liquidity prevents false signals:

| Asset / Future | `Min Volume (Filter)` | `Max Volume (Fixed Ref)` | `AutoLineMinVolume` | `Min Volume (Alert)` |
| :--- | :--- | :--- | :--- | :--- |
| **E-mini S&P 500 (`ES`)** | `150` to `250` | `800` to `1,500` | `500` to `800` | `1,000` |
| **Micro E-mini S&P 500 (`MES`)** | `1,500` to `3,000` | `8,000` to `15,000` | `5,000` | `10,000` |
| **E-mini Nasdaq (`NQ`)** | `40` to `80` | `150` to `300` | `100` to `200` | `250` |
| **Micro E-mini Nasdaq (`MNQ`)** | `400` to `800` | `1,500` to `3,000` | `1,000` | `2,500` |
| **Crude Oil (`CL`)** | `50` to `100` | `200` to `400` | `150` to `250` | `300` |
| **Gold (`GC`)** | `40` to `80` | `150` to `300` | `100` to `200` | `250` |
| **10-Year Treasury Note (`ZN`)** | `1,000` to `2,500` | `5,000` to `10,000` | `3,000` to `5,000` | `5,000` |

---

## Next Steps and Related Tools

* **[Logic Footprint](/dashboard/docs/indicators/logic-footprint):** Observe delta clusters and microstructural order flow inside the exact candles where Big Trades hit.
* **[Logic Algorithms](/dashboard/docs/indicators/logic-algorithms):** Combine Big Trades with automated Whale Block and confirmed Absorption signals.
* **[General Settings](/dashboard/docs/configuration):** Learn how to apply and customize optimized templates in NinjaTrader 8.
