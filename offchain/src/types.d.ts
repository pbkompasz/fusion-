export type SwapRequest = {
};

export type SwapType = "cosmos-evm" | "evm-cosmos";

export type SwapStatus =
  | "created"
  | "in-progress"
  | "invalid"
  | "canceled"
  | "completed";

export type Swap = {
  status: SwapStatus;
  type: SwapType,
  cosmosChainId: number,
  evmChainId: number,
  from: string,
  to: string,
  sourceCoin: string,
  targetCoin: string,
  amount: number,
}

export type ResolverStatus = "active" | "inactive"

export type Resolver = {
  status: ResolverStatus;
  evmAddress: string;
  evmChainId: number; 
  cosmosAddress: string;
  cosmosChainId: number; 
}