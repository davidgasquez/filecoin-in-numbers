---
sql:
  weekly_metrics: ./data/weekly_metrics.parquet
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
  data_on_active_deals_pibs,
  unique_deal_making_clients,
  unique_deal_making_providers,
  raw_power_pibs,
  quality_adjusted_power_pibs,
  clients_with_active_deals,
  providers_with_active_deals,
  unique_deal_making_clients,
  unique_deal_making_providers,
  sector_onboarding_raw_power_pibs,
  sector_terminated_raw_power_pibs,
  active_address_count_weekly,
  data_on_active_deals_pibs / raw_power_pibs as network_utilization_ratio
from weekly_metrics
```

<div class="grid grid-cols-2">

  <div class="card">
    ${resize((width) =>
      linePlot(
        width,
        m,
        "date",
        "onboarded_data_pibs",
        "Onboarded PiBs",
        "Daily Data Onboarding",
        "week"
      )
    )}
  </div>

  <div class="card">
    ${resize((width) =>
      linePlot(
        width,
        m,
        "date",
        "data_on_active_deals_pibs",
        "PiBs",
        "Data on Active Deals",
        "week"
      ))
    }
  </div>

  <div class="card">
    ${resize((width) =>
      linePlot(
        width,
        m,
        "date",
        "unique_deal_making_clients",
        "Clients",
        "Deal Making Clients",
        "week"
      )
    )}
  </div>

  <div class="card">
    ${resize((width) =>
      linePlot(
        width,
        m,
        "date",
        "unique_deal_making_providers",
        "Providers",
        "Deal Making Providers",
        "week"
      )
    )}
  </div>

  <div class="card">
    ${resize((width) =>
      linePlot(
        width,
        m,
        "date",
        "clients_with_active_deals",
        "Clients",
        "Clients with Active Deals",
        "week"
      ))
    }
  </div>

  <div class="card">
    ${resize((width) =>
      linePlot(
        width,
        m,
        "date",
        "providers_with_active_deals",
        "Providers",
        "Providers with Active Deals",
        "week"
      ))
    }
  </div>

  <div class="card">
    ${resize((width) =>
      linePlot(
        width,
        m,
        "date",
        "unique_deal_making_clients",
        "Clients",
        "Deal Making Clients",
        "week"
      ))
    }
  </div>

  <div class="card">
    ${resize((width) =>
      linePlot(
        width,
        m,
        "date",
        "unique_deal_making_providers",
        "Providers",
        "Deal Making Providers",
        "week"
      ))
    }
  </div>

  <div class="card">
    ${resize((width) =>
      linePlot(
        width,
        m,
        "date",
        "raw_power_pibs",
        "PiBs",
        "Raw Power",
        "week"
      ))
    }
  </div>

  <div class="card">
    ${resize((width) =>
      linePlot(
        width,
        m,
        "date",
        "quality_adjusted_power_pibs",
        "PiBs",
        "Quality Adjusted Power",
        "week"
      ))
    }
  </div>

  <div class="card">
    ${resize((width) =>
      linePlot(
        width,
        m,
        "date",
        "sector_onboarding_raw_power_pibs",
        "PiBs",
        "Sector Onboarding Raw Power",
        "week"
      ))
    }
  </div>

  <div class="card">
    ${resize((width) =>
      linePlot(
        width,
        m,
        "date",
        "sector_terminated_raw_power_pibs",
        "PiBs",
        "Sector Terminated Raw Power",
        "week"
      ))
    }
  </div>

  <div class="card">
    ${resize((width) =>
      linePlot(
        width,
        m,
        "date",
        "active_address_count_weekly",
        "Addresses",
        "Active Address Count",
        "week"
      ))
    }
  </div>

  <div class="card">
    ${resize((width) =>
      linePlot(
        width,
        m,
        "date",
        "network_utilization_ratio",
        "Utilization Ratio",
        "Network Utilization Ratio",
        "week"
      ))
    }
  </div>

</div>
