import duckdb from 'duckdb';
const db = new duckdb.Database(':memory:'); // or a file name for a persistent DB
