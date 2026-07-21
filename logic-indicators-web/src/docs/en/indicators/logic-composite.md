---
title: Logic Composite
description: Macro-level Volume and TPO Profile tool. Draw manual profiles or anchor massive historical data blocks to the screen edge.
order: 4
category: indicators
---

# Logic Composite

> If you haven't installed the Logic Indicators suite yet, please check the [Installation Guide](/docs/installation) first.

The **Logic Composite** indicator is designed for macro-structural analysis. While the standard Logic Profile is perfect for session-by-session breakdowns, the Composite is built to analyze massive chunks of historical data or highly specific, manually drawn areas of consolidation.

Traders use the Logic Composite to build "Composite Profiles" that span multiple days, weeks, or even months, pinning them to the side of the screen to identify major historical support and resistance zones that standard intraday profiles simply cannot see.

## Core Components

The Composite engine shares the powerful dual-column architecture of the standard Logic Profile, but alters how the data is framed and anchored to the screen:

1. **Macro Data Columns:** Displays Volume, Delta, or TPO (Market Profile) data. Instead of attaching to specific candles, it spans a massive block of the chart.

2. **Fixed Screen Anchors:** You can lock the profile to the **Left** or **Right** edge of your screen so it stays visible while you scroll through the chart.

3. **Value Area (VA) & POC:** Calculates the macro Point of Control and Value Area. Because it analyzes larger datasets, these lines act as major historical boundaries.

4. **Metrics Panel:** An optional floating text box that summarizes the total Volume, Delta, and Range of the entire composite structure.

## Interactive Tools (Toolbar & Mouse)

Logic Composite introduces an exclusive manual drawing system, allowing you to treat profiles like drawing tools (similar to a Fibonacci retracement):

- **Draw (Toolbar):** Click this button, then click and drag horizontally on your chart to trace a custom profile over a specific price swing or consolidation zone. The profile will instantly calculate the volume inside that box.

- **Edit (Toolbar):** Enables Edit Mode. You can click and drag the left or right edges of any manually drawn profile to adjust its time span. Click the floating red 'X' above the profile to delete it.

- **Reset (Toolbar):** Deletes all manual drawings and restores the default automatic profiles.

## Configuration Settings

### 1. General Settings

- **Zero-Lag Engine Mode:** Controls the rendering speed to optimize CPU usage when calculating massive historical profiles. Use **Balanced** or **Max Performance** if you are calculating months of data.

- **Layer Mode & Priority:** Defines if the composite sits behind the price candles, in front of them, or on top of everything (**TopMost**).

### 2. Composite Settings (The Core Engine)

This is the most important section, defining *what* data the profile analyzes:

- **Range Mode:** 

  - **VisibleBars:** Dynamically calculates a profile using ONLY the candles currently visible on your screen. It morphs as you scroll.

  - **AllLoadedBars:** Calculates a massive profile using every single candle loaded on the chart.

  - **DaysBack / WeeksBack / MonthsBack:** Generates a profile spanning the last X periods.

  - **ManualDraw:** Turns off automatic profiles entirely and only calculates profiles you draw by hand using the Toolbar.

- **Periods Back:** Works in tandem with the Days/Weeks/Months setting (e.g., set to 5 Days Back).

- **Total Width & Margin (Pixels):** Sets exactly how wide the fixed profile should be on your screen, and how far away from the edge it should hover.

- **Alignment:** Locks the composite to the **Left** or **Right** side of your monitor.

### 3. Multipliers & Compression

- **Tick Multiplier:** Compresses the data. For macroscopic profiles (e.g., 3 months of ES data), a multiplier of 10 or 20 is highly recommended to smooth out the shape and prevent CPU overload.

### 4. C1 & C2 General (Column Setup)

Just like the Logic Profile, you have two independent columns:

- **Profile Type:** Choose between **Volume**, **Delta**, **TPO**, **VolumeAndDelta**, etc.

- **Column Width & Fill Percentage:** Adjusts the thickness of the column on your screen.

- **Highlight Open/Close:** Places visual markers at the opening and closing prices of the composite range.

### 5. Sub-Components (VP, Delta, TPO, VA, POC, Frame)

For each column, you can configure the internal drawing logic:

- **Draw Style:** Choose between traditional **Bars** or smooth **Geometry** polygons.

- **Alignment:** You can flip the profile (e.g., have the Volume bars grow from Right to Left to point towards the price).

- **Lines & Extensions (VA & POC):** You can set the POC and VA lines to extend to the edge of the **Column**, span the entire **CompositeBox**, or shoot all the way across to the **ScreenLeft**.

- **Frame & Background:** Draws a solid, semi-transparent box behind the composite so it doesn't get lost visually if it overlaps with price candles.

### 6. Metrics

- **Enable Metrics:** Shows a text block detailing the exact stats of the macro profile.

- **Block Position:** Set the text block to the **Top** or **Bottom** of the composite structure.

- **Show...:** Individually toggle metrics like Total Volume, Delta, Range, Max Delta, and specific POC/VAH prices.

## Best Practices & Tips

- **The Dynamic Visible Profile:** Set your *Range Mode* to **VisibleBars**, align the composite to the **Left**, and set the *Frame Background* opacity to 10%. As you scroll left and right through your chart, the profile will update instantly, giving you a perfect read of the current structure in view.

- **Use Manual Mode for Swing Analysis:** Change the *Range Mode* to **ManualDraw**. Whenever the market enters a tight range or consolidation, click **Draw** on the toolbar and drag a box over it. You will instantly see exactly where the heavy volume (the POC) is trapped inside that box, predicting where the breakout might originate.

- **Heavy Data Optimization:** If you are using **AllLoadedBars** on a 1-Minute chart with 100 days of history, increase your **Tick Multiplier** to 10. This compresses the data and keeps NinjaTrader running flawlessly.

## See Also

- [Logic Profile](/docs/indicators/logic-profile) — The standard session-by-session profile generator.

- [Logic Footprint](/docs/indicators/logic-footprint) — Zoom in to see the exact volume distribution inside the individual candles.
