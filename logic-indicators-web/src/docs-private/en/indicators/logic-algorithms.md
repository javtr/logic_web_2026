---
title: Logic Algorithms
description: Technical manual and complete reference for the 11 Order Flow microstructural algorithms on NinjaTrader 8.
order: 7
category: indicators
---

# Logic Algorithms

> **Microstructural Order Flow pattern recognition station for NinjaTrader 8.**  
> Automatically detects stacked imbalances, passive limit absorptions, trapped traders, open unfinished auctions, and volume anomalies directly over your candles without having to analyze dense numerical grids.

---

## 1. On-Chart Visual Components and Interpretation

The indicator plots 11 independent microstructural patterns. Below is the visual representation and interpretation for each one:

### 1. Stacked Imbalance Zones (*Imbalance Zones*)
* **What it plots:** Horizontal rectangular bands colored blue (demand) or red (supply) originating from candles where several contiguous levels of diagonal aggressive buying or selling were identified.
* **Interpretation:** Marks the origin of massive institutional imbalances. When continuous extension is enabled, they project forward as dynamic support and resistance zones until mitigated by future price action.

### 2. Advanced Cluster Boxes (*Advanced Clusters*)
* **What it plots:** Rectangular boxes centered on specific price ticks within the candle where volume, delta, or bid/ask executions exceeded the defined threshold.
* **Interpretation:** Highlights the candle's center of gravity. Reveals whether the primary liquidity battle occurred in the middle (value acceptance) or at the outer edges (aggressive level defense).

### 3. Absorption Finder (*Absorptions Finder*)
* **What it plots:** A bounded box around the absorbed price level featuring two distinct visual phases:
  * **Active Box (dark / semi-transparent):** Triggered when the algorithm identifies a surge of heavy contracts but price fails to displace past the configured tick tolerance.
  * **Approved Box (bright color with solid border):** Validates after the confirmation bars close, provided price successfully bounced in the expected direction.
* **Interpretation:** High-accuracy reversal signal. An institutional participant positioned massive passive limit orders that absorbed all oncoming market aggressions, halting price dead in its tracks.

### 4. Exhaustion Markers (*Exhaustion*)
* **What it plots:** A distinctive marker on the topmost or bottommost tick of the candle's wick.
* **Interpretation:** Indicates that volume completely dried up at the extreme (total lack of buyer interest at highs or seller interest at lows). The auction runs out of fuel and prepares to rotate.

### 5. Unfinished Auction Lines (*Unfinished Auctions*)
* **What it plots:** A dashed horizontal line anchored at the outer candle tick projecting to the right.
* **Interpretation:** In a completed auction, the counter-side volume at the extreme price tick should be zero contracts. If contracts were negotiated on both sides of the final tick, the auction remained open; the market tends to treat this level as a price magnet to revisit and conclude the cycle.

### 6. Zero Nodes / Liquidity Voids (*Zero Nodes*)
* **What it plots:** Thin rectangular boxes at specific price levels within the candle body.
* **Interpretation:** Represents price levels where 0 contracts were traded due to explosive price movement or order book slippage. These levels often offer little to no resistance when price re-crosses them.

### 7. Isolated Volume Spikes (*Volume Spikes*)
* **What it plots:** Prominent bands on a single tick that registered abnormally higher volume (e.g., 5x) compared to its immediate adjacent neighbor ticks.
* **Interpretation:** Delimits an isolated institutional defensive line at that specific price.

### 8. Whale Blocks (*Whale Blocks*)
* **What it plots:** Solid boxes at prices where executed trades exhibited an average trade size per order far above standard market participants.
* **Interpretation:** Highlights non-fragmented institutional capital entering the market.

### 9. Trapped Traders (*Trapped Traders*)
* **What it plots:** Bright green markers (trapped sellers / bullish reversal) or bright red markers (trapped buyers / bearish reversal).
* **Interpretation:** Appears when the Point of Control (POC) or a large volume cluster is trapped within the top or bottom 20%-25% of the candle and price closes opposite, triggering forced stop runs and liquidations.

### 10. Delta Reversals (*Delta Reversals*)
* **What it plots:** A subtle background tint on the candle.
* **Interpretation:** Occurs when a candle closes strongly bullish but its internal net delta was deeply negative (or vice versa), proving passive limit orders overpowered market aggression.

