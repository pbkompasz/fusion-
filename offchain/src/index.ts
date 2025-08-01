import { StargateClient } from "@cosmjs/stargate";
import dotenv from "dotenv";
import { setup } from "./db";
import express from "express";
import { z } from "zod";
import { SwapRequest, SwapType } from "./types";

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

dotenv.config();

setup();

//
// Chain event listeners
//

const cosmosChainId = process.env.COSMOS_CHAIN_ID;
const cosmosRpcUrl = process.env.COSMOS_RPC_URL;
const evmChainId = process.env.EVM_CHAIN_ID;
const evmRpcUrl = process.env.EVM_RPC_URL;

const COSMOS_LOCALNET_RPC = "http://localhost:26657";

const setupCosmos = async () => {
  const client = await StargateClient.connect(
    cosmosRpcUrl ?? COSMOS_LOCALNET_RPC
  );
  console.log(
    "With client, chain id:",
    await client.getChainId(),
    ", height:",
    await client.getHeight()
  );
};

const listenerCosmos = async (): Promise<void> => {};

(async () => {
  await setupCosmos();
  await listenerCosmos();
})();

//
// Swap business logic
//

const swap = async (swapRequest: SwapRequest) => {
  // 1. Announcement phase
  // Receive signature
  // Send signature to resolver(s) and begin dutch auction
  // One resolver wins
  // 2. Deposit phase
  // Resolver deposits the maker's tokens into the escrow contract in the source chain. The escrow incorporates the secret hash, token type and amount, target address, and timelock specifications for both chains.
  // Resolver deposits taker amount in the escrow contract in the destination chain
  // Maker deposits a "safety deposit"
  // 3. Withdrawal phase
  // Relayer verifies both escrow contracts are filled
  // Discloses secrets to resolvers after the finality lock has passed
  // Resolver unlocks assets on source chain and reveals the secret
  // Resolver unlocks the assets on the destination chain
  // Swap is completed
  // 4. Recovery phase
  // Funds are returned if no party receives their assets
  // Resolver completes withdrawal or cancellation and receives the safety deposit
  //
};

const listenEvmEvents = async () => {};

const createEscrow = async (chainType: "cosmos" | "evm") => {};

const getStatus = (swapId: string) => {};

const getSwap = (swapId: string) => {};

//
// Utils
//

// Construct a swap object (TODO Use it in the cli/frontend)
const createSwapRequest = async (
  type: SwapType,
  cosmosChainId: number,
  evmChainId: number,
  to: string,
  sourceCoin: string,
  targetCoin: string,
  amount: number,
): Promise<SwapRequest> => {
  return {} as SwapRequest;
};

const validateSignature = async (swapReqquest: SwapRequest, signature: string) => {
  return true;
}

//
// API
//

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get("/status/:swapId", (req, res) => {
  const swapId = req.params.swapId;
  const swap = getStatus(swapId);
  res.json(swap);
});

const CreateSwapSchema = z.object({
  type: z.string(),
  cosmosChainId: z.number(),
  evmChainId: z.number(),
  to: z.string(),
  sourceCoin: z.string(),
  targetCoin: z.string(),
  amount: z.number(),
  signature: z.string(),
});

app.post("/swap", async (req, res) => {
  const parseResult = CreateSwapSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.format() });
  }

  const {
    type,
    cosmosChainId,
    evmChainId,
    to,
    sourceCoin,
    targetCoin,
    amount,
    signature,
  } = parseResult.data;

  if (!["cosmos-evm", "evm-cosmos"].includes(type)) {
    console.log("Wrong type!")
    return;
  }


  const request = await createSwapRequest(
    type as SwapType,
    cosmosChainId,
    evmChainId,
    to,
    sourceCoin,
    targetCoin,
    amount
  );
  // Log request to database

  // Validate signature
  if (await validateSignature(request, signature)) {
    // Set status to in-progress
  } else {
    // Log invalid signature
  }

  await swap(request);
});
