---
toc: false
---

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 2rem 0 2.4rem;
  text-wrap: balance;
  text-align: center;
}

.hero h1 {
  margin: 1rem 0;
  max-width: none;
  font-size: 12vw;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(30deg, var(--theme-foreground-focus), currentColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h2 {
  margin: 0;
  max-width: 34em;
  font-size: 20px;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-muted);
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 68px;
  }
}

</style>

<div class="hero">
  <h1>Filecoin In Numbers</h1>
  <h2>A high level view into Filecoin Network core metrics.</h2>
  <h2>Explore the <a href="https://github.com/davidgasquez/filecoin-in-numbers">code</a> or <a href="https://github.com/davidgasquez/filecoin-in-numbers/issues">open an issue</a> on GitHub.</h2>
</div>

<div style="display: flex; justify-content: center">
  <a href="#data-onboarding">Data Onboarding</a> &nbsp; • &nbsp;
  <a href="#users">Users</a> &nbsp; • &nbsp;
  <a href="#power">Power</a> &nbsp; • &nbsp;
  <a href="#sectors">Sectors</a> &nbsp; • &nbsp;
  <a href="#economics">Economics</a> &nbsp; • &nbsp;
  <a href="#gas">Gas</a> &nbsp; • &nbsp;
  <a href="#developer-activity">Developer Activity</a>
</div>

```js
const am = await FileAttachment("./data/daily_metrics.csv").csv({typed: true});
```

<div style="display: flex; justify-content: flex-end;">

```js
const timeframe = view(Inputs.radio(["All", "Last Year"], {value: "All"}));
```

</div>

```js
const metrics = timeframe === "All" ? am : am.slice(am.length - 365);
```

```js
const data_flow = ["onboarded_data_pibs", "ended_data_pibs"].flatMap((metric) => metrics.map(({date, [metric]: value}) => ({date, metric, value})));
```

## Data Onboarding

<div class="card">

  ```js
  resize((width) => Plot.plot({
    title: "Data Flow",
    subtitle: "How much data (PiBs) is being onboarded and offboarded on State Market Deals.",
    caption: "Displaying 30-day moving average for State Market Deals data.",
    x: {label: "Date"},
    y: {grid: true, label: "PiBs"},
    width,
    color: {
      range: ["var(--theme-foreground-focus)", "#57a773"],
      legend: true,
      tickFormat: (d) => d === "onboarded_data_pibs" ? "Onboarded" : "Ended"
    },
    marks: [
      Plot.ruleY([0]),
      Plot.lineY(data_flow, {
        x: "date",
        y: "value",
        stroke: "var(--theme-foreground-fainter)",
      }),
      Plot.lineY(data_flow, Plot.windowY(30, {
        x: "date",
        y: "value",
        stroke: "metric",
        strokeWidth: 2,
        tip: true
      })),
    ]
  }))
  ```

</div>

