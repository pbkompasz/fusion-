import { Signature, verifyMessage } from "ethers";
import { SwapRequest, SwapType } from "./types";

const verifySignature = (signature: string) => {
  const { r, yParityAndS: vs } = Signature.from(signature);
};

export const validateSignature = async (
  swapReqquest: SwapRequest,
  signature: string,
  expectedAddress: string
) => {
  const json = JSON.stringify(swapReqquest);
  const recovered = verifyMessage(json, signature);
  return recovered.toLowerCase() === expectedAddress.toLowerCase();
};
