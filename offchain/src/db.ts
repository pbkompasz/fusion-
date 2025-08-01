import { Client } from "pg";
import { Swap, SwapRequest, SwapStatus } from "./types";

const client = new Client({
  user: "user",
  host: "db",
  database: "mydb",
  password: "password",
  port: 5432,
});

async function setup() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL");

    await client.query(`
       CREATE TABLE IF NOT EXISTS swaps (
        id SERIAL PRIMARY KEY,
        status TEXT NOT NULL CHECK (status IN ('created', 'in-progress', 'invalid', 'canceled', 'completed')),
        type TEXT NOT NULL CHECK (type IN ('cosmos-evm', 'evm-cosmos')),
        cosmosChainId NUMERIC NOT NULL,
        evmChainId NUMERIC NOT NULL,
        sender TEXT NOT NULL,
        recipient TEXT NOT NULL,
        sourceCoin TEXT NOT NULL,
        targetCoin TEXT NOT NULL,
        amount NUMERIC NOT NULL
      );
    `);

    await client.query(`
       CREATE TABLE IF NOT EXISTS auctions (
        id SERIAL PRIMARY KEY,
        status TEXT NOT NULL CHECK (status IN ('inactive', 'active')),
        fillAmount NUMERIC NOT NULL,
        fills NUMERIC DEFAULT 1
      );
    `);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
    console.log("Disconnected");
  }
}

async function createSwap(swap: Swap) {
  const result = await client.query(
    'INSERT INTO swaps (status, type, cosmosChainId, evmChainId, sender, recipient, sourceCoin, targetCoin, amount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    [
      swap.status,
      swap.type,
      swap.cosmosChainId,
      swap.evmChainId,
      swap.from,
      swap.to,
      swap.sourceCoin,
      swap.targetCoin,
      swap.amount,
    ]
  );

  return result.rows[0].id;
}

async function updateSwapStatus(
  swapId: string,
  newSwapStatus: SwapStatus
): Promise<Swap> {
  const resp = await client.query("SELECT * FROM swaps WHERE id = $1");

  if (!resp.rows.length) {
    throw new Error(`No swap w/ id: ${swapId}`);
  }

  const result = await client.query(
    "UPDATE swaps SET status = $1 WHERE id = $2",
    [newSwapStatus, swapId]
  );

  return result.rows[0] as Swap;
}

async function createAuction(swapRequest: SwapRequest) {
  const result = await client.query(
    "INSERT INTO auctions (status, fillAmount, fills) VALUES ($1, $2, $3)",
    ["live", swapRequest, 1]
  );

  return result.rows[0].id;
}

export { setup, createSwap, updateSwapStatus, createAuction };
