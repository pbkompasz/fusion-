export type SwapRequest = {
  status: SwapStatus;
};

export type SwapType = "cosmos-evm" | "evm-cosmos";

export type SwapStatus =
  | "created"
  | "in-progress"
  | "invalid"
  | "canceled"
  | "completed";
