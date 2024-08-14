---
toc: false
---

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 2rem 0 6rem;
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
  <h2>A high level view into the Filecoin Network core metrics!</h2>
</div>

```js
const metrics = FileAttachment("./data/daily_metrics.csv").csv({typed: true});
```

## Data Onboarding

<div class="card">${
  resize((width) => Plot.plot({
    title: "Onboarded Data",
    subtitle: "How much data (PiBs) is being onboarded in to Filecoin.",
    caption: "Displaying 30-day moving average",
    width,
    x: {label: "Date"},
    y: {grid: true, label: "PiBs"},
    marks: [
      Plot.ruleY([0]),
      Plot.lineY(metrics, {x: "date", y: "onboarded_data_pibs", tip: false, stroke: "var(--theme-foreground-fainter)"}),
      Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "onboarded_data_pibs", stroke: "var(--theme-foreground-focus)", tip: true})),
    ]
  }))
}</div>

<div class="grid grid-cols-2">
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Data On Active Deals",
      subtitle: "How much data was active on the network at a given time.",
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
      title: "Daily Deals",
      subtitle: "Number of deals made on the network.",
      caption: "Displaying 30-day moving average",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Deals"},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(metrics, {x: "date", y: "deals", tip: false, stroke: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, Plot.windowY(30, {x: "date", y: "deals", stroke: "var(--theme-foreground-focus)", tip: true})),
      ]
    }))
  }</div>
  <!-- <div class="card">${
    resize((width) => Plot.plot({
      title: "Data On Active Deals Change",
      subtitle: "TODO",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "PiBs"},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(metrics, {x: "date", y: "data_on_active_deals_pibs_daily_change", tip: true})
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Ended Deals",
      subtitle: "Amount of deals that have ended",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Deals"},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "deal_ends", tip: true})
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Ended Data",
      subtitle: "Amount of data that has ended",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "PiBs"},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "ended_data_pibs", tip: true})
      ]
    }))
  }</div> -->
</div>

## Users

<div class="grid grid-cols-2">
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Dealmaking Clients",
      subtitle: "Clients making deals on the network.",
      caption: "Displaying 30-day moving average",
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
      subtitle: "Providers making deals on the network.",
      caption: "Displaying 30-day moving average",
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
      subtitle: "How many clients have active deals on the network at a given time.",
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
      subtitle: "How many providers have active deals on the network at a given time.",
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
      title: "Active Addresses",
      subtitle: "Addresses that appeared on chain at a given time.",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Active Addresses"},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "active_address_count_daily", tip: false, fill: "var(--theme-foreground-fainter)"}),
        Plot.lineY(metrics, {x: "date", y: "active_address_count_daily", tip: true, stroke: "var(--theme-foreground-focus)"}),
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

## Economics

<div class="grid grid-cols-3">
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
</div>

---

## Moar data

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
