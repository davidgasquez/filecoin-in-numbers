---
toc: false
style: style.css
theme: ["glacier", "dashboard"]
---

# Filecoin Sectors

[Sector](https://spec.filecoin.io/systems/filecoin_mining/sector/) level charts. Data is updated daily and comes from the [Filecoin Data Portal open datasets](https://filecoindataportal.xyz/data).


```js
const am = await FileAttachment("./data/daily_metrics.csv").csv({typed: true});
```

<div style="border: 1px solid var(--theme-foreground-faint); position: fixed; top: 14px; right: 14px; padding: 0px; margin: 0px; border-radius: 4px; text-align: right; background-color: var(--theme-background-alt);">

```js
const timeframe = view(Inputs.radio(["All", "Last Year"], {value: "All", label: "Timeframe"}));
```

```js
const sectorMetricType = view(Inputs.radio(["Raw Power", "Quality-Adjusted Power"], {value: "Raw Power", label: "Power Type"}));
```
</div>

```js
const metrics = timeframe === "All" ? am : am.slice(am.length - 365);
```

<br>

### Sector Onboarding

Daily ${sectorMetricType === "Raw Power" ? "raw" : "quality-adjusted"} power (PiBs) being onboarded .

```js
Plot.plot({
  x: {label: "Date"},
  y: {grid: true, label: sectorMetricType === "Raw Power" ? "Raw Power (PiBs)" : "Quality-Adjusted Power (PiBs)"},
  width,
  color: {
    legend: true,
    tickFormat: (d) => d === "sector_onboarding_raw_power_pibs" ? "Raw Power" : "Quality-Adjusted Power"
  },
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(metrics, {
      x: "date",
      y: sectorMetricType === "Raw Power" ? "sector_onboarding_raw_power_pibs" : "sector_onboarding_quality_adjusted_power_pibs",
      stroke: "var(--theme-foreground-fainter)",
      tip: false
    }),
    Plot.lineY(metrics, Plot.windowY(30, {
      x: "date",
      y: sectorMetricType === "Raw Power" ? "sector_onboarding_raw_power_pibs" : "sector_onboarding_quality_adjusted_power_pibs",
      stroke: "var(--theme-foreground-focus)",
      tip: true
    })),
    Plot.text(["⬣ Nexus Data Labs"], {
      fontSize: 18,
      frameAnchor: "top-right",
      dy: -14,
      opacity: 0.2
    })
  ]
})
```

<div class="grid grid-cols-2">

<div>

### Sector Snap

How much ${sectorMetricType === "Raw Power" ? "raw" : "quality-adjusted"} power (PiBs) is being snapped.

```js
resize((width) => Plot.plot({
  x: {label: "Date"},
  y: {grid: true, label: sectorMetricType === "Raw Power" ? "Raw Power (PiBs)" : "Quality-Adjusted Power (PiBs)"},
  width,
  color: {
    legend: true,
    tickFormat: (d) => d === "sector_snap_raw_power_pibs" ? "Raw Power" : "Quality-Adjusted Power"
  },
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(metrics, {
      x: "date",
      y: sectorMetricType === "Raw Power" ? "sector_snap_raw_power_pibs" : "sector_snap_quality_adjusted_power_pibs",
      stroke: "var(--theme-foreground-fainter)",
      tip: false
    }),
    Plot.lineY(metrics, Plot.windowY(30, {
      x: "date",
      y: sectorMetricType === "Raw Power" ? "sector_snap_raw_power_pibs" : "sector_snap_quality_adjusted_power_pibs",
      stroke: "var(--theme-foreground-focus)",
      tip: true
    })),
    Plot.text(["⬣ Nexus Data Labs"], {
      fontSize: 18,
      frameAnchor: "top-right",
      dy: -14,
      opacity: 0.2
    })
  ]
}))
```
</div>

<div>

### Sector Extended

Daily ${sectorMetricType === "Raw Power" ? "raw" : "quality-adjusted"} power (PiBs) being extended.

```js
resize((width) => Plot.plot({
  x: {label: "Date"},
  y: {grid: true, label: sectorMetricType === "Raw Power" ? "Raw Power (PiBs)" : "Quality-Adjusted Power (PiBs)"},
  width,
  color: {
    legend: true,
    tickFormat: (d) => d === "sector_extended_raw_power_pibs" ? "Raw Power" : "Quality-Adjusted Power"
  },
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(metrics, {
      x: "date",
      y: sectorMetricType === "Raw Power" ? "sector_extended_raw_power_pibs" : "sector_extended_quality_adjusted_power_pibs",
      stroke: "var(--theme-foreground-fainter)",
      tip: false
    }),
    Plot.lineY(metrics, Plot.windowY(30, {
      x: "date",
      y: sectorMetricType === "Raw Power" ? "sector_extended_raw_power_pibs" : "sector_extended_quality_adjusted_power_pibs",
      stroke: "var(--theme-foreground-focus)",
      tip: true
    })),
    Plot.text(["⬣ Nexus Data Labs"], {
      fontSize: 18,
      frameAnchor: "top-right",
      dy: -14,
      opacity: 0.2
    })
  ]
}))
```
</div>

</div>
