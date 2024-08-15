import { NextRequest, NextResponse } from "next/server";
import tatumdocs from "@api/tatumdocs";
import { BalanceChain } from "@/enums/Chain";

export async function GET(request: NextRequest) {  
  tatumdocs.auth(process.env.API_KEY || '');
  try {
    const { searchParams } = new URL(request.url);
    if (!searchParams.has("chain") || !searchParams.has("addresses") || searchParams.get("addresses") === "") {
      return NextResponse.json({error: "Missing required parameters."} , { status: 400 });
    }
    const chain: BalanceChain = searchParams.get("chain") as BalanceChain;
    const addresses = searchParams.get("addresses");
    const response = await tatumdocs.getBalancesV4({ chain: chain, addresses: addresses! });
    return NextResponse.json(response?.data?.result , { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error);
  }
}