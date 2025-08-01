import { createWallet as createEvmWallet } from "./evm";
import { createWallet as createCosmosWallet } from "./cosmos";
/**
 *
 * This is the offchain elements of the resolver
 * Watches for dutch auctions and bids on them
 * Fills if won
 *
 */

// TODO Whitelist resolvers

import { Resolver } from "./types";

const resolvers: Resolver[] = [];

const createResolver = () => {
  const evmSecret = "";
  const cosmosSecret = "";
  const evmWallet = createEvmWallet(evmSecret);
  const cosmosWallet = createCosmosWallet(evmSecret);
};

const bidWhileActive = async (resolver: Resolver) => {
  return {
    won: true,
  };
};

const monitorAuction = async () => {
  if (true) {
    // In parallel, may the best resolver win
    const postAuctionStatus = await Promise.all(
      resolvers.map(async (resolver) => {
        return await bidWhileActive(resolver);
      })
    );

    // Get the winner
    const winner = postAuctionStatus.find((status) => status.won);

    // TODO Fill the order
  }
};

const startResolverLoop = () => {
  setInterval(monitorAuction, 1000);
};
