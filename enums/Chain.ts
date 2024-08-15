import { z } from "zod";

const initialChainList = [
  "ethereum",
  "ethereum-sepolia",
  "celo",
  "celo-testnet",
  "bsc",
  "bsc-testnet",
  "polygon",
  "eon",
  "chiliz",
] as const;

export const NftChainEnum = z.enum([...initialChainList, "ethereum-holesky"]);

export const BalanceChainEnum = z.enum([...initialChainList, "tezos"]);

export type NFTChain = z.infer<typeof NftChainEnum>;
export type BalanceChain = z.infer<typeof BalanceChainEnum>;
