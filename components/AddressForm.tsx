'use client';
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Loader from './Loader';
import ChainList from './ChainList';
import axios from 'axios';
import { BalanceResponse } from '@/types/BalanceResponse';
import Balances from './Balances';
import Nfts from './Nfts';
import { NFTResponse } from '@/types/NftResponse';

const AddressForm = () => {
  const [addresses, setAddresses] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState<BalanceResponse[]>([]);
  const [nfts, setNfts] = useState<NFTResponse[]>([]);
  const [selectedChain, setSelectedChain] = useState<string>('ethereum');

  const addAddress = () => {
    setAddresses([...addresses, ''])
  }

  const removeAddress = (index: number) => {
    if (index === 0) return // Prevent removing the first address
    const newAddresses = addresses.filter((_, i) => i !== index)
    setAddresses(newAddresses)
  }

  const handleChange = (index: number, value: string) => {
    const newAddresses = [...addresses]
    newAddresses[index] = value
    setAddresses(newAddresses)
  }

  const fetchBalances = async () => { 
    setBalances([]);
    try {
      const response = await axios.get("/api/getbalance", {
        params: {
          chain: selectedChain,
          addresses: addresses.join(","),
        },
      });
      if (response.data && response.data.length > 0) {
        setBalances(response.data);
      }
    } catch (error) {
      console.error(error);
      alert('Error fetching balances');
    }
  }
  const fetchNfts = async () => { 
    setNfts([]);
    try {
      const response = await axios.get("/api/getnfts", {
        params: {
          chain: selectedChain,
          addresses: addresses.join(","),
        },
      });
      setNfts(response.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching balances');
    }
  }
  const handleSubmit = async () => {
    try {
        if (addresses.length === 0 || addresses[0] === '') { 
          alert('Please enter at least one address');
          return;
        }
      if (selectedChain === '') { 
        alert('Please select a chain');
        return;
      }
        setLoading(true);
        await fetchBalances();
        await fetchNfts();
    } catch (error:any) {
        console.error(error);
    }finally{
        setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-3xl">
      <div className="border border-gray-300 rounded-lg p-5 pl-10">
        {addresses.map((address, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <div className="flex-grow">
              <Input type="text" placeholder="Wallet Address" value={address} onChange={(e) => handleChange(index, e.target.value)} />
            </div>
            <div className="w-10 flex justify-center">
              {index !== 0 && (
                <Button type="button" onClick={() => removeAddress(index)} className="p-2 w-20">
                  -
                </Button>
              )}
            </div>
          </div>
        ))}
        <div className="flex justify-end mt-4 pl-10">
          <Button type="button" onClick={addAddress}>
            +
          </Button>
        </div>
        <div className="flex items-center gap-4 justify-center mt-10">
          <ChainList selectedChain={selectedChain} setSelectedChain={setSelectedChain} />
          <Button disabled={loading} className="w-[180px]" type="button" onClick={handleSubmit}>
            {loading ? "Checking..." : "Get Data"} <Loader isLoading={loading} />
          </Button>
        </div>
      </div>
      <div className="mt-20">{balances.length > 0 && <Balances balances={balances} />}</div>
      <div className="mt-20">{nfts.length > 0 && <Nfts nftList={nfts} />}</div>
    </div>
  );
}

export default AddressForm