### 11. Delta Divergences (*Delta Divergences*)
* **What it plots:** A background tint on the candle (e.g., Gold or Purple).
* **Interpretation:** Price forms a new swing high or low relative to prior bars, but the candle's net delta fails to confirm the new extreme, signaling trend exhaustion.

---

## 2. Interactive Tools and Toolbar Controls

### Quick Buttons on the Master Toolbar (`_LOF Control Panel`)
Inside the floating suite toolbar, Logic Algorithms provides **up to 4 configurable quick-action buttons** (`Button 1`, `Button 2`, `Button 3`, `Button 4`):

* Each button can be linked to any of the 11 algorithms (e.g., Button 1 = *Absorptions*, Button 2 = *Imbalances*, Button 3 = *Trapped Traders*, Button 4 = *Unfinished Auctions*).
* By clicking them directly on your chart, you can toggle that specific pattern on or off instantly—keeping your chart uncluttered and enabling high-probability signals only when price enters your key operational zones.

---

## 3. Configuration Settings (Parameter-by-Parameter Reference)

### Group: General Settings
* **`Instance Name`** *(String | Default: "LOF_Algorithms")*: Unique identifier for this instance within the workspace.
* **`Instance Color`** *(Brush | Default: Cyan)*: Identification color in the master control toolbar.
* **`Visuals Enabled`** *(Bool | Default: True)*: Master toggle to turn all visual algorithm plots on or off simultaneously.
* **`Tick Data Mode`** *(Enum: BidAsk, UpDownTick | Default: BidAsk)*:
  * `BidAsk`: Professional high-accuracy mode. Requires real tick-by-tick Level 1 market data.
  * `UpDownTick`: Simulated mode based on price tick movement (use only if your data provider lacks full Level 1 feeds).
* **`Zero-Lag Engine Mode`** *(Enum: Disabled, Smooth, Balanced, MaxPerformance | Default: Disabled)*: Optimizes screen refresh rates according to hardware capabilities. For standard charts, `Disabled` or `Balanced` is recommended.
* **`Layer Mode`** *(Enum: BehindPrice, Normal, TopMost | Default: BehindPrice)*: Signal rendering order relative to price bars. `BehindPrice` draws algorithm zones behind candles to preserve clean price action.
* **`Priority (Offset)`** *(Int | Default: 0)*: Rendering priority relative to other indicators in the suite.
* **`Signals Margin (Ticks)`** *(Int | Default: 0)*: Tick margin separation between candle extremes and outer markers (exhaustion triangles, trapped squares).

### Group: Quick Buttons
* **`Button 1 Action` to `Button 4 Action`** *(Enum: None, Imbalances, Clusters, Exhaustion, Absorptions, UnfinishedAuctions, ZeroNodes, VolumeSpikes, WhaleBlocks, TrappedTraders, DeltaReversals, DeltaDivergences | Default: None)*:  
  Assigns which algorithm is toggled by each of the 4 quick buttons.  
  * *Recommended setup:* Button 1 = `Imbalances`, Button 2 = `Absorptions`, Button 3 = `TrappedTraders`, Button 4 = `UnfinishedAuctions`.

### Group: Imbalance Zones
* **`Show Imbalances`** *(Bool | Default: True)*: Enables detection and plotting of stacked diagonal imbalances.
* **`Min Stacked Count`** *(Int | Default: 3 | Range: 2 to 5)*: Minimum number of consecutive price levels with diagonal imbalance required to form an institutional zone. `3` is industry standard.
* **`Use Ratio`** *(Bool | Default: True)*: Evaluates imbalances using diagonal multiplication ($Ask / Bid_{prev}$).
* **`Minimum Ratio (Diagonal)`** *(Double | Default: 3.1 | Range: 2.5 to 4.0)*: Required multiplier. A value of `3.1` requires buy orders to exceed diagonal sell orders by at least 310%.
* **`Min Volume (Ratio)`** *(Double | Default: 10)*: Volume filter to prevent plotting imbalances on illiquid ticks (e.g., 3 vs 0 contracts). In ES, suggest `100` to `150`; in NQ `15` to `30`.
* **`Use Difference (Delta)`** *(Bool | Default: False)*: Evaluates imbalances via absolute contract difference rather than ratio.
* **`Minimum Difference`** *(Double | Default: 100)*: Minimum net contract difference for subtraction calculation.
* **`Extend to Infinity`** *(Bool | Default: False)*: Extends rectangular zones indefinitely to the right until touched/mitigated by price.
* **`Filter Mode (Infinite)`** *(Enum: None, LastXDays, CustomDate | Default: LastXDays)*: Prevents clutter by limiting zone memory to recent days.
* **`Last X Days`** *(Int | Default: 5)*: Days backward to keep unmitigated zones active.
* **`Ask Color (Demand) / Bid Color (Supply)`** *(Brush | Default: DodgerBlue / Crimson)*: Colors for demand and supply zones.
* **`Zone Opacity`** *(Float | Default: 0.2f)*: Transparency percentage of the zones (20% by default).

