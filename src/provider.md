---
title: Provider
sql:
  storage_providers: ./data/storage_providers.parquet
  storage_providers_daily_deals_metrics: ./data/storage_providers_daily_deals_metrics.parquet
  storage_providers_daily_power_metrics: ./data/storage_providers_daily_power_metrics.parquet
---

# ${id ?? "No Provider Selected"}

```js
const id = (new URL(document.location).searchParams.get("id") ?? null);
```

```sql id=[sp]
select
  total_deals,
  total_active_deals,
  total_data_uploaded_tibs,
  total_unique_clients,
  first_deal_at,
  last_deal_at,
  raw_power_pibs,
  quality_adjusted_power_pibs
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
with sp_deal_data as (
  select
    date,
    onboarded_data_tibs,
  from storage_providers_daily_deals_metrics
  where provider_id = ${id}
  order by date desc
),

sp_power_data as (
  select
    date,
    raw_power_pibs,
    quality_adjusted_power_pibs
  from storage_providers_daily_power_metrics
  where provider_id = ${id}
  order by date desc
),

dates as (
  select
    cast(min(date) as date) as start_date,
    cast(max(date) as date) as end_date
  from storage_providers_daily_power_metrics
),

calendar as (
  select
    unnest(generate_series(dates.start_date, dates.end_date, interval '1 day')) as date
  from dates
)

select
  calendar.date,
  coalesce(sp_deal_data.onboarded_data_tibs, 0) as onboarded_data_tibs,
  coalesce(sp_power_data.raw_power_pibs, 0) as raw_power_pibs,
  coalesce(sp_power_data.quality_adjusted_power_pibs, 0) as quality_adjusted_power_pibs
from calendar
left join sp_deal_data on calendar.date = sp_deal_data.date
left join sp_power_data on calendar.date = sp_power_data.date
order by calendar.date
```

<div class="card">
<h2> Onboarded Data TiBs </h2>
${resize((width) =>
Plot.plot({
  x: {tickFormat: d3.utcFormat("%Y"),  label: "Date"},
  y: {grid: true},
  marks: [
    Plot.lineY(sp_metrics, {x: "date", y: "onboarded_data_tibs"}),
  ],
  width: width
})
)}
</div>

<div class="card">
<h2> Raw Power </h2>
${resize((width) =>
Plot.plot({
  x: {tickFormat: d3.utcFormat("%Y"),  label: "Date"},
  y: {grid: true},
  marks: [
    Plot.areaY(sp_metrics, {x: "date", y: "raw_power_pibs"})
  ],
  width: width
})
)}
</div>
