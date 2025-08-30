// backend/db.js
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Infraguard-AI",
  password: "Monil@334",
  port: 5433,
});

export default pool;
