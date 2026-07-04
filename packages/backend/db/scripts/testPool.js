const pool = require("../pool");

async function test() {
  try {
    const result = await pool.query("SELECT 1");
    console.log(result.rows);
    console.log("Database connected!");
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

test();