<div class="grid grid-cols-2">
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Data On Active Deals",
      subtitle: "How much data was active on State Market Deals on the network at a given time.",
      caption: "Only displaying data from State Market Deals.",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "PiBs"},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "data_on_active_deals_pibs", tip: false, fill: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, {x: "date", y: "data_on_active_deals_pibs", tip: true, stroke: "var(--theme-foreground-focus)"}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Data Delta",
      subtitle: "Daily change in data on State Market Deals over time.",
      caption: "Displaying 30-day moving average for State Market Deals data.",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "PiBs / day"},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(metrics, {x: "date", y: "data_delta_pibs", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "data_delta_pibs", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
</div>

## Users

<div class="grid grid-cols-2">
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Dealmaking Clients",
      subtitle: "Clients making State Market Deals on the network.",
      caption: "Displaying 30-day moving average for State Market Deals data.",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Clients"},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(metrics, {x: "date", y: "unique_deal_making_clients", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "unique_deal_making_clients", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Dealmaking Providers",
      subtitle: "Providers making State Market Deals on the network.",
      caption: "Displaying 30-day moving average for State Market Deals data.",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Providers"},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(metrics, {x: "date", y: "unique_deal_making_providers", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "unique_deal_making_providers", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Clients With Active Deals",
      subtitle: "How many clients have active (State Market) deals on the network at a given time.",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Clients"},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "clients_with_active_deals", tip: false, fill: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, {x: "date", y: "clients_with_active_deals", tip: true, stroke: "var(--theme-foreground-focus)"}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Providers With Active Deals",
      subtitle: "How many providers have active (State Market) deals on the network at a given time.",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Providers"},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "providers_with_active_deals", tip: false, fill: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, {x: "date", y: "providers_with_active_deals", tip: true, stroke: "var(--theme-foreground-focus)"}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Providers With Power",
      subtitle: "How many providers have power on the network at a given time.",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Providers"},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "providers_with_power", tip: false, fill: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, {x: "date", y: "providers_with_power", tip: true, stroke: "var(--theme-foreground-focus)"}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Active Addresses",
      subtitle: "Addresses that appeared on chain at a given time.",
      caption: "Displaying 30-day moving average on a log scale",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Active Addresses", type: "log"},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(metrics, {x: "date", y: "active_address_count_daily", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "active_address_count_daily", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Total Addresses",
      subtitle: "How many addresses have interacted with the network.",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Addresses (Millions)", transform: (d) => d / 1e6},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "total_address_count", tip: false, fill: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, {x: "date", y: "total_address_count", tip: true, stroke: "var(--theme-foreground-focus)"}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Mean Active Deal Duration",
      subtitle: "How many days deals active on a date are expected to last.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Mean Active Deal Duration"},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(metrics, {x: "date", y: "mean_deal_duration_days", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "mean_deal_duration_days", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
</div>

## Power

<div class="grid grid-cols-2">
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Raw Power",
      subtitle: "Total raw power (PiBs) capacity on the network over time.",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "PiBs"},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "raw_power_pibs", tip: false, fill: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, {x: "date", y: "raw_power_pibs", tip: true, stroke: "var(--theme-foreground-focus)"}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Raw Power Delta",
      subtitle: "Daily change in raw power on the network over time.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "PiBs", domain: [-70, 70]},
      marks: [
        Plot.lineY(metrics, {x: "date", y: "raw_power_delta_pibs", tip: false, stroke: "var(--theme-foreground-fainter)", clip: true}),
        Plot.ruleY([0]),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "raw_power_delta_pibs", stroke: "var(--theme-foreground-focus)", tip: true, clip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Quality Adjusted Power",
      subtitle: "Total quality adjusted power (PiBs) capacity on the network over time.",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "PiBs"},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "quality_adjusted_power_pibs", tip: false, fill: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, {x: "date", y: "quality_adjusted_power_pibs", tip: true, stroke: "var(--theme-foreground-focus)"}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Quality Adjusted Power Delta",
      subtitle: "Daily change in quality adjusted power on the network over time.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "PiBs", domain: [-70, 70]},
      marks: [
        Plot.lineY(metrics, {x: "date", y: "quality_adjusted_power_delta_pibs", tip: false, stroke: "var(--theme-foreground-fainter)", clip: true}),
        Plot.ruleY([0]),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "quality_adjusted_power_delta_pibs", stroke: "var(--theme-foreground-focus)", tip: true, clip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Verified Data Power",
      subtitle: "Total verified data power (PiBs) capacity on the network over time.",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "PiBs"},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "verified_data_power_pibs", tip: false, fill: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, {x: "date", y: "verified_data_power_pibs", tip: true, stroke: "var(--theme-foreground-focus)"}),
      ]
    }))
  }</div>
    <div class="card">${
    resize((width) => Plot.plot({
      title: "Network Utilization Ratio",
      subtitle: "How much of the network's power is being used.",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Percentage (%)"},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "network_utilization_ratio", tip: false, fill: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, {x: "date", y: "network_utilization_ratio", tip: true, stroke: "var(--theme-foreground-focus)"}),
      ]
    }))
  }</div>
</div>

<div class="card">${
  resize((width) => Plot.plot({
    title: "Direct Data Onboarding",
    subtitle: "Onboarded data to the network via Direct Data Onboarding.",
    caption: "Displaying 30-day moving average.",
    width,
    x: {label: "Date"},
    y: {grid: true, label: "PiBs / day"},
    marks: [
      Plot.ruleY([0]),
      Plot.lineY(metrics, {x: "date", y: "ddo_sector_onboarding_raw_power_pibs", tip: false, stroke: "var(--theme-foreground-fainter)"}),
      Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "ddo_sector_onboarding_raw_power_pibs", stroke: "var(--theme-foreground-focus)", tip: true})),
    ]
  }))
}</div>

## Sectors

<div class="card">

```js
const sectorMetricType = view(Inputs.radio(["Raw Power", "Quality-Adjusted Power"], {label: "Power Type", value: "Raw Power"}));
```

