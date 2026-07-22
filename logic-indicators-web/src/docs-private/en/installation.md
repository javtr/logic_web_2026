---
title: Installation
description: Step-by-step guide to install Logic Indicators on NinjaTrader 8.
order: 2
category: intro
---

# Installation

This guide describes the installation procedure for Logic Indicators on NinjaTrader 8. The full process takes approximately five minutes.

## Requirements

- **NinjaTrader 8** installed (latest stable version recommended).
- **Windows 10 or 11** with administrator privileges.
- An active **Logic Indicators** subscription.
- A **Logic Indicators** account with at least one product assigned.

## Installation steps

1. **Download the file.** Go to your [Members area](/dashboard) and click the **Descargar** button next to the product you want to install. The file is a `.zip` archive and must not be unzipped.

2. **Import the file into NinjaTrader 8.** Open NinjaTrader 8, navigate to the **Tools** tab, select **Import**, and then select **Ninja Script Add-on**. Choose the `.zip` file downloaded in the previous step.

3. **Restart NinjaTrader 8.** This step is **mandatory**. NinjaTrader only registers the indicators after a full application restart. If you skip this step, the indicators will not appear in the indicator list and any attempt to add them to a chart will produce an error.

4. **Load the indicators on a chart.** Once NinjaTrader has restarted, open a chart, right-click on it, select **Indicators**, locate the Logic indicator you want to add (for example, `Logic Footprint` or `Logic Profile`), and confirm.

If the indicators appear in the list and load correctly, the installation is complete.

## If the indicators stop working

The Logic indicators are licensed to a specific Machine ID (called **MachineID** inside NinjaTrader). This identifier may change without notice in the following situations:

- The workstation is reformatted.
- The user migrates to a new workstation.
- Major operating system changes occur (motherboard replacement, hardware swap, or significant Windows updates).
- NinjaTrader is reinstalled from scratch.

When this happens, NinjaTrader's MachineID no longer matches the one registered to your account, and the indicators refuse to load. To resolve the issue:

1. **Locate the MachineID inside NinjaTrader 8.** This value is usually found under **Help → About** or in the indicator configuration panel.
2. **Open your [Members area](/dashboard)** and compare the value with the **NinjaTrader ID** field shown in the top-left card.
3. **If the values do not match**, copy the value shown in NinjaTrader and paste it into the **NinjaTrader ID** field on the dashboard, then save. The dashboard is the source of truth: once both values match, the indicators will work again after the next NinjaTrader restart.

## Additional support

- For further issues, see the [Troubleshooting](/dashboard/docs/troubleshooting) guide.
- [Go to your Members area](/dashboard) to download indicators or manage your subscription.
- If the problem persists, [contact our support team](https://wa.me/573113006826).
