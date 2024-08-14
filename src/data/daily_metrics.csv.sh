#!/usr/bin/env bash

duckdb :memory: << EOF
SET enable_progress_bar = false;
COPY (
  SELECT
    date,
    onboarded_data_pibs,
    deals,
    data_on_active_deals_pibs,
    active_deals,
    -- deal_ends,
    -- ended_data_pibs,
    unique_deal_making_clients,
    unique_deal_making_providers,
    clients_with_active_deals,
    providers_with_active_deals,
    active_address_count_daily,
    total_address_count,
    raw_power_pibs,
    quality_adjusted_power_pibs,
    network_utilization_ratio * 100 as network_utilization_ratio,
    verified_data_power_pibs,
    circulating_fil,
    mined_fil,
    vested_fil,
    locked_fil,
    burnt_fil,
    reward_per_wincount
  FROM read_parquet('https://data.filecoindataportal.xyz/filecoin_daily_metrics.parquet')
) TO STDOUT (FORMAT 'CSV');
EOF