```js
const sector_metrics = sectorMetricType === "Raw Power"
  ? [
      {metric: "Snap", values: metrics.map(d => ({date: d.date, value: d.sector_snap_raw_power_pibs}))},
      {metric: "Expire", values: metrics.map(d => ({date: d.date, value: d.sector_expire_raw_power_pibs}))},
      {metric: "Recover", values: metrics.map(d => ({date: d.date, value: d.sector_recover_raw_power_pibs}))},
      {metric: "Fault", values: metrics.map(d => ({date: d.date, value: d.sector_fault_raw_power_pibs}))},
      {metric: "Extended", values: metrics.map(d => ({date: d.date, value: d.sector_extended_raw_power_pibs}))},
      {metric: "Terminated", values: metrics.map(d => ({date: d.date, value: d.sector_terminated_raw_power_pibs}))},
      {metric: "Onboarding", values: metrics.map(d => ({date: d.date, value: d.sector_onboarding_raw_power_pibs}))}
    ]
  : [
      {metric: "Snap", values: metrics.map(d => ({date: d.date, value: d.sector_snap_quality_adjusted_power_pibs}))},
      {metric: "Expire", values: metrics.map(d => ({date: d.date, value: d.sector_expire_quality_adjusted_power_pibs}))},
      {metric: "Recover", values: metrics.map(d => ({date: d.date, value: d.sector_recover_quality_adjusted_power_pibs}))},
      {metric: "Fault", values: metrics.map(d => ({date: d.date, value: d.sector_fault_quality_adjusted_power_pibs}))},
      {metric: "Extended", values: metrics.map(d => ({date: d.date, value: d.sector_extended_quality_adjusted_power_pibs}))},
      {metric: "Terminated", values: metrics.map(d => ({date: d.date, value: d.sector_terminated_quality_adjusted_power_pibs}))},
      {metric: "Onboarding", values: metrics.map(d => ({date: d.date, value: d.sector_onboarding_quality_adjusted_power_pibs}))}
    ];

const sector_metrics_data = sector_metrics.flatMap(({metric, values}) => values.map(v => ({...v, metric})));
```

```js
resize((width) => Plot.plot({
  title: `Sector Data by Event (${sectorMetricType})`,
  subtitle: "How much data each event type has on the network on a given date.",
  caption: "Displaying 30-day moving average",
  x: {label: "Date"},
  y: {grid: true, label: "PiBs"},
  width,
  color: {
    legend: true,
  },
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(sector_metrics_data, Plot.windowY(30, {
      x: "date",
      y: "value",
      stroke: "metric",
      strokeWidth: 2,
      tip: true
    })),
  ]
}))
```
</div>

### Sector Events

<div class="grid grid-cols-2">
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Commit Capacity Events",
      subtitle: "Number of commit capacity events per day",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Events (Millions)", transform: (d) => d / 1e6},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(metrics, {x: "date", y: "commit_capacity_added_events_count", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "commit_capacity_added_events_count", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Precommit Events",
      subtitle: "Number of precommit events per day",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Events"},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(metrics, {x: "date", y: "precommit_added_events_count", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "precommit_added_events_count", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Sector Added Events",
      subtitle: "Number of sector added events per day",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Events"},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(metrics, {x: "date", y: "sector_added_events_count", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "sector_added_events_count", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Sector Extended Events",
      subtitle: "Number of sector extended events per day",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Events (Millions)", transform: (d) => d / 1e6, domain: [0, 4]},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(metrics, {x: "date", y: "sector_extended_events_count", tip: false, stroke: "var(--theme-foreground-fainter)", clip: true}),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "sector_extended_events_count", stroke: "var(--theme-foreground-focus)", tip: true, clip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Sector Fault Events",
      subtitle: "Number of sector fault events per day",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Events (Millions)", transform: (d) => d / 1e6, domain: [0, 4]},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(metrics, {x: "date", y: "sector_faulted_events_count", tip: false, stroke: "var(--theme-foreground-fainter)", clip: true}),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "sector_faulted_events_count", stroke: "var(--theme-foreground-focus)", tip: true, clip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Sector Recovery Events",
      subtitle: "Number of sector recovery events per day",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Events (Millions)", transform: (d) => d / 1e6, domain: [0, 4]},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(metrics, {x: "date", y: "sector_recovered_events_count", tip: false, stroke: "var(--theme-foreground-fainter)", clip: true}),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "sector_recovered_events_count", stroke: "var(--theme-foreground-focus)", tip: true, clip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Sector Snap Events",
      subtitle: "Number of sector snap events per day",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Events"},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(metrics, {x: "date", y: "sector_snapped_events_count", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "sector_snapped_events_count", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Sector Terminated Events",
      subtitle: "Number of sector terminated events per day",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Events (Millions)", transform: (d) => d / 1e6},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(metrics, {x: "date", y: "sector_terminated_events_count", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "sector_terminated_events_count", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
