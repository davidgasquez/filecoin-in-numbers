#!/usr/bin/env bash

duckdb :memory: << EOF
SET enable_progress_bar = false;
COPY (
  SELECT
    date,
    provider_id,
    onboarded_data_tibs
  FROM read_parquet('https://filecoindataportal.davidgasquez.com/data/filecoin_daily_storage_providers_metrics.parquet')
  where onboarded_data_tibs > 0
  order by provider_id desc, date desc
) TO STDOUT (FORMAT 'parquet', compression 'zstd', ROW_GROUP_SIZE '20000');
EOF
