---
style: style.css
theme: ["glacier", "dashboard"]
---

# Filecoin Data Onboarding

State Market Deals Data Onboarding charts from [Filecoin Data Portal open datasets](https://filecoindataportal.xyz/data).


```js
const am = await FileAttachment("./data/daily_metrics.csv").csv({typed: true});
```

<div style="border: 1px solid var(--theme-foreground-faint); position: fixed; top: 14px; right: 14px; padding: 0px; margin: 0px; border-radius: 4px; text-align: right; background-color: var(--theme-background-alt);">

```js
const timeframe = view(Inputs.radio(["All", "Last Year"], {value: "All", label: "Timeframe"}));
```
</div>

```js
const metrics = timeframe === "All" ? am : am.slice(am.length - 365);
```

<br>

### Sector Onboarding

Daily data (PiBs) being onboarded via State Market Deals.

```js
Plot.plot({
  x: {label: "Date"},
  y: {grid: true, label: "PiBs"},
  width,
  color: {
    legend: true
  },
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(metrics, {
      x: "date",
      y: "onboarded_data_pibs",
      stroke: "var(--theme-foreground-fainter)",
      tip: false
    }),
    Plot.lineY(metrics, Plot.windowY(30, {
      x: "date",
      y: "onboarded_data_pibs",
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

### Data On Active Deals

Active data on State Market Deals at a given time.

```js
resize((width) => Plot.plot({
  width,
  x: {label: "Date"},
  y: {grid: true, label: "PiBs"},
  marks: [
    Plot.ruleY([0]),
    Plot.areaY(metrics, {x: "date", y: "data_on_active_deals_pibs", tip: false, fill: "var(--theme-foreground-fainter)"}),
    Plot.lineY(metrics, {x: "date", y: "data_on_active_deals_pibs", tip: true, stroke: "var(--theme-foreground-focus)"}),
  ]
}))
```
</div>

<div>

### Data Delta

Daily change in data on State Market Deals over time.

```js
resize((width) => Plot.plot({
  width,
  x: {label: "Date"},
  y: {grid: true, label: "PiBs / day"},
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(metrics, {x: "date", y: "data_delta_pibs", tip: false, stroke: "var(--theme-foreground-fainter)"}),
    Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "data_delta_pibs", stroke: "var(--theme-foreground-focus)", tip: true})),
  ]
}))
```
</div>
</div>



### Data Onboarding by Region

```js
const drm = await FileAttachment("./data/daily_region_metrics.csv").csv({typed: true});
```

Daily data (TiBs) onboarded by region.

```js
resize((width) => Plot.plot({
  x: {label: "Date"},
  y: {grid: true, label: "PiBs"},
  width,
  color: {
    legend: true,
  },
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(drm, Plot.windowY(30, {
      x: "date",
      y: "onboarded_data_tibs",
      stroke: "region",
      strokeWidth: 2,
      tip: true
    })),
  ]
}))
```

### Data Onboarding by Industry

```js
const dim = await FileAttachment("./data/daily_industry_metrics.csv").csv({typed: true});
```

Daily data (TiBs) onboarded by industry.

```js
resize((width) => Plot.plot({
  x: {label: "Date"},
  y: {grid: true, label: "PiBs"},
  width,
  color: {
    legend: true,
  },
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(dim, Plot.windowY(30, {
      x: "date",
      y: "onboarded_data_tibs",
      stroke: "industry",
      strokeWidth: 2,
      tip: true
    })),
  ]
}))
```
