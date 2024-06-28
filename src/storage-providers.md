---
sql:
  storage_providers: ./data/storage_providers.parquet
---


# Storage Providers

```sql id=sps
select
  provider_id,
  total_deals,
  total_data_uploaded_tibs,
  unique_data_uploaded_ratio,
  total_unique_clients,
  raw_power_pibs,
  quality_adjusted_power_pibs,
from storage_providers
```

```js
const searchResults = view(Inputs.search(sps, {
  search_column: "provider_id",
  placeholder: "Search Provider ID",
}))
```

```js
Inputs.table(searchResults)
```

<a href="/"> <img src="logo.svg" width="20px"> </a>
