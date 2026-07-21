---
title: Logic Footprint
description: Advanced Order Flow chart showing Bid/Ask volume, Delta, and profiles inside every single candle.
order: 1
category: indicators
---

# Logic Footprint

> If you haven't installed the Logic Indicators suite yet, please check the [Installation Guide](/docs/installation) first.

The **Logic Footprint** is the core of the Order Flow suite. Instead of looking at a traditional candlestick that hides how trading actually occurred, the Footprint looks *inside* the candle to show you the exact distribution of aggressive market buyers (Ask) versus aggressive market sellers (Bid) at every single price level.

By visualizing the internal auction process, traders can spot institutional absorption, aggressive trapped traders, and true market imbalances in real-time, completely removing the guesswork from price action.

## Core Components

The Logic Footprint is designed around a highly flexible "Flex Grid" system. A single candle can display up to 3 independent data columns side-by-side:

1. **Thin Candle (Spine):** A minimalist representation of the traditional Open/High/Low/Close candlestick, ensuring you never lose track of basic price action.

2. **Data Columns (1, 2, and 3):** You can stack up to three columns per candle. For example, Column 1 can show text for **BidAsk**, Column 2 can draw a **ProfileRight** showing Delta, and Column 3 can show total **Volume**.

3. **Imbalances:** Highlights specific price levels where buyers overwhelmingly overpowered sellers diagonally (or vice-versa).

4. **Point of Control (POC):** Draws a distinct border around the price level with the highest activity (Volume, Delta, or Trades) inside that specific candle.

5. **Zoomed Out View (LOD):** A dynamic Level of Detail system. As you zoom out your chart (squishing the candles together), the Footprint text automatically morphs into a Mini-Volume Profile, and if you zoom out further, it turns back into standard candlesticks to prevent screen clutter.

## Interactive Tools

Logic Footprint is designed to be completely automatic. It does not require manual drawing buttons. Instead, it interacts directly with your mouse wheel:

- **Dynamic Zooming:** Simply scroll your mouse wheel to zoom in and out. The indicator will fluidly transition between full Footprint numbers, visual volume profiles, and zoomed-out standard candles without needing to touch the settings.

## Configuration Settings

### 1. General Settings

- **Tick Multiplier:** Groups price levels together. For example, in the ES (S&P 500), setting this to **4** will group 4 ticks (1 full point) into a single row, drastically reducing noise and making the footprint easier to read.

- **Zero-Lag Engine Mode:** Controls the graphic refresh rate. Options are **Smooth**, **Balanced**, **Max Performance**, or **Disabled** (real-time 60 FPS). Use **Balanced** for optimal performance on heavy charts.

### 2. Column Settings (1, 2, and 3)

Each of the 3 columns has identical, independent settings so you can build your perfect footprint:

- **Enable Column:** Turns the column on or off (Column 1 is always on).

- **Text Value Type:** What numbers to display. Choose between **BidAsk**, **Volume**, **Delta**, **DeltaPct**, **Trades**, **Bid**, **Ask**, or **None**.

- **Cell Type:** How to draw the background shape. **Full** fills the entire cell box. **ProfileLeft** or **ProfileRight** draws horizontal histogram bars inside the candle.

- **Cell Color Type:** Defines how the cell is colored. **HeatmapVolume** colors it based on intensity. **Delta** colors it green/red based on who won that level. **Custom** uses a solid flat color.

- **Cell Opacity:** Makes high-volume nodes darker and low-volume nodes highly transparent.

- **POC Type:** Highlights the maximum node of the candle. Can be based on **Volume** or the **Metric** currently displayed in the column.

### 3. Relative Maximum Value (Scale Mode)

This critical section defines how the indicator calculates the "Intensity" (Heatmap/Opacity) of the colors:

- **Scale Mode (Relative):**

  - **Bar:** Compares the volume against the highest volume *inside that specific candle*.

  - **Visible:** Compares the volume against the highest volume currently visible *on your screen*.

  - **CustomSession:** Compares the volume against the highest volume traded during the defined Custom Session hours.

  - **Manual:** Compares the volume against a fixed number you type below (e.g., 5000 contracts).

### 4. Texts

- **Auto-Contrast:** Automatically flips the text color to **Auto-Contrast Dark** or **Auto-Contrast Light** depending on the background cell color, ensuring numbers are always readable.

- **Abbreviate (k, M):** Shortens large numbers (e.g., 1,500 becomes 1.5k) to keep the footprint narrow and clean.

### 5. Imbalances

- **Enable Ratio Imbalances:** Compares the Bid and Ask diagonally.

- **Imbalance Ratio (x:1):** The multiplier required to trigger an imbalance. Default is **3.0** (meaning 300% more volume on one side).

- **Min Volume (Ratio):** The minimum amount of contracts required to even consider the ratio.

- **Enable Difference Imbalances:** Triggers an imbalance based on pure contract difference (e.g., Ask minus Bid > 100 contracts), ignoring the ratio.

### 6. Heatmaps (Volume, Ask, Bid)

If your Column's **Cell Color Type** is set to a Heatmap, these settings define the 5 color tiers. Level 1 is for the lowest volume (coldest), and Level 5 is for the highest volume (hottest).

### 7. Zoomed Out View (LOD)

- **Footprint to Profile Threshold:** The pixel distance between candles where the indicator will stop rendering text and switch to drawing Mini-Volume Profiles.

- **Profile to Bars Threshold:** The pixel distance where it will stop drawing profiles and switch to simple, zoomed-out candlesticks.

- **Profile Opacity Mode:** How to shade the zoomed-out profiles.

## Best Practices & Tips

- **The Golden Setup:** A very popular setup is turning on 2 columns. Column 1: **Cell Type** set to **Full**, **Value Type** set to **BidAsk**. Column 2: **Cell Type** set to **ProfileRight**, **Value Type** set to **Volume**. This gives you exact numbers on the left and a visual shape on the right.

- **Use the Tick Multiplier:** If you trade Nasdaq (NQ) or Gold (GC), a standard tick-by-tick footprint is too fast and noisy. Set the **Tick Multiplier** to **4** or **10** to group the tape into clear, readable zones.

- **Visible Scaling for Heatmaps:** If you want your heatmaps to highlight the true high-volume nodes of the day, change your **Scale Mode (Relative)** to **Visible** instead of **Bar**. This prevents quiet, low-volume candles from glowing bright red/green.

## See Also

- [Logic Footer](/docs/indicators/logic-footer) — Adds cumulative delta and bar statistics to the bottom of your footprint.

- [Logic Algorithms](/docs/indicators/logic-algorithms) — Automatically points out traps and absorptions inside the footprint.
