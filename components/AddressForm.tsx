'use client';
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Loader from './Loader';

const chainList = [
    'ethereum',
    'ethereum-sepolia',
    'celo',
    'celo-testnet',
    'bsc',
    'bsc-testnet',
    'polygon',
    'tezos',
    'eon',
    'chiliz'
]
const AddressForm = () => {
  const [addresses, setAddresses] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = () => {
    try {
        setLoading(true);
        console.log('addresses: ',addresses);
        console.log(addresses.join(','));
    } catch (error:any) {
        console.error(error);
        alert(error.message)
    }finally{
        setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-lg border border-gray-300 rounded-lg p-5 pl-10">
        
      {addresses.map((address, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <div className="flex-grow">
            <Input 
              type="text" 
              placeholder="Wallet Address" 
              value={address}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
          <div className="w-10 flex justify-center">
            {index !== 0 && (
              <Button type="button" onClick={() => removeAddress(index)} className="p-2 w-20">-</Button>
            )}
          </div>
        </div>
      ))}
      <div className="flex justify-end mt-4 pl-10">
        <Button type="button" onClick={addAddress}>+</Button>
      </div>
      <div className='flex items-center gap-4 justify-center mt-10'>
        <Select disabled={loading}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="select a chain" />
            </SelectTrigger>
            <SelectContent>
                {chainList.map((chain)=>(
                    <SelectItem value={chain}>{chain}</SelectItem>
                ))}
            </SelectContent>
        </Select>
        <Button disabled={loading} className='w-[180px]' type="button" onClick={handleSubmit}>{loading ? 'Checking...' : 'Get Data'} <Loader isLoading={loading} /></Button>
      </div>
      
    </div>
  )
}

export default AddressForm