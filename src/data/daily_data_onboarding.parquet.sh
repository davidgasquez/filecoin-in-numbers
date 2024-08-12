#!/usr/bin/env bash

duckdb :memory: << EOF
SET enable_progress_bar = false;
copy (
  with deals as (
    select
      deal_id,
      sector_start_at,
      padded_piece_size_tibs,
      is_verified,
      activation_epochs_delay,
      piece_replication_factor,
      piece_distinct_provider_count,
      piece_distinct_client_count,
      (end_epoch - sector_start_epoch) // 2880 as deal_lenght_days,
    from 'https://data.filecoindataportal.xyz/filecoin_state_market_deals.parquet'
  )

  select
    cast(sector_start_at as date) as date,
    activation_epochs_delay,
    piece_replication_factor,
    piece_distinct_provider_count,
    piece_distinct_client_count,
    deal_lenght_days,
    sum(padded_piece_size_tibs) as data_onboarded_tibs,
  from deals
  group by all
  order by 1 desc
) to stdout (format 'parquet', compression 'zstd');
EOF
