---
title: Installation
description: Step-by-step guide to install Logic Indicators on NinjaTrader 8.
order: 2
category: intro
---

# Installation

Follow these steps to install Logic Indicators on NinjaTrader 8. The whole process takes about 5 minutes.

## Requirements

- **NinjaTrader 8** installed (latest version recommended).
- **Windows 10 or 11.**
- An active **Logic Indicators** subscription.
- A **Logic Indicators** account with at least one product assigned.

## Installation steps

1. **Download the file.** Go to your [Members area](/dashboard) and click the **Descargar** button next to the product you want to install. The file is a `.zip` archive — do not unzip it.

2. **Import into NinjaTrader 8.** Open NinjaTrader 8, go to the **Tools** tab, click **Import**, and select **Ninja Script Add-on**. Choose the `.zip` file you just downloaded.

3. **Restart NinjaTrader 8.** This step is **mandatory**. NinjaTrader only registers the indicators on a fresh start. If you skip the restart, the indicators will not appear in the indicator list and any chart you try to add them to will throw an error.

4. **Load the indicators on a chart.** Once NinjaTrader has restarted, open a chart, right-click on it, select **Indicators**, search for the Logic indicator you want (e.g. `Logic Footprint`, `Logic Profile`), and add it to the chart.

If the indicators are listed and load without errors, the installation is done.

## If the indicators stop working

The Logic indicators are licensed to a specific Machine ID (called **MatchingID** inside NinjaTrader). This ID can change without warning if you:

- Reformat your computer.
- Move to a new computer.
- Make a major Windows change (new motherboard, hardware swap, big Windows update).
- Reinstall NinjaTrader from scratch.

When that happens, NinjaTrader's MatchingID no longer matches the one we have on file in your account, and the indicators will refuse to load. To fix it:

1. **Find the MatchingID inside NinjaTrader 8.** It's usually shown under **Help → About** or in the indicator configuration panel.
2. **Open your [Members area](/dashboard)** and compare it with the **NinjaTrader ID** shown in the top-left card.
3. **If they don't match**, copy the value from NinjaTrader into the **NinjaTrader ID** field on the dashboard and save. The dashboard is the source of truth — once both sides match, the indicators will work again on the next NinjaTrader restart.

> **Tip:** if you see a `Matching ID` warning inside NinjaTrader every time you add a Logic indicator, that's the symptom. Just sync the IDs as described above.

## Need more help?

- See the [Troubleshooting](/dashboard/docs/troubleshooting) guide for other common issues.
- [Go to your Members area](/dashboard) to download indicators or manage your subscription.
- [Contact support](https://wa.me/573113006826) if nothing in this guide works for you.
