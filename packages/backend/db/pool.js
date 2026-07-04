const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  user: process.env.DB_USER || "crm_app",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || "crm_dev",
  max: 10,
  idleTimeoutMillis: 30000,
});

module.exports = pool;
