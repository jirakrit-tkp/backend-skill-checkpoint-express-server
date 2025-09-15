// Create PostgreSQL Connection Pool here !
import * as pg from "pg";
import dotenv from "dotenv"

dotenv.config();

const { Pool } = pg.default;

const connectionPool = new Pool({
  connectionString:
    `postgresql://postgres:${process.env.DB_PASSWORD}@localhost:5432/quora-mock`,
});

export default connectionPool;