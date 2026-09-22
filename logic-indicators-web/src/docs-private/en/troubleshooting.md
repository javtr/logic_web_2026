---
title: Troubleshooting
description: Diagnostic and quick-resolution guide for common NinjaTrader 8 issues.
order: 1
category: troubleshooting
---

# Troubleshooting

This guide provides direct, actionable solutions to the most common technical questions and issues reported by traders using the **Logic Indicators** suite in NinjaTrader 8.

---

## 1. Indicators Do Not Appear in the Indicator List (Ctrl + I)

If you open your chart, press `Ctrl + I`, and cannot find the **Logic Indicators** category or tools prefixed with `Logic...`, check the following causes:

### Cause A: NinjaTrader 8 was not restarted after import
* **Solution:** NinjaTrader 8 compiles and registers external assemblies only during startup. Close the application completely and launch it again.

### Cause B: Conflict with an earlier version of the suite
* **Solution:** If you previously had an earlier version installed, you must remove it before importing the new one.  
  1. Go to **Tools → Remove NinjaScript Assembly...**.  
  2. Select and remove all files starting with the letters **LOF** (e.g., `LOF_FullPack`, `LOF_BasicPack`, `LOF_DepthPack`, etc.).  
  3. **Restart NinjaTrader 8**.  
  4. Re-import your `.zip` archive via **Tools → Import → NinjaScript Add-On...**.  
  5. Restart NinjaTrader 8 once more.

### Cause C: Compilation errors in other NinjaScript files
* If you have broken third-party scripts or custom code with syntax errors, NinjaTrader disables global script compilation for the entire platform.
* **How to check:**  
  1. In the NinjaTrader 8 Control Center, go to **New → NinjaScript Editor**.  
  2. In the editor window, press **F5** (or right-click and choose *Compile*).  
  3. If a box appears at the bottom listing compilation errors in external scripts, you must resolve or remove those broken files so NinjaTrader can compile and activate our suite.

---

## 2. Licensing Notice or Indicator Does Not Render Data

If you can add the indicator to your chart, but it shows an invalid license alert or renders blank:

### Cause A: Machine ID does not match your account record
* **Solution:**
  1. In NinjaTrader 8, open the top menu: **Help → About**.
  2. Carefully copy the exact alphanumeric string in the **Machine ID** field.
  3. Open your [Members Area](/dashboard), locate the **NinjaTrader ID** card on the top left, paste the copied value, and save.
  4. Close and reopen NinjaTrader 8 so it validates against the updated record.

### Cause B: No internet connection when launching NinjaTrader 8
* **Solution:** License authorization requires an active internet connection when the indicator loads for the first time in a session. Verify that your firewall or antivirus is not blocking outbound connections from NinjaTrader 8.

### Cause C: Your active product does not include that specific indicator
* **Solution:** Check your [Members Area](/dashboard) to see which tools are included in your active plan. For instance, the basic tier does not include deep order book tools (`Logic Depth Chart` and `Logic Depth Live`), which belong to the *Depth Pack* or *Full Suite*.

---

## 3. Error Importing the .zip Archive into NinjaTrader 8

If NinjaTrader displays an error when trying to import via `Tools → Import → NinjaScript Add-On...`:

### Cause A: The file was automatically extracted by your browser
* Certain web browsers or download managers automatically unpack compressed archives upon completion.
* **Solution:** NinjaTrader 8 requires the raw, uncompressed `.zip` file intact. Re-download from the [Dashboard](/dashboard), ensuring it saves as a `.zip` archive.

### Cause B: Corrupt or incomplete download
* **Solution:** If your internet connection dropped momentarily during download, the file may be corrupted. Delete the previous file and download a fresh copy from your dashboard.

---

## 4. Sluggish Charts or Frame Rate (FPS) Drops

If you notice chart movement becoming heavy or sluggish:

1. **Adjust `Days to load` in your Data Series:**  
   Press `Ctrl + F` on your chart. For intraday volume, tick, or second charts, set **Days to load** between **3 and 5 days**. Loading 20 or 30 days of historical tick data consumes gigabytes of unnecessary RAM.
2. **Set `Zero-Lag Engine Mode` to `Balanced` or `MaxPerformance`:**  
   In indicator properties (`Ctrl + I`), change the performance mode to **Balanced** or **MaxPerformance** to reduce CPU demand.
3. **Enable `Merge Nearby Bubbles` in BigTrades and Depth Live:**  
   Always keep this setting active to cluster contiguous trades into single magnetic bubbles, preventing screen clutter and lag during high-impact news releases.
4. **Use `Min Volume Filter`:**  
   Filter out small orders (e.g., under 20 or 50 contracts depending on your instrument) so your GPU does not expend resources drawing insignificant retail noise.

---

## 5. Formatted Your PC or Switched to a New Computer?

You do not need to wait for technical support:
1. Install NinjaTrader 8 on your new computer or fresh Windows setup.
2. Open **Help → About** and copy your new **Machine ID**.
3. Sign in to your account, open the [Dashboard](/dashboard), and update your **NinjaTrader ID** field with the new key.
4. Download your product package and install as usual.

---

## 6. Direct Support Channels

If your question is not resolved by the steps above, our technical support team is ready to assist you:
* **Official WhatsApp Support:** [Message us directly here](https://wa.me/573113006826)
* **Contact Form:** [Contact Page](/contact)
