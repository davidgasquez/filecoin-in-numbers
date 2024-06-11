---
sql:
  storage_providers: ./data/storage_providers.parquet
  storage_providers_daily_metrics: ./data/storage_providers_daily_metrics.parquet
---

```js
const id = (new URL(document.location).searchParams.get("id") ?? null);
```

# ${id ?? "Storage Providers"}

```sql id=[sp]
select
  *
from storage_providers
where provider_id = ${id}
```

<div class="sp grid grid-cols-2">
  <div class="card"> <h3> Deals </h3> ${sp.total_deals} </div>
  <div class="card"> <h3> Active Deals </h3> ${sp.total_active_deals} </div>
  <div class="card"> <h3> Data Uploaded </h3> ${sp.total_data_uploaded_tibs.toFixed(2)} TiBs </div>
  <div class="card"> <h3> Unique Clients </h3> ${sp.total_unique_clients} </div>
  <div class="card"> <h3> First Deal </h3> ${d3.utcFormat("%Y-%m-%d")(sp.first_deal_at)} </div>
  <div class="card"> <h3> Last Deal </h3> ${d3.utcFormat("%Y-%m-%d")(sp.last_deal_at)} </div>
  <div class="card"> <h3> Raw Power </h3> ${sp.raw_power_pibs.toFixed(2)} PiBs </div>
  <div class="card"> <h3> Quality Adjusted Power </h3> ${sp.quality_adjusted_power_pibs.toFixed(2)} PiBs </div>
</div>

```sql id=sp_metrics
select
  date,
  raw_power_pibs,
  quality_adjusted_power_pibs,
  deals
from storage_providers_daily_metrics
where provider_id = ${id}
order by date desc
```

```js
Plot.plot({
  x: {tickFormat: d3.utcFormat("%Y"),  label: "Date"},
  y: {grid: true},
  marks: [
    Plot.lineY(sp_metrics, {x: "date", y: "raw_power_pibs"}),
    Plot.lineY(sp_metrics, {x: "date", y: "quality_adjusted_power_pibs"})
  ]
})
```

```js
Plot.plot({
  x: {tickFormat: d3.utcFormat("%Y"),  label: "Date"},
  y: {grid: true},
  marks: [
    Plot.lineY(sp_metrics, {x: "date", y: "deals"})
  ]
})
```

<a href="/"> <img src="logo.svg" width="20px"> </a>
