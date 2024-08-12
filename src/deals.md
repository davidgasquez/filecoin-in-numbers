---
sql:
  deals: ./data/daily_data_onboarding.parquet
---

# Deals

```js
const date = view(
    Inputs.date({label: "Date", value: "2021-01-01"})
)
const minimum_piece_replication_factor = view(
    Inputs.range([0, 100], {label: "Minimum Piece Replication Factor", step: 1, value: 0})
)
```

```sql id=daily_data_onboarding
SELECT
    date,
    sum(data_onboarded_tibs) / 1024 as data_onboarded_pibs
from deals
where
    date > ${date}
    and piece_replication_factor >= ${minimum_piece_replication_factor}
group by 1 order by 1 desc
```

## Plot

<div class="grid">
<div class="card">${
resize((width) =>  Plot.plot({
    width,
    marks: [
        Plot.ruleY([0]),
        Plot.areaY(daily_data_onboarding, {x: "date", y: "data_onboarded_pibs", tip: true}),
    ]
}))}
</div>
</div>
