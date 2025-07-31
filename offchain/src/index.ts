import { StargateClient } from "@cosmjs/stargate";

// Docs
// A single file to
// 1. Communicate with the database
// 2. Listen to events on both chains
// 3. Orchestrates swap

// Relayer:
// Works off-chain.
// Monitors user-initiated orders and signals the Resolver to start processing the swap.
// -Acts like a dispatcher: it doesn’t perform the swap but notifies the right components to do so (e.g., finding a taker once a maker creates an order).

// Resolver:
// Acts as the bridge logic layer.
// Listens for swap requests and start creating Escrow contract for Srcchain and Dstchain.
// Coordinates the locking of assets on the source chain and fulfillment on the destination chain.
// Think of it as a professional market maker that actively facilitates cross-chain swaps.

// TODO Add database

const scenarioCosmosEvm = "cosmos-evm";
const scenarioEvmCosmos = "evm-cosmos";

import dotenv from "dotenv";
dotenv.config();

const cosmosChainId = process.env.COSMOS_CHAIN_ID;
const cosmosRpcUrl = process.env.COSMOS_RPC_URL;
const evmChainId = process.env.EVM_CHAIN_ID;
const evmRpcUrl = process.env.EVM_RPC_URL;

const rpc = "wss://neutron-testnet.drpc.org";

const listenCosmosEvents = async (): Promise<void> => {
  const client = await StargateClient.connect(rpc);
  console.log(
    "With client, chain id:",
    await client.getChainId(),
    ", height:",
    await client.getHeight()
  );
};

const listenEvmEvents = async () => {};

const createEscrow = async (chainType: "cosmos" | "evm") => {};
