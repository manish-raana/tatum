import { NextRequest, NextResponse } from "next/server";
import tatumdocs from "@api/tatumdocs";
import { NFTChain } from "@/enums/Chain";

export async function GET(request: NextRequest) {
  tatumdocs.auth(process.env.API_KEY || "");
  try {
    const { searchParams } = new URL(request.url);
    if (!searchParams.has("chain") || !searchParams.has("addresses") || searchParams.get("addresses") === "") {
      return NextResponse.json({ error: "Missing required parameters." }, { status: 400 });
    }
    const chain: NFTChain = searchParams.get("chain") as NFTChain;
    const addresses = searchParams.get("addresses");
    const response = await tatumdocs.getCollectionsV4({ chain: chain, collectionAddresses: addresses!, tokenTypes: "nft" });
    return NextResponse.json(response?.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error);
  }
}
