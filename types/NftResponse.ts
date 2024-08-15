export type NFTResponse = {
    chain: string;
    tokenAddress: string;
    tokenId: string;
    tokenType: string;
    metadataURI: string;
    metadata: {
        attributes: [],
        image: string;
    }
}