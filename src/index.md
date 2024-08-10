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
  <h2>A view into the Filecoin Network core metrics</h2>
</div>

```js
const metrics = FileAttachment("./data/daily_metrics.csv").csv({typed: true});
```

## Deals

<div class="grid grid-cols-2">
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Daily Data Onboarding",
      subtitle: "Data onboarded to the network",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "PiBs"},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(metrics, {x: "date", y: "onboarded_data_pibs", tip: true}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Daily Deals",
      subtitle: "Deals made per day",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Deals"},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(metrics, {x: "date", y: "deals", tip: true}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Data On Active Deals",
      subtitle: "Amount of data on active deals",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "PiBs"},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "data_on_active_deals_pibs", tip: true})
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Active Deals",
      subtitle: "Active deals on the network",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Deals (Millions)", transform: (d) => d / 1e6},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "active_deals", tip: true})
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
  }</div>
</div>

## Users

<div class="grid grid-cols-2">
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Dealmaking Clients",
      subtitle: "Clients making deals on the network",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Clients"},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(metrics, {x: "date", y: "unique_deal_making_clients", tip: true}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Dealmaking Providers",
      subtitle: "Providers making deals on the network",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Providers"},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(metrics, {x: "date", y: "unique_deal_making_providers", tip: true}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Clients With Active Deals",
      subtitle: "Clients with active deals on the network",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Clients"},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "clients_with_active_deals", tip: true})
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Providers With Active Deals",
      subtitle: "Providers with active deals on the network",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Providers"},
      marks: [
      Plot.ruleY([0]),
      Plot.areaY(metrics, {x: "date", y: "providers_with_active_deals", tip: true})
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Active Addresses",
      subtitle: "Active addresses on the network",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Addresses"},
      marks: [
      Plot.ruleY([0]),
      Plot.areaY(metrics, {x: "date", y: "active_address_count_daily", tip: true})
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Total Addresses",
      subtitle: "Total addresses on the network",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "Addresses (Millions)", transform: (d) => d / 1e6},
      marks: [
      Plot.ruleY([0]),
      Plot.areaY(metrics, {x: "date", y: "total_address_count", tip: true})
      ]
    }))
  }</div>
</div>

## Power

<div class="grid grid-cols-3">
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Raw Power",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "PiBs"},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "raw_power_pibs", tip: true}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Quality Adjusted Power",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "PiBs"},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "quality_adjusted_power_pibs", tip: true}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Verified Data Power",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "PiBs"},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "verified_data_power_pibs", tip: true}),
      ]
    }))
  }</div>
</div>

## Circulating Supply

<div class="grid grid-cols-2">
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Circulating FIL",
      subtitle: "Circulating Filecoin tokens",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL (Millions)", transform: (d) => d / 1e6},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "circulating_fil", tip: true}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Mined FIL",
      subtitle: "Filecoin tokens mined",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL (Millions)", transform: (d) => d / 1e6},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "mined_fil", tip: true}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Vested FIL",
      subtitle: "Filecoin tokens vested",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL (Millions)", transform: (d) => d / 1e6},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "vested_fil", tip: true}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Reserve Disbursed FIL",
      subtitle: "Filecoin tokens disbursed from the reserve",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL (Millions)", transform: (d) => d / 1e6},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "reserve_disbursed_fil", tip: true}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Locked FIL",
      subtitle: "Filecoin tokens locked",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL (Millions)", transform: (d) => d / 1e6},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "locked_fil", tip: true}),
      ]
    }))
  }</div>
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Burnt FIL",
      subtitle: "Filecoin tokens burnt",
      width,
      x: {label: "Date"},
      y: {grid: true, label: "FIL (Millions)", transform: (d) => d / 1e6},
      marks: [
        Plot.ruleY([0]),
        Plot.areaY(metrics, {x: "date", y: "burnt_fil", tip: true}),
      ]
    }))
  }</div>
</div>

---

## Moar data

Here are some resources for you to explore and learn more about Filecoin data.

<div class="grid grid-cols-4">
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
