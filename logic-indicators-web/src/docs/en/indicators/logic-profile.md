---
title: Logic Profile
description: Advanced Volume Profile, Delta Profile, and TPO (Market Profile) generator with session and custom periods.
order: 3
category: indicators
---

# Logic Profile

> If you haven't installed the Logic Indicators suite yet, please check the [Installation Guide](/docs/installation) first.

The **Logic Profile** indicator is an institutional-grade charting tool that maps traded volume, delta, and time (TPO) across specific price levels over a given period. Instead of just seeing what happened inside a single candle, you can view the macroscopic auction process over an entire session, week, or custom-drawn area.

By identifying the Point of Control (POC), Value Area (VA), and Initial Balance (IB), traders can pinpoint exactly where the market found fair value and where institutional participants are likely to defend their positions in the future.

## Core Components

Logic Profile uses a powerful multi-column system. Each profile can display up to 2 distinct columns side-by-side (e.g., a TPO profile on the left and a Volume Profile on the right). 

1. **Volume & Delta Profiles:** Maps the total volume or net delta traded at each price. Can be drawn as traditional horizontal **Bars** or as a solid, smooth **Geometry** shape.

2. **TPO (Market Profile):** "Time Price Opportunity". Maps how much *time* the market spent at a price level. It can be visualized using classic **Letters**, **Blocks**, or both.

3. **Value Area (VAH / VAL):** Highlights the price range where a specified percentage (usually 70%) of the volume or time was concentrated.

4. **Point of Control (POC):** The single price level with the absolute highest volume or time spent.

5. **Initial Balance (IB):** A vertical line marking the price range established during the first X minutes of the session (e.g., the first 60 minutes).

6. **High/Low Extremes:** Marks the absolute top and bottom of the profile session.

## Interactive Tools (Toolbar & Mouse)

Logic Profile is highly interactive. You can manipulate profiles directly on your chart:

- **Draw (Toolbar):** Click to manually draw a custom profile over any specific price consolidation or swing.

- **Edit (Toolbar):** Enables Edit Mode. You can drag the edges of any profile to expand/shrink its time range, or click the 'X' to delete it.

- **Right-Click Context Menu:** Right-click the background of *any* profile to open a powerful hidden menu:

  - **Merge Left / Right:** Fuses the selected profile with the adjacent one, recalculating all volume and TPOs into a single massive profile.

  - **TPO Split Mode:** Instantly separates a TPO profile into individual 30-minute brackets to see the intraday structure clearly.

  - **Extend Lines (Naked / Infinity):** Automatically shoots the POC, Value Area, or High/Low lines into the future. **Naked** mode will automatically cut the line the exact moment future price touches (mitigates) it.

## Configuration Settings

### 1. General & Profile Settings

- **Session Mode:** Choose **Continuo** to use standard NinjaTrader session breaks, or **Custom** to define your own daily start and end times.

- **Profile Period:** Defines the lifespan of the automatic profiles. Options are **Daily**, **Weekly**, or **Monthly**.

- **Historical Load Speed:** To optimize loading times on large charts, you can group ticks. *Note: Fast modes will disable precise Bid/Ask Delta calculations.*

- **Merge Overlapping Profiles:** If two custom profiles overlap in time, they will automatically fuse into one.

### 2. Multipliers

- **Tick Multiplier:** Groups multiple ticks into a single row to make the profile smoother and reduce visual noise (e.g., set to 4 on ES, or 10 on NQ).

### 3. Column 1 & Column 2 General

You have two independent columns to build your profile structure.

- **Profile Type:** Select what data the column holds: **Volume**, **Delta**, **TPO**, **VolumeAndDelta**, etc.

- **Column Width & Fill Percentage:** Adjusts how wide the column is on the screen and how much internal space the bars/letters are allowed to occupy.

- **Highlight Open/Close:** Places visual markers at the exact price where the profile session opened and closed.

### 4. Sub-Components (VP, Delta, TPO, VA, POC, Initial Balance)

For each column, you can independently configure:

- **Draw Style:** Switch between **Bars** (histogram) or **Geometry** (smooth polygon).

- **Alignment:** Anchor the profile to the **Left** or **Right**.

- **Colors & Opacity:** Full control over Fill opacity, Border opacity, and Heatmap colors.

- **Stacked Mode (VP):** If enabled, Volume Profiles will show Ask and Bid volume separated by colors within the same horizontal bar.

- **Lines & Extensions:** For the VA, POC, and High/Low, you can set the line style (Solid, Dash), thickness, and whether the line extends to the edge of the **Column**, the whole **Profile**, or the **NextProfile**.

- **Initial Balance:** Set the duration (e.g., 60 minutes) and the offset of the vertical IB line.

## Best Practices & Tips

- **The Naked POC Setup:** Use the Right-Click menu to set a session's POC to **Naked**. This will draw a line into the future that acts as a powerful magnetic target for the next day. The line will automatically delete itself the moment price touches it.

- **TPO Split for Context:** If a Daily TPO profile looks like a messy blob, Right-Click it and select **Full Split**. This breaks the day down into 30-minute letter brackets, allowing you to see exactly when and where the institutional shifts occurred.

- **Dual Column Mastery:** Use Column 1 as a **TPO** profile (aligned Left) to understand market structure and time, and use Column 2 as a **Volume** profile (aligned Right, overlapping) to see where the heavy execution took place.

## See Also

- [Logic Footprint](/docs/indicators/logic-footprint) — Zoom in to see the exact volume distribution inside the individual candles.

- [Logic Analytics](/docs/indicators/logic-analytics) — View mathematical and standard deviation breakdowns of custom areas.
