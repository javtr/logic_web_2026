---
title: Getting Started
description: Initial guide to get your Logic Indicators suite up and running in NinjaTrader 8.
order: 1
category: intro
---

# Getting Started

Welcome to the **Logic Indicators** suite. This guide walks you through the quickest path to set up your account, download your products, and have your first Order Flow charts operating in NinjaTrader 8 in under 10 minutes.

---

## Prerequisites

Before starting the installation, ensure you have:

1. **NinjaTrader 8** installed (the latest official 64-bit release is strongly recommended).
2. **Live or simulated futures market data feed** (e.g., NinjaTrader Continuum/CQG, Rithmic, Kinetick, etc.). Order Flow and depth indicators require tick-level market data to calculate volumes and deltas accurately.
3. **Windows 10 or 11 (64-bit)** with administrator permissions on your machine.

---

## Account Status and Licensing

Upon receiving your welcome email and logging into your [Members Area](/dashboard), your account is already fully configured and your purchased products are active and licensed to your NinjaTrader 8 installation with the Machine ID provided during registration.

> **Switched PCs or Formatted Windows?**  
> If you change computers or reinstall Windows in the future, your Machine ID will change. You can update it anytime directly by editing the **NinjaTrader ID** field on the top-left card in your [Dashboard](/dashboard) without waiting for technical support.

---

## Your 4-Step Fast Track

### Step 1: Download Your Product
* In your [Members Area](/dashboard), find your product card and click the **Download** button.
* The file will download as a `.zip` archive.
* **Important:** **Do not unzip the file.** NinjaTrader 8 requires the raw `.zip` archive to process the import.

### Step 2: Install or Update in NinjaTrader 8
* **If it's your first time installing:** In NinjaTrader 8, go to `Tools → Import → NinjaScript Add-On...`, select the downloaded `.zip` file, and restart the platform once finished.
* **If you are updating an existing version:** You must first uninstall previous assemblies starting with `LOF` under `Tools → Remove NinjaScript Assembly...` and restart NinjaTrader 8 before importing the new archive.
* For the full walkthrough with screenshots, see the [Installation and Update Guide](/dashboard/docs/installation).

### Step 3: Load Indicators on a Chart
Once NinjaTrader 8 has restarted:
1. Open any price chart (e.g., ES or NQ).
2. Right-click on the chart and choose **Indicators** (or press `Ctrl + I`).
3. In the alphabetical list, locate the **Logic Indicators** category or names prefixed with `Logic...` (such as `Logic Footprint`, `Logic Profile`, `Logic Depth Chart`, etc.).
4. Select the indicator, click **Add**, calibrate your initial settings, and click **OK**.

### Step 4: Apply Presets and Templates
To avoid setting up colors, fonts, and filters from scratch:
* Download our pre-built visual templates from the [Presets](/resources/presets) section.
* You will find optimized setups for Scalping, Day Trading, high-contrast dark modes, and lightweight resource configurations.
* Learn how to import them in the [General Settings Guide](/dashboard/docs/configuration).

---

## Next Steps

* **[Installation and Update Guide](/dashboard/docs/installation):** Complete walkthrough with best practices for smooth updates.
* **[General Settings](/dashboard/docs/configuration):** Learn how to utilize the `LOF_Configuration` master toolbar and manage templates.
* **[Indicator Manuals](/dashboard/docs/indicators/logic-footprint):** Explore parameter-by-parameter explanations for every indicator in the suite.
* **[Troubleshooting](/dashboard/docs/troubleshooting):** Fast answers for licensing notices, sluggish charts, or migrating to a new PC.
