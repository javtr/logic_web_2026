---
title: Logic Profile
description: Comprehensive technical manual and parameter reference for Volume Profile, Delta Profile, and TPO Market Profile in NinjaTrader 8.
order: 3
category: indicators
---

# Logic Profile

> **The ultimate Auction Market Theory (AMT) workstation for NinjaTrader 8.**  
> Dissects the interplay between price, volume, and time session by session through a synchronized dual-column architecture, projecting mathematically accurate Value Areas (70%), unmitigated Naked POCs with automated touch mitigation (*CutOnTouch*), 60-minute Initial Balance (IB), and TPO rejection prints (*Single Prints*).

---

## 1. Visual Chart Components and Interpretation

The indicator maps the complete auction process across every trading session using the following high-precision visual elements:

| Visual Component | Chart Display | Operational Meaning & Interpretation |
| :--- | :--- | :--- |
| **Column 1: Volume Profile** | Horizontal histogram bars or continuous geometric silhouette (*Geometry*) anchored to session open. | Maps total executed volume by price. Highlights High Volume Nodes (**HVN**, consensus areas acting as support/resistance) and Low Volume Nodes (**LVN**, swift rejection areas). |
| **Column 2: TPO Market Profile** | Classic letters (A, B, C...) or visual blocks aggregated into 30-minute brackets. | Maps auction duration across price. Audits how much time the market spent at each level and reconstructs chronological auction rotation via 5-tier heatmaps. |
| **Column 2 (Alt): Delta Profile** | Bidirectional colored bars (Red = Net Sell Delta, Green = Net Buy Delta). | Illustrates net aggressive buying vs. selling per tick across the session, exposing institutional absorption and exhaustion levels. |
| **Value Area (VAH / VAL)** | Shaded background band enclosing the central 70% of session volume or TPO. | **VAH (Value Area High):** Ceiling of fair value; critical resistance on pullbacks. <br>**VAL (Value Area Low):** Floor of fair value; high-probability institutional support. |
| **Point of Control (POC Line)** | Prominent horizontal line (default Medium Aquamarine or Gold) at peak volume/time price. | Represents maximum session consensus and equilibrium. When unmitigated by subsequent sessions, projects forward as a **Naked POC** magnetic target. |
| **Single Prints (Rejection Prints)** | Isolated letters highlighted in magenta at the upper or lower boundaries of the TPO profile. | Signifies violent institutional aggression where price moved too rapidly for a second 30-min bracket to form; acts as strong support/resistance upon retests. |
| **Initial Balance (IB)** | Continuous vertical bracket spanning the price range of the first 60 minutes (brackets A & B). | Defines the benchmark volatility of regular market hours (RTH). Serves as baseline for statistical range expansion projections (1.5x IB, 2x IB). |
| **Session Extremes (High / Low)** | Thin horizontal boundary lines marking absolute session maximum and minimum. | Delineates the total reach of the auction for the trading day. |
| **Metrics HUD Box** | Floating summary widget docked at the top or bottom corner of the profile. | Instant quantitative telemetry: Total Volume, Net Delta, Ask/Bid, Max/Min Delta, Range in ticks, IB Range, and exact quotes for POC, VAH, and VAL. |

---

## 2. Interactive Tools and Controls

Logic Profile provides direct on-chart interaction to audit custom historical ranges without reloading indicators:

* **`[Draw]` Button on the Suite Toolbar (`_LOF Control Panel`):**
  * Clicking `[Draw]` switches the cursor into interactive range mode.
  * Click on the starting candle, then click on the ending candle across any chart range.
  * Instantly generates a **Custom Volume / TPO Profile** over that isolated swing, consolidation, or news event.
* **Manual Mode Only:**
  * When enabled in settings, disables automated session profiles and operates exclusively as an uncluttered manual drawing tool.
* **Context Menu (Right-Click on Profile):**
  * Provides quick commands to merge adjacent profiles (*Merge Profiles*), split TPO into separate 30-minute brackets (*Split TPO*), or extend POC lines into future candles.
* **Hardware Acceleration & Fast Loading Speeds:**
  * Using the `Historical Load Speed` setting, the indicator computes months of tick history in seconds, maintaining fluid 60 FPS chart panning and zooming with zero CPU strain.

---

## 3. Configuration Settings (Parameter Reference)

### Group: General Settings
* **`Instance Name`** *(String | Default: "LOF_Profile")*: Unique identifier for this instance.
* **`Instance Color`** *(Brush | Default: Orange)*: Color label within the master suite manager.
* **`Historical Load Speed`** *(Enum: Standard_DeltaEnabled, Medium_NoDelta, Fast_NoDelta, Ultra_NoDelta | Default: Fast_NoDelta)*:  
  **Historical loading optimization mode:**
  * `Fast_NoDelta` / `Ultra_NoDelta`: Aggregates historical ticks to load months of volume profile data in seconds.
  * `Standard_DeltaEnabled`: Processes raw tick-by-tick order flow calculating precise Bid/Ask Delta (required if running Delta Profile columns).
