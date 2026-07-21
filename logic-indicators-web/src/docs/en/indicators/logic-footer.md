---
title: Logic Footer
description: Comprehensive bar statistics panel displaying volume, delta, cumulative metrics, and trade data.
order: 2
category: indicators
---

# Logic Footer

> If you haven't installed the Logic Indicators suite yet, please check the [Installation Guide](/docs/installation) first.

The **Logic Footer** indicator is a powerful statistical engine that sits at the bottom of your chart or hovers directly above/below your candles. It extracts the raw Order Flow data of every single bar and calculates crucial metrics such as Cumulative Delta, Commitment of Traders (COT), Max/Min Delta, and Trade Counts.

By translating complex tick data into an easy-to-read, color-coded grid, traders can instantly spot divergences (e.g., price going up while Delta is heavily negative), evaluate the true effort behind a breakout, and monitor the shifting momentum of the session.

## Core Components

The indicator features two independent rendering engines that can be used together or separately:

1. **Fixed Footer:** A traditional statistical grid locked at the bottom of the chart. It includes row labels on the left or right side and is perfect for tracking macroeconomic shifts (like Cumulative Delta or Session Volume).

2. **Floating DataBox:** A compact, floating statistics box that hovers automatically above or below the price candles. Ideal for keeping your eyes on the price action while monitoring immediate bar metrics (like Bar Delta or Max/Min Delta).

3. **Dynamic Heatmaps:** Instead of just showing numbers, the cell backgrounds change color or opacity based on how strong the value is compared to the rest of the market.

4. **Auto-Fit Engine:** Automatically compresses the chart's price scale so the candlesticks never hide behind the Footer or DataBox.

## Interactive Tools (Toolbar)

Logic Footer includes a quick-access toolbar on your chart to toggle visual elements without opening the indicator settings:

- **FT:** Instantly shows or hides the Fixed Footer at the bottom of the chart.

- **DB:** Instantly shows or hides the Floating DataBox attached to the candles.

## Configuration Settings

Because the Fixed Footer and the Floating DataBox are fully independent, they have their own dedicated configuration sections:

### 1. General Settings

- **Zero-Lag Engine Mode:** Controls the graphic refresh rate to optimize CPU usage. Options include **Smooth**, **Balanced**, **Max Performance**, or **Disabled** (real-time). Use **Balanced** for heavy charts.

- **Layer Mode & Priority:** Defines if the footer renders behind or in front of other chart elements (**BehindPrice**, **Normal**, **TopMost**).

### 2. Footer Graphics & DataBox Graphics

These two sections control the visual aesthetics of the respective panels:

- **Enable...:** Master switch to turn the panel on or off.

- **Auto-Fit Scale:** If enabled, the chart's Y-axis will shrink automatically to make room for the panel.

- **Colors & Opacities:** Define the base colors for Volume, Ask, Bid, and Custom metrics. You can set a **Min Opacity** and **Max Opacity** for the cell backgrounds.

- **Text Color Mode:**

  - **AutoContrast:** Text automatically switches to black or white depending on the cell's background color to ensure readability.

  - **SameAsCell:** Text takes the exact color of the cell's background (useful if you set cell opacity to 0 and only want colored text).

  - **CustomColor:** Forces all text to use a specific manual color.

- **Show Labels / Labels Position:** Toggles the descriptive titles (e.g., "Vol", "Del") and positions them on the **Left** or **Right**.

- **DataBox Distance (Ticks):** How far away the floating DataBox hovers from the high/low of the candle.

### 3. Max Value Scale Mode

This section dictates how the indicator calculates the intensity (color/opacity) of the cells:

- **Max Calculation Mode:**

  - **VisibleBars:** Compares the cell against the highest value currently visible on your screen.

  - **CustomSession:** Compares the cell against the highest value within your defined Custom Session hours.

  - **AllData:** Compares against the entire loaded chart history.

  - **Manual:** Compares the cell against fixed limits you manually define in the "Manual Value" section below.

- **Reset Delta per Session:** If enabled, Cumulative Delta resets to zero at the start of a new trading session.

### 4. Manual Value

If your *Scale Mode* is set to **Manual**, this section defines the ceiling limits. For example, if you set *Total Volume* to 5000, any candle with 5000+ volume will glow with maximum intensity (100% opacity or Level 5 Heatmap).

### 5. Footer Metrics & DataBox Metrics

Select exactly which rows of data you want to display in each panel. You can display over 20 different statistics, including:

- **Total / Buy / Sell Volume:** Standard traded volume.

- **Delta & Delta (%):** The net difference between aggressive buyers and sellers.

- **Max / Min Delta:** The highest and lowest Delta reached *during* the formation of the candle.

- **COT High / COT Low:** "Commitment of Traders". Measures the Delta accumulated exclusively since the candle made its High or Low.

- **Top / Bottom Delta:** The Delta executed precisely at the extreme high tick or extreme low tick of the candle.

- **Cumulative Delta / Cum Volume:** Accumulations across the entire session.

- **Bar Range & Time (Duration):** How many ticks the candle spans and how many seconds it took to close.

### 6. Heatmaps (Ask, Bid, Vol & Trades, Range & Time)

If you enable **Footer/DataBox Heatmap** in the graphics section, the indicator will ignore opacity and instead use a 5-tier color scale. Level 1 represents cold/low activity, while Level 5 represents extreme institutional activity. You can customize the specific colors for every tier.

### 7. Zoomed Out View

To prevent the screen from becoming a mess when you zoom out, the Level of Detail (LOD) system automatically hides elements:

- **Hide Labels / DataBox / Footer (Candle Width):** The minimum pixel width a candle must have. If the candle gets thinner than this value due to zooming out, the respective panel or text will automatically disappear.

## Best Practices & Tips

- **Split the Workload:** A great setup is enabling the **Floating DataBox** to show only 2 metrics: *Delta* and *Volume* (for immediate reading), while using the **Fixed Footer** at the bottom to show macro stats like *Cumulative Delta*, *Max/Min Delta*, and *COT*.

- **Use Auto-Fit:** Always keep **Footer Auto-Fit** turned ON. This ensures your candlesticks never get buried behind the data grid at the bottom of your screen.

- **Identify Absorption with Max/Min Delta:** If a bullish candle closes with a highly positive Delta, but its *Min Delta* was extremely negative during the bar, it means sellers tried to push the market down, got absorbed, and buyers took control.

## See Also

- [Logic Footprint](/docs/indicators/logic-footprint) — View the volume distributed inside the candle.

- [Logic Analytics](/docs/indicators/logic-analytics) — Draw custom statistical boxes over specific areas of price action.