### Group: Advanced Clusters
* **`Show Clusters`** *(Bool | Default: True)*: Enables intra-candle volume concentration boxes.
* **`Search Mode`** *(Enum: Volume, Ask, Bid, Delta | Default: Volume)*: Metric evaluated to plot the cluster.
* **`Value Type`** *(Enum: Absolute, RelativePercent | Default: Absolute)*: Defines whether the threshold is a fixed contract count or a percentage of the total candle volume.
* **`Minimum Value`** *(Double | Default: 1000.0)*: Minimum contracts required at a tick (in ES `1,000` to `2,500`; in NQ `150` to `400`).
* **`Candle Location`** *(Enum: Any, MidToHigh, MidToLow | Default: Any)*: Filters the position of the cluster within candle geometry.
* **`Max Ticks from High / Low`** *(Int | Default: 999)*: Isolates clusters occurring exclusively within $N$ ticks from outer candle extremes.
* **`Min Delta Dominance (%)`** *(Double | Default: 0.0)*: Requires delta within the cluster to dominate by at least this percentage.
* **`Tick Grouping (Thickness)`** *(Int | Default: 1)*: Thickness in ticks of the cluster block.
* **`Box Color / Box Opacity / Box Width %`** *(Default: Aquamarine, 0.4f, 80%)*: Visual styling for the cluster box.

### Group: Absorptions Finder
* **`Show Absorptions`** *(Bool | Default: False)*: Enables the passive institutional absorption finder.
* **`Min Ask/Bid`** *(Double | Default: 200)*: Minimum contracts executed at the level to qualify as potential absorption.
* **`Min Delta`** *(Double | Default: 100)*: Minimum absorbed net delta at the level.
* **`Max Displacement (Ticks)`** *(Int | Default: 5)*: Maximum tolerated price drift. If price moves further than this, it is treated as a clean breakout rather than absorption.
* **`Validation Bars`** *(Int | Default: 1 | Range: 1 to 3)*: Confirmation bars required to approve the absorption. With `1`, the next candle must close in the opposite direction to confirm the signal.
* **`Max Validation Displacement`** *(Int | Default: 5)*: Maximum tolerated drift during the validation candle.
* **`Approved Ask / Bid Colors`** *(Default: MediumSpringGreen / DeepPink)*: Signal color once the absorption is validated.
* **`Active Ask / Bid Colors`** *(Default: Teal / DarkMagenta)*: Preliminary color while the absorption is developing.
* **`Strict Mode (Vol+Delta)`** *(Bool | Default: False)*: Requires both total volume and delta thresholds to be satisfied simultaneously.

### Group: Exhaustion
* **`Show Exhaustion`** *(Bool | Default: False)*: Enables extreme wick liquidity drying detection.
* **`Drying Threshold (Vol)`** *(Double | Default: 10.0)*: Maximum contracts allowed at the extreme to consider it exhausted (low values show lack of interest).
* **`Use Relative Vol (%)`** *(Bool | Default: False)*: Evaluates drying as a percentage of the candle's average volume.
* **`Candle Reversal Filter`** *(Bool | Default: False)*: Requires the candle to display a rejection wick to validate the signal.
* **`Extreme High / Low Colors`** *(Default: Cyan / Magenta)*: Marker colors at candle extremes.

### Group: Unfinished Auctions
* **`Show Unfinished Auctions`** *(Bool | Default: True)*: Enables open auction projection lines.
* **`Show Only Active (Naked)`** *(Bool | Default: True)*: Automatically hides lines once price touches and mitigates them.
* **`Ask / Bid Colors`** *(Default: DodgerBlue / Crimson)*: Projection line colors for highs and lows.
* **`Opacity`** *(Float | Default: 0.5f)*: Line opacity.