* **`Tick Data Mode`** *(Enum: BidAsk, UpDownTick | Default: BidAsk)*: Order processing engine mode. Keep set to `BidAsk`.
* **`Zero-Lag Engine Mode`** *(Enum: Disabled, Smooth, Balanced, MaxPerformance | Default: Disabled)*: Regulates on-screen repaint cadence.
* **`Layer Mode`** *(Enum: BehindPrice, Normal, TopMost | Default: BehindPrice)*: Keeps profiles behind candlesticks to preserve price action clarity.

### Group: Profile Settings (Auction Cycles & Schedule)
* **`Session Mode`** *(Enum: Continuo, Custom | Default: Continuo)*:
  * `Continuo`: Processes 24-hour continuous electronic sessions (ETH/Globex).
  * `Custom`: Filters calculation strictly between `Start Time` and `End Time`.
* **`Start Time / End Time`** *(DateTime | Default: 09:30 to 16:00)*: Regular Trading Hours (US Eastern RTH).
* **`Profile Period`** *(Enum: Daily, Weekly, Monthly | Default: Daily)*: Sets automated profile frequency to daily, weekly, or monthly boundaries.
* **`Manual Mode Only`** *(Bool | Default: False)*: When `True`, disables automated profiles and displays only user-drawn profiles created with `[Draw]`.
* **`TPO Bracket (Minutes)`** *(Int | Default: 30)*: Duration for each letter/block in Market Profile (30 min auction standard).
* **`Value Area (%)`** *(Double | Default: 70.0 | Range: 50.0 to 95.0)*: Percentage of total volume used to establish the Value Area (70% standard).
* **`Min. Realtime Width (px)`** *(Int | Default: 200)*: Minimum width allocated to the active realtime developing session profile.
* **`Merge Overlapping Profiles`** *(Bool | Default: False)*: Automatically merges profiles sharing overlapping timestamps.

### Group: Multipliers (Tick Aggregation & Compression)
* **`Bar Spacing (px)`** *(Int | Default: 0)*: Vertical pixel gap between profile rows.
* **`VP / Delta / TPO: Tick Multiplier`** *(Int | Default: 1)*: Independent tick aggregation multiplier per profile type.  
  * *Guideline:* Set to `1` on ES, Crude Oil, or Treasuries; `2` to `4` on volatile instruments like NQ to compress rows and reduce noise.
* **`VP / Delta / TPO: Box Visual Mode`** *(Enum: Summation, MaximumPeak | Default: Summation)*: Tick compression calculation method.
* **`VP / Delta / TPO: POC Calculation`** *(Enum: OriginalMaximumPeak, AdjustedSummation | Default: OriginalMaximumPeak)*: POC price placement algorithm.

### Groups: Col. 1 General & Col. 2 General (Column Architecture)
* **`Enable Column`** *(Bool | Default: True on C1 / False on C2)*: Enables dual-column layout.
* **`Column Width (%)`** *(Int | Default: 50 on C1 / 100 on C2)*: Width allocation between Column 1 and Column 2.
* **`Used Width (%)`** *(Int | Default: 50% on C1 / 80% on C2)*: Horizontal histogram expansion limit within its designated column.
* **`Profile Type`** *(Enum: Volume, Delta, DeltaOverVolume, VolumeAndDelta, DeltaAndVolume, TPO | Default: Volume on C1 / Volume on C2)*: Selects the data type calculated and rendered in the column (Volume, Delta, or TPO).
* **`Highlight Open/Close`** *(Bool | Default: False)*: Highlights session open and close prices on the profile.

### Groups: C1 / C2 Volume Profile
* **`Draw Style`** *(Enum: Bars, Geometry | Default: Geometry on C1 / Bars on C2)*:
  * `Geometry`: High-definition smooth silhouette highlighting HVN and LVN nodes.
  * `Bars`: Standard segmented horizontal histogram bars.
* **`Alignment`** *(Enum: Left, Right | Default: Left)*: Profile horizontal anchor orientation.
* **`Fill Color / Fill Opacity`** *(Brush / Int | Default: Silver / 80%)*: Body color and transparency.
* **`Enable Stacked Bid/Ask`** *(Bool | Default: False)*: Splits each bar into dual colors representing bought and sold volume.

### Groups: C1 / C2 Delta Profile
* **`Bid Color / Ask Color`** *(Brush | Default: Red / LimeGreen)*: Palette for negative and positive net delta bars.
* **`Custom Width (%)`** *(Int | Default: 50)*: Specific horizontal width for delta profile display.

### Groups: C1 / C2 TPO (Market Profile)
* **`Visualization`** *(Enum: Blocks, Letters, BlocksAndLetters, Geometry | Default: Letters)*: Display format for 30-minute brackets.
* **`Color Mode`** *(Enum: Solid, Heatmap | Default: Solid)*: Toggles chronological 5-tier heatmaps (session open in blue through close in red).
* **`Highlight Single Prints`** *(Bool | Default: False)*: Highlights isolated rejection letters in distinctive color (default Magenta).
* **`Font Size / Letter Color`** *(Int / Brush | Default: 6 to 10 / White)*: Typography settings for TPO letters.

