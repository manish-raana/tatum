import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
const chainList = ["ethereum", "ethereum-sepolia", "celo", "celo-testnet", "bsc", "bsc-testnet", "polygon", "tezos", "eon", "chiliz"];

type chainProps = {
  selectedChain: string;
  setSelectedChain: any;
};
const ChainList = ({selectedChain, setSelectedChain}: chainProps) => {
  return (
    <Select defaultValue={selectedChain} onValueChange={(e: any) => setSelectedChain(e)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="select a chain" />
      </SelectTrigger>
      <SelectContent>
        {chainList.map((chain) => (
          <SelectItem key={chain} value={chain}>
            {chain}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ChainList