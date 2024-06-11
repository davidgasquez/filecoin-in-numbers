---
sql:
  storage_providers: ./data/storage-providers.parquet
---

```js
const id = (new URL(document.location).searchParams.get("id") ?? "Storage Providers");
```

# ${id}

_Metrics for the Storage Provider with ID **${id}**._

```sql id=[sp]
select
  *
from storage_providers
where provider_id = ${id}
```

<div class="grid grid-cols-2">
  <div class="card"> <h3> Deals </h3> ${sp.total_deals} </div>
  <div class="card"> <h3> Active Deals </h3> ${sp.total_active_deals} </div>
  <div class="card"> <h3> Data Uploaded </h3> ${sp.total_data_uploaded_tibs.toFixed(2)} TiBs </div>
  <div class="card"> <h3> Unique Clients </h3> ${sp.total_unique_clients} </div>
  <div class="card"> <h3> First Deal </h3> ${d3.utcFormat("%Y-%m-%d")(sp.first_deal_at)} </div>
  <div class="card"> <h3> Last Deal </h3> ${d3.utcFormat("%Y-%m-%d")(sp.last_deal_at)} </div>
  <div class="card"> <h3> Raw Power </h3> ${sp.raw_power_pibs.toFixed(2)} PiBs </div>
  <div class="card"> <h3> Quality Adjusted Power </h3> ${sp.quality_adjusted_power_pibs.toFixed(2)} PiBs </div>
</div>

<a href="/"> <img src="logo.svg" width="20px"> </a>
