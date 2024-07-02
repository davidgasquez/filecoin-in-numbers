---
sql:
  metrics: ./data/metrics.parquet
---

# Filecoin Metrics

_A view into Filecoin Metrics. Powered by the [Filecoin Data Portal](https://github.com/davidgasquez/filecoin-data-portal/)._

```js
import {linePlot} from "./components/linePlot.js";
import {monthlyAverageLinePlot} from "./components/monthlyAverageLinePlot.js";
```

```sql id=m
select
  date,
  onboarded_data_pibs,
  avg(onboarded_data_pibs) over (order by date rows between 30 preceding and current row) as onboarded_data_pibs_30d_avg,
  data_on_active_deals_pibs,
  unique_deal_making_clients,
  avg(unique_deal_making_clients) over (order by date rows between 30 preceding and current row) as unique_deal_making_clients_30d_avg,
  unique_deal_making_providers,
  avg(unique_deal_making_providers) over (order by date rows between 30 preceding and current row) as unique_deal_making_providers_30d_avg,
  raw_power_pibs,
  quality_adjusted_power_pibs,
  clients_with_active_deals,
  providers_with_active_deals,
  deal_ends,
  deal_slashes
from metrics
```

<div class="grid grid-cols-2">

  <div class="card">
    ${resize((width) =>
      monthlyAverageLinePlot(
        width,
        m,
        "date",
        "onboarded_data_pibs",
        "Onboarded PiBs",
        "Daily Data Onboarding"
      )
    )}
  </div>

  <div class="card">
    ${resize((width) => linePlot(
        width,
        m,
        "date",
        "data_on_active_deals_pibs",
        "PiBs",
        "Data on Active Deals"
      ))
    }
  </div>

  <div class="card">
    ${resize((width) =>
      monthlyAverageLinePlot(
        width,
        m,
        "date",
        "unique_deal_making_clients",
        "Clients",
        "Deal Making Clients"
      )
    )}
  </div>

  <div class="card">
    ${resize((width) =>
      monthlyAverageLinePlot(
        width,
        m,
        "date",
        "unique_deal_making_providers",
        "Providers",
        "Deal Making Providers"
      )
    )}
  </div>

  <div class="card">
    ${resize((width) => monthlyAverageLinePlot(
        width,
        m,
        "date",
        "clients_with_active_deals",
        "Clients",
        "Clients with Active Deals"
      ))
    }
  </div>

  <div class="card">
    ${resize((width) => monthlyAverageLinePlot(
        width,
        m,
        "date",
        "providers_with_active_deals",
        "Providers",
        "Providers with Active Deals"
      ))
    }
  </div>

  <div class="card">
    ${resize((width) => linePlot(
        width,
        m,
        "date",
        "raw_power_pibs",
        "PiBs",
        "Raw Power"
      ))
    }
  </div>

  <div class="card">
    ${resize((width) => linePlot(
        width,
        m,
        "date",
        "quality_adjusted_power_pibs",
        "PiBs",
        "Quality Adjusted Power"
      ))
    }
  </div>

</div>
