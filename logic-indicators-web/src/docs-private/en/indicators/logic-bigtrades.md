---
title: Logic BigTrades
description: Detects and visualizes massive institutional market orders, offering magnetic clustering, naked lines, and heatmaps.
order: 5
category: indicators
---

# Logic BigTrades

> If you haven't installed the Logic Indicators suite yet, please check the [Installation Guide](/docs/installation) first.

The **Logic BigTrades** indicator tracks aggressive institutional activity by detecting exceptionally large market orders (block trades) as they hit the tape. Instead of reading a fast-moving numbers matrix, traders can visually spot exactly where massive volume was injected into the market.

By plotting intelligent bubbles, dynamic support/resistance lines (Naked Lines), and a dedicated volume histogram, BigTrades allows you to instantly identify institutional defense levels, absorption zones, and capitulation points.

## Core Components

When enabled, Logic BigTrades adds several visual elements to your chart:

1. **Volume Bubbles:** Circles drawn directly on the price candle. The size of the bubble represents the total volume of the trade, and the color indicates if it was aggressive buying (Ask) or selling (Bid).

2. **Naked Lines:** Horizontal lines extended from the price level of a massive trade into the future, acting as visual support/resistance zones.

3. **Volume Histogram:** An optional sub-panel at the bottom of the chart displaying the total accumulated "Big Trade" volume per candle.

4. **Scanner (Inspector):** A floating tooltip that appears when you hover over a bubble, revealing the exact timestamp, price, total volume, and Delta of the cluster.

## Interactive Tools (Toolbar)

Logic BigTrades includes a dedicated toolbar at the top of your chart for on-the-fly adjustments:

- **Line:** Click this button, then click on any bubble on your chart to manually draw a Naked Line extending from that specific price level.

- **DelLine:** Instantly deletes all manually drawn Naked Lines to clean up your chart.

- **Scan:** Toggles the "Scanner" mode on or off. When ON, simply hover your mouse over any bubble to see its internal data block.

## Configuration Settings

This indicator is highly customizable. Below is a detailed breakdown of every configuration section:

### 1. General Settings

- **Zero-Lag Engine Mode:** Controls the graphic refresh rate. Use **Balanced** (1s refresh) if you use multiple indicators, or **Disabled** for real-time 60 FPS rendering.

- **Layer Mode & Priority:** Choose if the bubbles should be drawn behind the price (**BehindPrice**), normally (**Normal**), or on top of all other drawings (**TopMost**).

### 2. Filter Settings

- **Min Volume (Filter):** The most important setting. Defines the minimum number of contracts a trade must have to be drawn on the chart.

- **Max Volume (Fixed Reference):** The volume threshold that represents the maximum bubble size. Any trade larger than this will be capped at the maximum radius.

- **Scale Mode:** **Fixed** bases bubble sizes on your Max Volume setting. **VisibleWindow** dynamically resizes bubbles based on the highest volume currently visible on your screen.

### 3. Visual Settings

- **Colors & Opacity:** Define the default colors for Ask (Buys) and Bid (Sells), border thickness, and general transparency.

- **Min/Max Radius:** Sets the physical size (in pixels) of the smallest and largest bubbles.

- **Magnetic Clustering:** If enabled, bubbles that happen at the same price level and time will intelligently merge into one single, larger bubble representing the "Center of Mass". This prevents chart clutter.

- **Color Mode:** Choose **Basic** for solid colors, or **Heatmap** to color-code bubbles based on their intensity (configured in the Heatmap sections).

### 4. Heatmap Settings (Ask & Bid)

If **Color Mode** is set to **Heatmap**, you can define up to 3 tiers of colors based on volume size.

- Level 1 represents smaller big trades, while Level 3 (Max) is reserved for massive institutional orders. You can configure the colors independently for Ask and Bid volumes.

### 5. Naked Lines Settings

- **Enable Auto-Lines:** If turned on, the indicator automatically draws horizontal lines from trades that exceed the **AutoLine Min Volume**.

- **Mitigation Mode:** Determines when a line stops drawing. **CutOnTouch** will automatically delete the line once the price touches it again in the future (mitigation). **ExtendInfinite** draws the line forever.

- **Line Horizon:** **SessionOnly** will delete yesterday's lines on a new day. **All** keeps historical lines forever.

- **Enable Naked Area:** Instead of a thin line, this draws a semi-transparent rectangular zone (height defined by **Area Height in Ticks**) to represent a support/resistance band.

- **Enable Label:** Displays the exact volume number at the far right edge of the Naked Line.

### 6. Histogram Settings

- **Visual Style:** Choose how the bottom volume bars are drawn. **Stacked** puts Ask/Bid on top of each other. **SideBySide** draws them next to each other. **Bidirectional** draws Ask pointing up and Bid pointing down from a zero line.

- **Auto-Fit Scale:** Automatically compresses your chart's price scale upwards so the price candles never overlap with the bottom histogram.

- **Histogram Height (%):** Defines how much of the bottom chart screen the histogram is allowed to occupy (e.g., 20%).

### 7. Alert Settings

- **Enable Sound Alerts:** Plays an audio cue when a new big trade occurs in real-time.

- **Min Volume (Alert):** You can set this higher than your visual filter. (e.g., Draw bubbles for 500+ volume, but only trigger an alarm for 1000+ volume).

- **Selected Sound:** Choose from 5 custom institutional alert sounds.

## Best Practices & Tips

- **Use Magnetic Clustering:** During high volatility (like news events), hundreds of big trades can happen in seconds. Turn ON Magnetic Clustering to merge these into clean, readable "mega-bubbles" that show the true center of volume.

- **Keep Charts Clean with CutOnTouch:** Set your Naked Lines Mitigation Mode to **CutOnTouch**. This ensures your chart automatically cleans itself by removing levels that have already been retested and absorbed by the market.

- **Combine with Scanner:** If you see a massive merged bubble but want to know who was trapped inside, turn on the **Scan** button in the toolbar and hover over the bubble to see the exact Ask/Bid delta breakdown.

## See Also

- [Logic Footprint](/docs/indicators/logic-footprint) — Deep dive into the order flow per candle.

- [Logic Algorithms](/docs/indicators/logic-algorithms) — Automated detection of imbalances and absorptions.
