import { BalanceResponse } from '@/types/BalanceResponse';
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CryptoAddress from './CryptoAddress';

type props = {
  balances: BalanceResponse[];
};

const Balances = ({ balances }: props) => {
   
  return (
    <div className="h-96 overflow-scroll">
      <p className='font-bold'>Token Balances:</p>
      <Table className="border h-96 overflow-scroll">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Address</TableHead>
            <TableHead>Chain</TableHead>
            <TableHead>Token Address</TableHead>
            <TableHead className="text-right">Token Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {balances?.map((item: BalanceResponse) => (
            <TableRow>
              <TableCell className="font-medium w-1/4">
                <CryptoAddress address={item.address} />
              </TableCell>
              <TableCell className="w-1/4">{item.chain}</TableCell>
              <TableCell className="w-1/4">
                <CryptoAddress address={item.tokenAddress} />
              </TableCell>
              <TableCell className="text-right w-1/4">{item.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Balances