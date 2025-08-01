import { Client } from "pg";

const client = new Client({
  user: "user",
  host: "localhost",
  database: "mydb",
  password: "password",
  port: 5432,
});

async function setup() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL");

    // Example: Create a table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);

    // Example: Insert a row
    await client.query("INSERT INTO users (name) VALUES ($1)", ["Alice"]);

    // Example: Query the table
    const res = await client.query("SELECT * FROM users");
    console.log("Users:", res.rows);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
    console.log("Disconnected");
  }
}

export { setup };