</div>


## Economics

<div class="grid grid-cols-2">
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Circulating FIL",
      subtitle: "Amount of FIL circulating and tradeable in the economy.",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL (Millions)", transform: (d) => d / 1e6},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "circulating_fil", tip: false, fill: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, {x: "date", y: "circulating_fil", tip: true, stroke: "var(--theme-foreground-focus)"}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Circulating FIL Delta",
      subtitle: "Daily change in circulating FIL over time.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL", type: "log"},
      marks: [
        Plot.lineY(metrics, {x: "date", y: "circulating_fil_delta", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.ruleY([0]),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "circulating_fil_delta", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Mined FIL",
      subtitle: "Amount of FIL that has been mined by storage miners.",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL (Millions)", transform: (d) => d / 1e6},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "mined_fil", tip: false, fill: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, {x: "date", y: "mined_fil", tip: true, stroke: "var(--theme-foreground-focus)"}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Mined FIL Delta",
      subtitle: "Daily change in mined FIL over time.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL"},
      marks: [
        Plot.lineY(metrics, {x: "date", y: "mined_fil_delta", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.ruleY([0]),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "mined_fil_delta", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Vested FIL",
      subtitle: "Amount of FIL that is vested from genesis allocation.",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL (Millions)", transform: (d) => d / 1e6},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "vested_fil", tip: false, fill: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, {x: "date", y: "vested_fil", tip: true, stroke: "var(--theme-foreground-focus)"}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Vested FIL Delta",
      subtitle: "Daily change in vested FIL over time.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL"},
      marks: [
        Plot.lineY(metrics, {x: "date", y: "vested_fil_delta", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.ruleY([0]),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "vested_fil_delta", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Locked FIL",
      subtitle: "Amount of FIL locked as part of initial pledge, deal pledge, locked rewards, and other locking mechanisms.",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL (Millions)", transform: (d) => d / 1e6},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "locked_fil", tip: false, fill: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, {x: "date", y: "locked_fil", tip: true, stroke: "var(--theme-foreground-focus)"}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Locked FIL Delta",
      subtitle: "Daily change in locked FIL over time.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL"},
      marks: [
        Plot.lineY(metrics, {x: "date", y: "locked_fil_delta", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.ruleY([0]),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "locked_fil_delta", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Burnt FIL",
      subtitle: "Amount of FIL burned as part of on-chain computations and penalties",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL (Millions)", transform: (d) => d / 1e6},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "burnt_fil", tip: false, fill: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, {x: "date", y: "burnt_fil", tip: true, stroke: "var(--theme-foreground-focus)"}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Burnt FIL Delta",
      subtitle: "Daily change in burnt FIL over time.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL", type: "log"},
      marks: [
        Plot.lineY(metrics, {x: "date", y: "burnt_fil_delta", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "burnt_fil_delta", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Reward Per Wincount",
      subtitle: "Weighted average block rewards awarded by the Filecoin Network per WinCount over time.",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL"},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "reward_per_wincount", tip: false, fill: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, {x: "date", y: "reward_per_wincount", tip: true, stroke: "var(--theme-foreground-focus)"}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Reward per Wincount FIL Delta",
      subtitle: "Daily change in burnt FIL over time.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL"},
      marks: [
        Plot.lineY(metrics, {x: "date", y: "reward_per_wincount_delta", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "reward_per_wincount_delta", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
</div>

## Gas

<div class="card">${
  resize((width) => Plot.plot({
    title: "Total Gas Used",
    subtitle: "Total gas used per day on the network.",
    caption: "Displaying 30-day moving average",
    width,
    marginLeft: 50,
    x: {label: "Date"},
    y: {grid: true, label: "FIL"},
    marks: [
      Plot.ruleY([0]),
      Plot.lineY(metrics, {x: "date", y: "total_gas_used_fil", tip: false, stroke: "var(--theme-foreground-fainter)"}),
      Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "total_gas_used_fil", stroke: "var(--theme-foreground-focus)", tip: true})),
    ]
  }))
}</div>
<div class="grid grid-cols-2">
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Provecommit Sector Gas Used",
      subtitle: "Total gas used for provecommit sector operations per day on the network.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL"},
      marks: [
        Plot.lineY(metrics, {x: "date", y: "provecommit_sector_gas_used_fil", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.ruleY([0]),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "provecommit_sector_gas_used_fil", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Precommit Sector Gas Used",
      subtitle: "Total gas used for precommit sector operations per day on the network.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL"},
      marks: [
        Plot.lineY(metrics, {x: "date", y: "precommit_sector_gas_used_fil", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.ruleY([0]),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "precommit_sector_gas_used_fil", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Provecommit Aggregate Gas Used",
      subtitle: "Total gas used for provecommit aggregate operations per day on the network.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL"},
      marks: [
        Plot.lineY(metrics, {x: "date", y: "provecommit_aggregate_gas_used_fil", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.ruleY([0]),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "provecommit_aggregate_gas_used_fil", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Precommit Sector Batch Gas Used",
      subtitle: "Total gas used for precommit sector batch operations per day on the network.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL"},
      marks: [
        Plot.lineY(metrics, {x: "date", y: "precommit_sector_batch_gas_used_fil", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.ruleY([0]),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "precommit_sector_batch_gas_used_fil", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Publish Storage Deals Gas Used",
      subtitle: "Total gas used for publish storage deals operations per day on the network.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL"},
      marks: [
        Plot.lineY(metrics, {x: "date", y: "publish_storage_deals_gas_used_fil", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.ruleY([0]),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "publish_storage_deals_gas_used_fil", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Submit Windowed PoSt Gas Used",
      subtitle: "Total gas used for submit windowed PoSt operations per day on the network.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL"},
      marks: [
        Plot.lineY(metrics, {x: "date", y: "submit_windowed_post_gas_used_fil", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.ruleY([0]),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "submit_windowed_post_gas_used_fil", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
</div>

## Developer Activity

<div class="grid grid-cols-2">
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Commits",
      subtitle: "Number of commits per day on the core Filecoin repositories.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Events"},
      marks: [
        Plot.lineY(metrics, {x: "date", y: "github_commit_code_events", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.ruleY([0]),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "github_commit_code_events", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Issues Closed",
      subtitle: "Number of issues closed per day on the core Filecoin repositories.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Events"},
      marks: [
        Plot.lineY(metrics, {x: "date", y: "github_issue_closed_events", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.ruleY([0]),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "github_issue_closed_events", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Issue Comments",
      subtitle: "Number of issue comments per day on the core Filecoin repositories.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Events"},
      marks: [
        Plot.lineY(metrics, {x: "date", y: "github_issue_comment_events", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.ruleY([0]),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "github_issue_comment_events", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Issues Opened",
      subtitle: "Number of issues opened per day on the core Filecoin repositories.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Events"},
      marks: [
        Plot.lineY(metrics, {x: "date", y: "github_issue_opened_events", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.ruleY([0]),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "github_issue_opened_events", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Pull Requests Closed",
      subtitle: "Number of pull requests closed per day on the core Filecoin repositories.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Events"},
      marks: [
        Plot.lineY(metrics, {x: "date", y: "github_pull_request_closed_events", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.ruleY([0]),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "github_pull_request_closed_events", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Pull Requests Merged",
      subtitle: "Number of pull requests merged per day on the core Filecoin repositories.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Events"},
      marks: [
        Plot.lineY(metrics, {x: "date", y: "github_pull_request_merged_events", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.ruleY([0]),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "github_pull_request_merged_events", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
</div>


---

## Resources

Here are some resources for you to explore and learn more about Filecoin data.

<div class="grid grid-cols-2">
  <div class="card">
    Build your own data apps using <a href="https://github.com/davidgasquez/filecoin-data-portal/">Filecoin Data Portal</a> datasets.
  </div>
  <div class="card">
    Dig deeper into the Clients, Providers, and Allocators data using <a href="https://filecoinpulse.pages.dev/">Filecoin Pulse</a>.
  </div>
  <div class="card">
    Contributing to the Filecoin Data Portal is easy! <a href="https://github.com/davidgasquez/filecoin-data-portal/">Check out the GitHub repo</a>.
  </div>
  <div class="card">
    Explore these metrics in <a href="https://dune.com/kalen/filecoin-daily-metrics">Dune Analytics</a> and create your own dashboards and queries.
  </div>
</div>

#### Disclaimer


_Charts shown here are for informational purposes only. The data pipelines powering this are optimized for analytical purposes and might not be 100% accurate._
