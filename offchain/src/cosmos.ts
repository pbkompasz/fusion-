import { SwapRequest } from "./types";

export const validateSignature = async (
  swapReqquest: SwapRequest,
  signature: string,
  expectedAddress: string
) => {
  const json = JSON.stringify(swapReqquest);
  return true;
};