### Group: Zero Nodes
* **`Show Voids (Zero Nodes)`** *(Bool | Default: False)*: Highlights intra-bar levels with 0 contracts traded.
* **`Ignore Extremes (Wicks)`** *(Bool | Default: True)*: Ignores natural zero-prints on outermost wick tips, focusing on liquidity gaps inside the candle body.

### Group: Volume Spikes
* **`Show Volume Spikes`** *(Bool | Default: False)*: Enables tick-level volume anomaly detection.
* **`Neighbor Multiplier`** *(Double | Default: 5.0)*: Volume multiplier relative to average volume of adjacent upper and lower ticks (e.g., `5.0` requires 5x the volume of neighboring ticks).
* **`Min Volume`** *(Double | Default: 250.0)*: Absolute minimum volume threshold for the spike.

### Group: Whale Blocks
* **`Show Whale Blocks`** *(Bool | Default: False)*: Displays single executions with high average contracts per order.
* **`Min Contracts/Order (Avg)`** *(Double | Default: 50.0)*: Average contracts per transaction required (separates institutional blocks from fragmented retail flow).
* **`Min Volume`** *(Double | Default: 250.0)*: Total volume threshold required in the block.

### Group: Trapped Traders
* **`Show Trapped Traders`** *(Bool | Default: False)*: Enables candle extreme trap alerts.
* **`Extreme Zone (%)`** *(Double | Default: 25.0 | Range: 15% to 30%)*: Percentage of candle considered extreme zone (e.g., top or bottom 25%).
* **`Min POC Volume`** *(Double | Default: 500.0)*: Minimum volume required at the Point of Control trapped in that extreme.
* **`Bullish / Bearish Signal Colors`** *(Default: Lime / Red)*: Color of the trapped trader indicator.

### Groups: Delta Reversals & Delta Divergences
* **`Show Delta Reversals / Divergences`** *(Bool | Default: False)*: Enables background bar tinting for these conditions.
* **`Min Extreme Delta`** *(Double | Default: 300.0)*: Minimum opposite delta required to paint a delta reversal.
* **`Min Discordant Delta`** *(Double | Default: 200.0)*: Minimum discordant delta required relative to a new extreme to paint a divergence.

---

## 4. Best Practices and Pro Trading Strategies

### A. The "Golden Combo": Absorption + Trapped Traders
* One of the most consistent setups in Order Flow trading consists of waiting for price to test a key higher-timeframe technical level (such as Session VAH or prior day's high).
* **Entry Trigger:** If the indicator simultaneously plots an **Approved Absorption Box** at the high and a **Trapped Traders** signal with a rejection wick, smart money has absorbed aggressive breakout buyers. This offers an immediate short entry with a tight stop above the wick and an asymmetric risk/reward ratio.

### B. Trading Unfinished Auctions
* Unfinished auctions are not instant counter-trend reversal triggers; they serve as **Price Magnets (Take-Profit Targets)**.
* When buying a trend continuation pullback and identifying an open *Unfinished Auction* 15 ticks higher, use that line as your primary target. The market frequently accelerates into these levels to finalize the auction before reversing.

### C. Preventing Chart Clutter
1. **Never enable all 11 algorithms simultaneously:** Activating every signal clutters your screen. Focus on **2 or 3 complementary algorithms** suited to your trading style:
   * *For trend & continuation traders:* `Imbalance Zones` and `Advanced Clusters`.
   * *For reversal & rotation traders:* `Absorptions Finder`, `Trapped Traders`, and `Exhaustion`.
2. **Utilize the 4 Quick Buttons:** Map your preferred patterns to the toolbar quick buttons. Toggle them only when price enters your key zone of interest.
3. **Calibrate volume thresholds per instrument:** A `500`-contract threshold on `Min POC Volume` is ideal for E-mini S&P 500 (`ES`), but will yield zero signals on Nasdaq (`NQ`) or Crude Oil (`CL`). On NQ, lower volume filters to between `100` and `250` contracts.

---

## Next Steps and Related Tools

* **[Logic Footprint](/dashboard/docs/indicators/logic-footprint):** Examine candle internals to verify imbalances and deltas highlighted by the algorithms.
* **[Logic BigTrades](/dashboard/docs/indicators/logic-bigtrades):** Track individual high-volume market orders executed in real time.
* **[General Settings](/dashboard/docs/configuration):** Learn how to save your custom algorithm templates and optimize workspace performance.