### Groups: C1 / C2 POC (Point of Control)
* **`Highlight in VP / Delta / TPO`** *(Bool | Default: True)*: Emphasizes the POC row or letter block.
* **`POC Color / Fill Opacity`** *(Brush / Int | Default: MediumAquamarine / 100%)*: Visual styling for the POC.
* **`Enable POC Line`** *(Bool | Default: True)*: Projects a horizontal price line at the POC level.
* **`POC Line Extension`** *(Enum: Column, Profile, NextProfile | Default: Column)*:
  * `Column`: Contained within its column width.
  * `Profile`: Spans the full session width.
  * `NextProfile`: **Naked POC:** Extends horizontally forward until touched and mitigated by future price (*CutOnTouch*).
* **`Show Label / Show Price`** *(Bool | Default: True)*: Labels displaying "POC" text and price quote.

### Groups: C1 / C2 Value Area (Value Zones)
* **`Enable VA`** *(Bool | Default: True)*: Shades the 70% value zone.
* **`VA Color / Fill Opacity`** *(Brush / Int | Default: CornflowerBlue / 90%)*: Color and opacity for the Value Area.
* **`Enable VA Line`** *(Bool | Default: True)*: Renders boundary lines for VAH and VAL.
* **`VA Line Extension`** *(Enum: Column, Profile, NextProfile | Default: Column)*: Projection rule for VAH and VAL lines.

### Groups: C1 / C2 Initial Balance (60-Minute Benchmark)
* **`Enable`** *(Bool | Default: False)*: Activates the Initial Balance visual bracket.
* **`Duration (Minutes)`** *(Int | Default: 60)*: Initial session duration (60 minutes standard).
* **`Color / Line Thickness`** *(Brush / Int | Default: MediumBlue / 2)*: Styling and stroke width for the IB bracket.

### Group: Profile Metrics (Session Telemetry)
* **`Enable Metrics`** *(Bool | Default: False)*: Displays the session statistical summary HUD box.
* **`Block Position`** *(Enum: TopLeft, BottomLeft | Default: BottomLeft)*: HUD box docking position.
* **`Show Volume / Show Delta / Show Range / Show IB Range / Show POC / Show VAH / Show VAL`**: Toggles individual metrics inside the summary box.

---

## 4. Best Practices & Operational Strategies

### A. The 80% Rule in the Value Area (Value Area Play)
A cornerstone statistical playbook in Auction Market Theory:
* **Initial Setup:** The market opens outside the prior day's Value Area (above VAH or below VAL).
* **Trigger Confirmation:** If price re-enters the prior Value Area and **prints two consecutive 30-minute bar closes inside it**, there is an **80% statistical probability that price will traverse the entire Value Area to reach the opposite boundary (VAL or VAH)**.
* **Trade Management:** Enter on the retest of the Value Area boundary, place Target 1 at the prior session POC, and final Target at the opposite boundary.

### B. Dual-Column Synergy (Volume Profile + TPO or Delta)
Deploying synchronized dual columns delivers an asymmetric edge:
* **Column 1 in Volume Profile (Geometry Mode):** Displays where heavy volume accumulated (HVN nodes).
* **Column 2 in TPO Market Profile (Letters Mode):** Displays how long the auction accepted that price.
* **Institutional Footprint Detection:** A price level displaying **heavy volume in C1 but very few TPO letters in C2** indicates that a massive quantity of contracts traded in minutes. This reveals **aggressive institutional defense or absorption**, not passive auction balance.

### C. Trading TPO Single Prints
* **Single Prints** (isolated magenta letters) reflect swift price rejection where the auction failed to build two-sided trade.
* In over 80% of occurrences, when price revisits a prior session's Single Print zone, it reacts forcefully on the initial test. Treat Single Print extremes as high-conviction entry zones or tight invalidation thresholds.

### D. Session Schedule Calibration: RTH vs. ETH
* **For US Equity Index Futures (ES / NQ):**
  * For pure auction theory analysis, set `Session Mode` to **`Custom`** spanning **`09:30` to `16:00`** (US Eastern). This isolates Regular Trading Hours (RTH) where primary institutional capital participates, providing accurate Initial Balance metrics.
  * For overnight Globex/European session analysis, run a secondary chart with `Session Mode` set to **`Continuo`** to evaluate 24-hour balance.

---

## See Also

* [Logic Footprint](/dashboard/docs/indicators/logic-footprint) — Microstructural candle-by-candle order flow with imbalances and POC.
* [Logic Composite](/dashboard/docs/indicators/logic-composite) — Multi-session macro volume and TPO profiles fixed to screen margins.
* [Logic Analytics](/dashboard/docs/indicators/logic-analytics) — Effort vs. Result quantitative laboratory with interactive boxes.
