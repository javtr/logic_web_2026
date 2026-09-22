---
title: General Settings
description: Master control toolbar, preset management, and workspace optimization in NinjaTrader 8.
order: 1
category: configuration
---

# General Settings

This guide details shared suite controls, template (*Preset*) management, and best practices to optimize performance and visual clarity across the **Logic Indicators** suite in NinjaTrader 8.

---

## 1. Master Control Toolbar (`LOF_Configuration`)

The suite includes a central orchestrator named **`LOF_Configuration`** that adds a sleek, minimal toolbar across the top edge of your chart.

### Core Capabilities:
* **`[HUD]` Button:** Instantly displays or hides on-chart touch calibration panels (available in tools like `Logic Depth Chart` and `Logic Depth Live`) to adjust volume filters on the fly without opening properties menus.
* **`[Reset]` Button:** Clears local accumulated order memory and restarts visual rendering immediately if you experience data stalls or broker feed disconnects.
* **Active Indicator Monitoring:** Every suite tool running on your chart displays a small colored badge in this bar, allowing you to confirm at a glance which indicators are processing live data on that window.

---

## 2. Template and Preset Management

To avoid configuring colors, filters, and font sizes each time you create a new chart, NinjaTrader 8 allows you to save and apply templates (*Presets*).

### How to save your custom settings:
1. With the indicator loaded on your chart, press `Ctrl + I` (or right-click → **Indicators**).
2. Select the indicator in the lower-left active list and calibrate your parameters.
3. In the lower-right corner of the properties window, click the **Template** button.
4. Select **Save**:
   * If saved as **Default**, each time you add this indicator to any future chart, it will automatically load with these settings.
   * If you give it a unique name (e.g., `ES_Scalping` or `NQ_Dark`), you can load it at any time.

### How to load official Logic Indicators Presets:
1. Visit the [Presets Section](/resources/presets) on the website and download your desired preset file.
2. Copy the downloaded file into your NinjaTrader 8 templates folder:  
   `Documents\NinjaTrader 8\templates\Indicator\`
3. In NinjaTrader 8, open the indicator properties window (`Ctrl + I`), click **Template → Load**, and choose the downloaded file.

---

## 3. Shared Global Parameters Across the Suite

The following parameters appear across most indicators in the suite and follow identical functionality:

### `Zero-Lag Engine Mode` (Performance Control)
Adjusts the Zero-Lag visual refresh mode to balance high-speed graphical fluidity with your system resources:
* **`Balanced` *(Default Recommendation)*:** Optimal balance between continuous visual motion and resource efficiency; ideal for daily trading across multiple open charts.
* **`Smooth`:** High visual fluidity designed for workstations with powerful processors.
* **`MaxPerformance`:** Maximum resource-saving mode; engineered for laptops or high-volatility market events.
* **`Disabled`:** Uncapped continuous 60 FPS real-time visualization for high-performance trading setups.

### `Layer Mode` (Visual Layer Stacking)
Controls the Z-order plane where indicator drawings sit relative to price candles and drawings:
* **`BehindPrice` *(Recommended)*:** Renders heatmaps, profiles, and backgrounds behind price bars. Ensures candles, footprint values, and technical support lines remain 100% readable in the foreground.
* **`Normal`:** Draws at the same plane as price bars.
* **`TopMost`:** Overlays all drawings on top of price bars and secondary tools.

### `Ticks per Level` (Tick Consolidation)
Combines multiple price ticks into a single visual row to adapt your analysis to market volatility:
* **`1` (No grouping):** Recommended for dense, tight-spread markets like **ES (S&P 500)**, **ZN (Treasury Notes)**, or **FDAX**.
* **`2` to `4` ticks:** Recommended for fast, volatile markets like **NQ (Nasdaq)**, **CL (Crude Oil)**, or **Bitcoin**, preventing numerical rows from becoming microscopic and fragmented.

---

## 4. Workspace Best Practices in NinjaTrader 8

To ensure NinjaTrader 8 operates at peak responsiveness without lag during active trading hours:

1. **Limit historical load days (`Days to load`):**  
   On your chart, press `Ctrl + F` to open the **Data Series** window. For intraday trading, set **Days to load** to **3 to 5 days**. Loading 30 or 60 days of historical tick data forces NinjaTrader to process millions of ticks into RAM that offer no practical value for intraday execution.
2. **Organize your workspaces:**  
   Save your layout under **Workspaces → Save Workspace As...**. Avoid running more than 4 to 6 charts with heavy Order Flow tools on a single workspace if your machine has 8 GB or 16 GB of RAM.
3. **Close minimized charts during market hours:**  
   Minimized chart windows continue processing live incoming data ticks in the background, consuming CPU cycles.

---

## Next Steps
* Check parameter-by-parameter details in our **[Indicator Manuals](/dashboard/docs/indicators/logic-footprint)**.
* If you experience licensing alerts or unexpected behavior, refer to the **[Troubleshooting Guide](/dashboard/docs/troubleshooting)**.
