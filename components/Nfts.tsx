import { NFTResponse } from '@/types/NftResponse';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from 'react'
import CryptoAddress from './CryptoAddress';
import IPFSImage from './IPFSImage';

type props = {
  nftList: NFTResponse[];
};
const Nfts = ({ nftList }: props) => {
  
  return (
    <div className="h-96 overflow-scroll">
      <p className="font-bold">NFTs:</p>
      <Table className="border h-96 overflow-scroll">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Chain</TableHead>
            <TableHead>Token Id</TableHead>
            <TableHead>Token Address</TableHead>
            <TableHead className="text-right">NFT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nftList?.map((item: NFTResponse) => (
            <TableRow>
              <TableCell className="font-medium w-1/4">{item.chain}</TableCell>
              <TableCell className="w-1/4">{item.tokenId}</TableCell>
              <TableCell className="w-1/4">
                <CryptoAddress address={item.tokenAddress} />
              </TableCell>
              <TableCell className="text-right w-1/4">
                <IPFSImage src={item.metadata.image} alt={`NFT ${item.tokenId}`} width={100} height={100} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Nfts