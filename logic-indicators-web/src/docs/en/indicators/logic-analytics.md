---
title: Logic Analytics
description: Statistical Order Flow box that analyzes Volume, Delta, and Range with standard deviations.
order: 6
category: indicators
---

# Logic Analytics

> If you haven't installed the Logic Indicators suite yet, please check the [Installation Guide](/docs/installation) first.

The **Logic Analytics** indicator is an advanced statistical tool designed to analyze Order Flow within a specific time range. It isolates price action inside a customizable "Box" and calculates the true underlying metrics of the market, such as Volume, Positive Delta, Negative Delta, and Price Range.

By calculating averages and standard deviations dynamically, Logic Analytics allows you to instantly identify when the market is behaving normally or when it is experiencing an anomalous institutional push. This makes it an essential tool for traders who want to contextualize the current market effort versus historical or session-based averages without guessing.

## Core Components

When a box is drawn on your chart, it is divided into distinct panels (which can be toggled on or off):

1. **Price Box:** Highlights the exact price range and time span of the analysis.

2. **Volume Panel:** Displays a histogram of the volume traded per bar. It includes dashed lines representing the Average Volume and the Standard Deviation threshold.

3. **Delta Panel:** Plots the Cumulative Delta curve, showing the evolution of aggressive buying vs. selling pressure throughout the box.

4. **Statistics Panel:** A clean summary at the bottom of the box showing the Maximum, Average (Avg), and Standard Deviation (Std) for Volume, Delta+, Delta-, and Range.

## Interactive Tools (Toolbar)

Logic Analytics features an interactive toolbar at the top of your chart:

- **Draw:** Click this button, then click twice on your chart to manually draw a custom analytics box over any price action area.

- **Edit:** Enables Edit Mode. When active, you can click and drag the edges of any manual box to resize it, or click the red 'X' to delete it.

- **X-Ray Toggle:** Cycles through highlight modes (**G** = Global, **O** = Off, **L** = Long, **S** = Short, **B** = Both). This colors specific candles inside the box that have extreme Order Flow activity.

- **Clear:** Instantly removes all manually drawn boxes from the chart (Auto Boxes are preserved).

## Configuration Settings

### 1. General Settings

- **Zero-Lag Engine Mode:** Controls the graphic refresh rate to optimize CPU usage. Options include **Smooth**, **Balanced**, **Max Performance**, or **Disabled** (real-time 60 FPS). Use balanced or higher if you have multiple indicators running.

- **Use Global Engine:** Links the indicator to a master data engine for better performance.

- **Layer Mode & Priority:** Controls whether the boxes are drawn behind the price candles, normally, or on top of everything.

### 2. Graphic Settings

- **Box Background & Opacity:** Sets the color and transparency of the main box area.

- **Colors:** Fully customize the colors for Box Borders, Volume, Positive Delta, Negative Delta, and Metrics Text.

- **Abbreviate Values (K, M):** If enabled, large numbers will be shortened (e.g., 1,500 becomes 1.5K, 1,000,000 becomes 1M) to keep the chart clean.

- **Show Panels:** Individually toggle the visibility of the Volume, Delta, and Statistics panels.

- **Box Heights (px):** Adjust the exact pixel height for the Volume, Delta, and Stats panels.

- **Histogram Internal Margin (%):** Adds vertical padding inside the panels so histograms don't touch the edges.

- **Width Settings:** Choose to match the width of the chart candles or set a custom width percentage for the histogram bars.

### 3. Auto Box Settings

Instead of drawing boxes manually, you can set the indicator to automatically analyze a specific time period every single day.

- **Enable Auto Box:** Turns the automatic generation on or off.

- **Start Time (HH:mm):** The exact time the box should start recording data (e.g., `09:30`).

- **End Time (HH:mm):** The exact time the box should stop recording (e.g., `10:30`).

## Best Practices & Tips

- **Session Analysis:** Use the Auto Box feature to wrap the first hour of your trading session (e.g., the NY Open). This gives you a statistical baseline to compare the rest of the day against.

- **Identify True Breakouts:** If the price breaks out of your analytics box but the breakout volume remains below the box's calculated Standard Deviation, it has a high probability of being a false breakout.

- **CPU Optimization:** If you draw many boxes across multiple charts, keep the Zero-Lag Engine on **Balanced** to ensure NinjaTrader remains highly responsive.

## See Also

- [Logic Footprint](/docs/indicators/logic-footprint) — Order Flow analysis per candle.

- [Logic BigTrades](/docs/indicators/logic-bigtrades) — Large block detection.
