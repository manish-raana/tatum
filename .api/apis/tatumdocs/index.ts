import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'tatumdocs/1.1.2 (api/6.1.2)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * <p><b>10 credits per API call</b></p>
   * <p>Get all NFTs (ERC-721 and ERC-1155) and multitokens (ERC-1155 only) of your favorite
   * collections! Our API lets you search for all tokens on:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon / polygon-amoy</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * <li>Tezos - tezos-mainnet</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name and comma-separated list of collection addresses. Our API will
   * return relevant information about each token, including its name, description, image,
   * and more.</li>
   * <li>Aside from relevant information about each token, the response also contains
   * metadata (they can, however, be excluded by setting <code>excludeMetadata</code> to
   * <code>true</code>).</li>
   * <li>If not specified, the API returns results for all supported types of tokens (nft,
   * multitokens), but you can also choose to filter only one <code>tokenType</code>.</li>
   * <li>For Tezos blockchain query parameters <code>excludeMetadata</code> and
   * <code>tokenType</code> won't have any effect on filtering data.</li>
   * </ul>
   *
   *
   * @summary Get tokens from a collection
   * @throws FetchError<400, types.GetCollectionsV4Response400> Bad Request
   * @throws FetchError<401, types.GetCollectionsV4Response401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetCollectionsV4Response403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetCollectionsV4Response500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getCollectionsV4(metadata: types.GetCollectionsV4MetadataParam): Promise<FetchResponse<200, types.GetCollectionsV4Response200>> {
    return this.core.fetch('/v4/data/collections', 'get', metadata);
  }

  /**
   * <p><b>10 credits per API call</b></p>
   * <p>Get all NFTs (ERC-721 and ERC-1155) and multitokens (ERC-1155 only) of your favorite
   * collections! Our API lets you search for all tokens on:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon / polygon-amoy</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * <li>Tezos - tezos-mainnet</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name and comma-separated list of collection addresses. Our API will
   * return relevant information about each token, including its name, description, image,
   * and more.</li>
   * <li>Aside from relevant information about each token, the response also contains
   * metadata (they can, however, be excluded by setting <code>excludeMetadata</code> to
   * <code>true</code>).</li>
   * <li>If not specified, the API returns results for all supported types of tokens (nft,
   * multitokens), but you can also choose to filter only one <code>tokenType</code>.</li>
   * <li>For Tezos blockchain query parameters <code>excludeMetadata</code> and
   * <code>tokenType</code> won't have any effect on filtering data.</li>
   * </ul>
   *
   *
   * @summary Get tokens from a collection
   * @throws FetchError<400, types.GetCollectionsResponse400> Bad Request
   * @throws FetchError<401, types.GetCollectionsResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetCollectionsResponse403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetCollectionsResponse500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getCollections(metadata: types.GetCollectionsMetadataParam): Promise<FetchResponse<200, types.GetCollectionsResponse200>> {
    return this.core.fetch('/v3/data/collections', 'get', metadata);
  }

  /**
   * <p><b>5 credits per API call</b></p>
   * <p>Get metadata of NFTs (ERC-721 and ERC-1155) or multitokens (ERC-1155 only) by IDs for
   * a given token address! Our API lets you search for all tokens on:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name, token address and comma-separated list of IDs. Our API will
   * return relevant metadata about each specified token, including its name, description,
   * image, and more.</li>
   * <li>Aside from the metadata information, the response also contains token types and
   * metadata url minted in each token.</li>
   * </ul>
   *
   *
   * @summary Get token metadata
   * @throws FetchError<400, types.GetMetadataV4Response400> Bad Request
   * @throws FetchError<401, types.GetMetadataV4Response401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetMetadataV4Response403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetMetadataV4Response500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getMetadataV4(metadata: types.GetMetadataV4MetadataParam): Promise<FetchResponse<200, types.GetMetadataV4Response200>> {
    return this.core.fetch('/v4/data/metadata', 'get', metadata);
  }

  /**
   * <p><b>5 credits per API call</b></p>
   * <p>Get metadata of NFTs (ERC-721 and ERC-1155) or multitokens (ERC-1155 only) by IDs for
   * a given token address! Our API lets you search for all tokens on:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name, token address and comma-separated list of IDs. Our API will
   * return relevant metadata about each specified token, including its name, description,
   * image, and more.</li>
   * <li>Aside from the metadata information, the response also contains token types and
   * metadata url minted in each token.</li>
   * </ul>
   *
   *
   * @summary Get token metadata
   * @throws FetchError<400, types.GetMetadataResponse400> Bad Request
   * @throws FetchError<401, types.GetMetadataResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetMetadataResponse403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetMetadataResponse500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getMetadata(metadata: types.GetMetadataMetadataParam): Promise<FetchResponse<200, types.GetMetadataResponse200>> {
    return this.core.fetch('/v3/data/metadata', 'get', metadata);
  }

  /**
   * <p><b>50 credits per API call</b></p>
   * <p>Get balances of fungible tokens (ERC-20), NFTs (ERC-721 and ERC-1155) or multitokens
   * (ERC-1155 only) for a specific wallet address on the following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon</li>
   * <li>Tezos - tezos-mainnet</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name and comma-separated list of addresses. Our API will return
   * balances of each token along with further information such as its type, id, and
   * more.</li>
   * <li>Aside from relevant information about each token and its balance, the response also
   * contains metadata (they can, however, be excluded by setting
   * <code>excludeMetadata</code> to <code>true</code>).</li>
   * <li>If not specified, the API returns balances for all supported types of tokens
   * (fungible tokens, nft, multitokens), but you can also choose to filter specific
   * <code>tokenTypes</code>.</li>
   * <li>For Tezos blockchain, the API returns balance of any tokens including native token
   * (XTZ) for specified wallet addresses. Following query parameters won't have any effect
   * on filtering data <code>excludeMetadata</code>.</li>
   * </ul>
   *
   *
   * @summary Get balances of addresses
   * @throws FetchError<400, types.GetBalancesV4Response400> Bad Request
   * @throws FetchError<401, types.GetBalancesV4Response401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetBalancesV4Response403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetBalancesV4Response500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getBalancesV4(metadata: types.GetBalancesV4MetadataParam): Promise<FetchResponse<200, types.GetBalancesV4Response200>> {
    return this.core.fetch('/v4/data/balances', 'get', metadata);
  }

  /**
   * <p><b>50 credits per API call</b></p>
   * <p>Get balances of fungible tokens (ERC-20), NFTs (ERC-721 and ERC-1155) or multitokens
   * (ERC-1155 only) for a specific wallet address on the following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon</li>
   * <li>Tezos - tezos-mainnet</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name and comma-separated list of addresses. Our API will return
   * balances of each token along with further information such as its type, id, and
   * more.</li>
   * <li>Aside from relevant information about each token and its balance, the response also
   * contains metadata (they can, however, be excluded by setting
   * <code>excludeMetadata</code> to <code>true</code>).</li>
   * <li>If not specified, the API returns balances for all supported types of tokens
   * (fungible tokens, nft, multitokens), but you can also choose to filter specific
   * <code>tokenTypes</code>.</li>
   * <li>For Tezos blockchain, the API returns balance of any tokens including native token
   * (XTZ) for specified wallet addresses. Following query parameters won't have any effect
   * on filtering data <code>excludeMetadata</code>.</li>
   * </ul>
   *
   *
   * @summary Get balances of addresses
   * @throws FetchError<400, types.GetBalancesResponse400> Bad Request
   * @throws FetchError<401, types.GetBalancesResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetBalancesResponse403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetBalancesResponse500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getBalances(metadata: types.GetBalancesMetadataParam): Promise<FetchResponse<200, types.GetBalancesResponse200>> {
    return this.core.fetch('/v3/data/balances', 'get', metadata);
  }

  /**
   * <p><b>20 credits per API call</b></p>
   * <p>Get all addresses that own your favorite token (ERC-20, ERC-721 or ERC-1155)! Our API
   * lets you search for all token owners on:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name and address of any fungible token, NFT or multitoken
   * collection. Our API will return a list of addresses of all of their owners.</li>
   * <li>You can also get an owner of a specific NFT by specifying <code>tokenId</code>. In
   * case of multitoken, result is an array of addresses.</li>
   * </ul>
   *
   *
   * @summary Get owners of a token
   * @throws FetchError<400, types.GetOwnersV4Response400> Bad Request
   * @throws FetchError<401, types.GetOwnersV4Response401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetOwnersV4Response403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetOwnersV4Response500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getOwnersV4(metadata: types.GetOwnersV4MetadataParam): Promise<FetchResponse<200, types.GetOwnersV4Response200>> {
    return this.core.fetch('/v4/data/owners', 'get', metadata);
  }

  /**
   * <p><b>20 credits per API call</b></p>
   * <p>Get all addresses that own your favorite token (ERC-20, ERC-721 or ERC-1155)! Our API
   * lets you search for all token owners on:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name and address of any fungible token, NFT or multitoken
   * collection. Our API will return a list of addresses of all of their owners.</li>
   * <li>You can also get an owner of a specific NFT by specifying <code>tokenId</code>. In
   * case of multitoken, result is an array of addresses.</li>
   * </ul>
   *
   *
   * @summary Get owners of a token
   * @throws FetchError<400, types.GetOwnersResponse400> Bad Request
   * @throws FetchError<401, types.GetOwnersResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetOwnersResponse403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetOwnersResponse500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getOwners(metadata: types.GetOwnersMetadataParam): Promise<FetchResponse<200, types.GetOwnersResponse200>> {
    return this.core.fetch('/v3/data/owners', 'get', metadata);
  }

  /**
   * <p><b>1 credit per API call</b></p>
   * <p>Check if wallet address owns any specified token (ERC-20, ERC-721 or ERC-1155) on the
   * following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name, wallet address and address of any fungible token, NFT or
   * multitoken collection. Our API will return <code>true</code> if provided wallet address
   * owns them.</li>
   * <li>If wallet address does not own the specific token, response body is
   * <code>false</code> and status code is <code>200</code>.</li>
   * <li>It is also possible to check if wallet address owns a specific NFT by specifying a
   * <code>tokenId</code>.</li>
   * </ul>
   *
   *
   * @summary Check owner of token
   * @throws FetchError<400, types.CheckOwnerV4Response400> Bad Request
   * @throws FetchError<401, types.CheckOwnerV4Response401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.CheckOwnerV4Response403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.CheckOwnerV4Response500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  checkOwnerV4(metadata: types.CheckOwnerV4MetadataParam): Promise<FetchResponse<200, types.CheckOwnerV4Response200>> {
    return this.core.fetch('/v4/data/owners/address', 'get', metadata);
  }

  /**
   * <p><b>1 credit per API call</b></p>
   * <p>Check if wallet address owns any specified token (ERC-20, ERC-721 or ERC-1155) on the
   * following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name, wallet address and address of any fungible token, NFT or
   * multitoken collection. Our API will return <code>true</code> if provided wallet address
   * owns them.</li>
   * <li>If wallet address does not own the specific token, response body is
   * <code>false</code> and status code is <code>200</code>.</li>
   * <li>It is also possible to check if wallet address owns a specific NFT by specifying a
   * <code>tokenId</code>.</li>
   * </ul>
   *
   *
   * @summary Check owner of token
   * @throws FetchError<400, types.CheckOwnerResponse400> Bad Request
   * @throws FetchError<401, types.CheckOwnerResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.CheckOwnerResponse403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.CheckOwnerResponse500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  checkOwner(metadata: types.CheckOwnerMetadataParam): Promise<FetchResponse<200, types.CheckOwnerResponse200>> {
    return this.core.fetch('/v3/data/owners/address', 'get', metadata);
  }

  /**
   * <p><b>20 credits per API call</b></p>
   * <p>Get transactions on the following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon</li>
   * <li>Tezos - tezos-mainnet</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name and comma-separated list of addresses. Our API will return all
   * of their transactions along with further information such as their block number, ID of
   * involved token, and more.</li>
   * <li>If not specified, the API returns transactions of various types (fungible, nft,
   * multitoken, native), but you can also choose to filter specific
   * <code>transactionTypes</code> and even <code>transactionSubtype</code> (incoming,
   * outgoing, zero-transfer).</li>
   * <li>On top of that, you can add further filters such as specifying block range where the
   * transactions should have occurred, or address and ID of involved tokens.</li>
   * <li>For Tezos blockchain, the API accepts only one wallet address in
   * <code>addresses</code> query parameter. Following query parameters won't have any effect
   * on filtering data: <code>transactionTypes</code>, <code>transactionSubtype</code>,
   * <code>tokenId</code>, <code>blockTo</code>.</li>
   * <li>When querying Tezos transactions for a specified wallet or contract address,
   * pagination is supported via <code>pageSize</code> and <code>offset</code> query
   * parameters. 
   * <li>When querying Tezos transactions for a specified block, pagination is supported via
   * <code>cursor</code> query parameter, by filling in the value from <code>prevPage</code>
   * or <code>nextPage</code> field in the response body.</li>
   * <li><b>When you are filtering data using blockFrom and not using blockTo, blockTo is
   * automatically added as blockFrom + 1000. The same applies when blockTo is present and
   * blockFrom is not. In that case blockFrom is automatically added as blockTo -
   * 1000.</b></li>
   * </ul>
   *
   *
   * @summary Get transactions
   * @throws FetchError<400, types.GetTransactionsV4Response400> Bad Request
   * @throws FetchError<401, types.GetTransactionsV4Response401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetTransactionsV4Response403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetTransactionsV4Response500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getTransactionsV4(metadata: types.GetTransactionsV4MetadataParam): Promise<FetchResponse<200, types.GetTransactionsV4Response200>> {
    return this.core.fetch('/v4/data/transactions', 'get', metadata);
  }

  /**
   * <p><b>20 credits per API call</b></p>
   * <p>Get transactions on the following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon</li>
   * <li>Tezos - tezos-mainnet</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name and comma-separated list of addresses. Our API will return all
   * of their transactions along with further information such as their block number, ID of
   * involved token, and more.</li>
   * <li>If not specified, the API returns transactions of various types (fungible, nft,
   * multitoken, native), but you can also choose to filter specific
   * <code>transactionTypes</code> and even <code>transactionSubtype</code> (incoming,
   * outgoing, zero-transfer).</li>
   * <li>On top of that, you can add further filters such as specifying block range where the
   * transactions should have occurred, or address and ID of involved tokens.</li>
   * <li>For Tezos blockchain, the API accepts only one wallet address in
   * <code>addresses</code> query parameter. Following query parameters won't have any effect
   * on filtering data: <code>transactionTypes</code>, <code>transactionSubtype</code>,
   * <code>tokenId</code>, <code>blockTo</code>.</li>
   * <li>When querying Tezos transactions for a specified wallet or contract address,
   * pagination is supported via <code>pageSize</code> and <code>offset</code> query
   * parameters. 
   * <li>When querying Tezos transactions for a specified block, pagination is supported via
   * <code>cursor</code> query parameter, by filling in the value from <code>prevPage</code>
   * or <code>nextPage</code> field in the response body.</li>
   * <li><b>When you are filtering data using blockFrom and not using blockTo, blockTo is
   * automatically added as blockFrom + 1000. The same applies when blockTo is present and
   * blockFrom is not. In that case blockFrom is automatically added as blockTo -
   * 1000.</b></li>
   * </ul>
   *
   *
   * @summary Get transactions
   * @throws FetchError<400, types.GetTransactionsResponse400> Bad Request
   * @throws FetchError<401, types.GetTransactionsResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetTransactionsResponse403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetTransactionsResponse500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getTransactions(metadata: types.GetTransactionsMetadataParam): Promise<FetchResponse<200, types.GetTransactionsResponse200>> {
    return this.core.fetch('/v3/data/transactions', 'get', metadata);
  }

  /**
   * <p><b>5 credits per API call</b></p>
   * <p>Get transactions by hash on the following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon</li>
   * <li>Tezos - tezos-mainnet</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name and transaction hash, and our API will return a list of
   * transactions with that hash.</li>
   * <li>The response will contain all the relevant information about specified transactions
   * such as their block number, IDs of involved token, and more.</li>
   * </ul>
   *
   *
   * @summary Get transactions by hash
   * @throws FetchError<400, types.GetTransactionsByHashV4Response400> Bad Request
   * @throws FetchError<401, types.GetTransactionsByHashV4Response401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetTransactionsByHashV4Response403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetTransactionsByHashV4Response500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getTransactionsByHashV4(metadata: types.GetTransactionsByHashV4MetadataParam): Promise<FetchResponse<200, types.GetTransactionsByHashV4Response200>> {
    return this.core.fetch('/v4/data/transactions/hash', 'get', metadata);
  }

  /**
   * <p><b>5 credits per API call</b></p>
   * <p>Get transactions by hash on the following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon</li>
   * <li>Tezos - tezos-mainnet</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name and transaction hash, and our API will return a list of
   * transactions with that hash.</li>
   * <li>The response will contain all the relevant information about specified transactions
   * such as their block number, IDs of involved token, and more.</li>
   * </ul>
   *
   *
   * @summary Get transactions by hash
   * @throws FetchError<400, types.GetTransactionsByHashResponse400> Bad Request
   * @throws FetchError<401, types.GetTransactionsByHashResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetTransactionsByHashResponse403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetTransactionsByHashResponse500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getTransactionsByHash(metadata: types.GetTransactionsByHashMetadataParam): Promise<FetchResponse<200, types.GetTransactionsByHashResponse200>> {
    return this.core.fetch('/v3/data/transactions/hash', 'get', metadata);
  }

  /**
   * <p><b>20 credits per API call</b></p>
   * <p>Get all events on given addresses and / or in the requested block range on the
   * following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>To improve response times and obtain specific data, it is recommended to use proper
   * filtering techniques. Please provide a chain name and a combination of filters that will
   * accomplish this (at least block range or contract addresses must be specified).</li>
   * <li>It is possible to specify multiple contract addresses at once by passing them as a
   * comma separated string.</li>
   * <li>If block range is not specified, the API attempts to go through all available
   * blocks, which may result in a timeout error.</li>
   * <li>When you are filtering data using blockFrom and not using blockTo, blockTo is
   * automatically added as blockFrom + 1000. The same applies when blockTo is present and
   * blockFrom is not. In that case blockFrom is automatically added as blockTo - 1000.</li>
   * <li>It is recommended to filter only one specific type of events, which comes with
   * built-in decoding for all the supported types.</li>
   * <li>It is, however, also possible to filter by signature hashes, which can be passed
   * together as a comma separated string.</li>
   * </ul>
   * <p>As noted above, aside from general info and hashed event data, the API also decodes
   * them for you in case you filter by one of the following supported event types:</p>
   * <ul>
   * <li><code>tokenTransfer</code>: All transfers of fungible tokens (including stablecoins)
   * and NFTs as per ERC-20 and ERC-721 standard.</li>
   * <li><code>multitokenTransfer</code>: All transfers of multitokens (both single transfers
   * and batch transfers) as per ERC-1155 standard.</li>
   * <li><code>stablecoinTransfer</code>: Refers to the transfer of specific stablecoins on
   * the mainnet. Typically, the top 10 to 16 stablecoins on each chain according to
   * CoinMarketCap are included. If the <code>contractAddresses</code> parameter is also used
   * in the filter combination, any tokens specified in it will also be included in the
   * list.</li>
   * <li><code>uniswapTrade</code>: Provides all swap events that occur on both Uniswap V2
   * and V3. In some cases, it may not be possible to map the swapped amounts to specific
   * tokens. As a result, certain decoded data such as token amounts might be missing or in
   * the original big number format. This will be indicated by the response parameter
   * <code>partiallyRaw: true</code>.</li>
   * </ul>
   *
   *
   * @summary Get specified events
   * @throws FetchError<400, types.GetEventsV4Response400> Bad Request
   * @throws FetchError<401, types.GetEventsV4Response401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetEventsV4Response403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetEventsV4Response500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getEventsV4(metadata: types.GetEventsV4MetadataParam): Promise<FetchResponse<200, types.GetEventsV4Response200>> {
    return this.core.fetch('/v4/data/events', 'get', metadata);
  }

  /**
   * <p><b>20 credits per API call</b></p>
   * <p>Get all events on given addresses and / or in the requested block range on the
   * following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>To improve response times and obtain specific data, it is recommended to use proper
   * filtering techniques. Please provide a chain name and a combination of filters that will
   * accomplish this (at least block range or contract addresses must be specified).</li>
   * <li>It is possible to specify multiple contract addresses at once by passing them as a
   * comma separated string.</li>
   * <li>If block range is not specified, the API attempts to go through all available
   * blocks, which may result in a timeout error.</li>
   * <li>When you are filtering data using blockFrom and not using blockTo, blockTo is
   * automatically added as blockFrom + 1000. The same applies when blockTo is present and
   * blockFrom is not. In that case blockFrom is automatically added as blockTo - 1000.</li>
   * <li>It is recommended to filter only one specific type of events, which comes with
   * built-in decoding for all the supported types.</li>
   * <li>It is, however, also possible to filter by signature hashes, which can be passed
   * together as a comma separated string.</li>
   * </ul>
   * <p>As noted above, aside from general info and hashed event data, the API also decodes
   * them for you in case you filter by one of the following supported event types:</p>
   * <ul>
   * <li><code>tokenTransfer</code>: All transfers of fungible tokens (including stablecoins)
   * and NFTs as per ERC-20 and ERC-721 standard.</li>
   * <li><code>multitokenTransfer</code>: All transfers of multitokens (both single transfers
   * and batch transfers) as per ERC-1155 standard.</li>
   * <li><code>stablecoinTransfer</code>: Refers to the transfer of specific stablecoins on
   * the mainnet. Typically, the top 10 to 16 stablecoins on each chain according to
   * CoinMarketCap are included. If the <code>contractAddresses</code> parameter is also used
   * in the filter combination, any tokens specified in it will also be included in the
   * list.</li>
   * <li><code>uniswapTrade</code>: Provides all swap events that occur on both Uniswap V2
   * and V3. In some cases, it may not be possible to map the swapped amounts to specific
   * tokens. As a result, certain decoded data such as token amounts might be missing or in
   * the original big number format. This will be indicated by the response parameter
   * <code>partiallyRaw: true</code>.</li>
   * </ul>
   *
   *
   * @summary Get specified events
   * @throws FetchError<400, types.GetEventsResponse400> Bad Request
   * @throws FetchError<401, types.GetEventsResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetEventsResponse403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetEventsResponse500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getEvents(metadata: types.GetEventsMetadataParam): Promise<FetchResponse<200, types.GetEventsResponse200>> {
    return this.core.fetch('/v3/data/events', 'get', metadata);
  }

  /**
   * <p><b>10 credits per API call</b></p>
   * <p>Get information about blocks (when they were added, how many NFTs and events were
   * ingested and list of transaction hashes that were processed within them) on the
   * following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * </ul>
   * <p>To get started, provide a chain and specify one of the filters listed below
   * (combination of these filters is not allowed):</p>
   * <ul>
   * <li>List of block numbers separated by comma</li>
   * <li>Range of block numbers</li>
   * <li>Date range when blocks were processed</li>
   * <li>When you are filtering data using blockFrom and not using blockTo, blockTo is
   * automatically added as blockFrom + 1000. The same applies when blockTo is present and
   * blockFrom is not. In that case blockFrom is automatically added as blockTo - 1000.</li>
   * </ul>
   *
   *
   * @summary Get specified blocks
   * @throws FetchError<400, types.GetBlocksV4Response400> Bad Request
   * @throws FetchError<401, types.GetBlocksV4Response401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetBlocksV4Response403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetBlocksV4Response500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getBlocksV4(metadata: types.GetBlocksV4MetadataParam): Promise<FetchResponse<200, types.GetBlocksV4Response200>> {
    return this.core.fetch('/v4/data/blocks', 'get', metadata);
  }

  /**
   * <p><b>10 credits per API call</b></p>
   * <p>Get information about blocks (when they were added, how many NFTs and events were
   * ingested and list of transaction hashes that were processed within them) on the
   * following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * </ul>
   * <p>To get started, provide a chain and specify one of the filters listed below
   * (combination of these filters is not allowed):</p>
   * <ul>
   * <li>List of block numbers separated by comma</li>
   * <li>Range of block numbers</li>
   * <li>Date range when blocks were processed</li>
   * <li>When you are filtering data using blockFrom and not using blockTo, blockTo is
   * automatically added as blockFrom + 1000. The same applies when blockTo is present and
   * blockFrom is not. In that case blockFrom is automatically added as blockTo - 1000.</li>
   * </ul>
   *
   *
   * @summary Get specified blocks
   * @throws FetchError<400, types.GetBlocksResponse400> Bad Request
   * @throws FetchError<401, types.GetBlocksResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetBlocksResponse403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetBlocksResponse500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getBlocks(metadata: types.GetBlocksMetadataParam): Promise<FetchResponse<200, types.GetBlocksResponse200>> {
    return this.core.fetch('/v3/data/blocks', 'get', metadata);
  }

  /**
   * <p><b>1 credit per API call</b></p>
   * <p>Get information about latest added block on the following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * </ul>
   * <p>To get started, you can just provide a chain.</p>
   *
   *
   * @summary Get latest block
   * @throws FetchError<400, types.GetLatestBlockV4Response400> Bad Request
   * @throws FetchError<401, types.GetLatestBlockV4Response401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetLatestBlockV4Response403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetLatestBlockV4Response500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getLatestBlockV4(metadata: types.GetLatestBlockV4MetadataParam): Promise<FetchResponse<200, types.GetLatestBlockV4Response200>> {
    return this.core.fetch('/v4/data/blocks/latest', 'get', metadata);
  }

  /**
   * <p><b>1 credit per API call</b></p>
   * <p>Get information about latest added block on the following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * </ul>
   * <p>To get started, you can just provide a chain.</p>
   *
   *
   * @summary Get latest block
   * @throws FetchError<400, types.GetLatestBlockResponse400> Bad Request
   * @throws FetchError<401, types.GetLatestBlockResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetLatestBlockResponse403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetLatestBlockResponse500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getLatestBlock(metadata: types.GetLatestBlockMetadataParam): Promise<FetchResponse<200, types.GetLatestBlockResponse200>> {
    return this.core.fetch('/v3/data/blocks/latest', 'get', metadata);
  }

  /**
   * <p><b>1 credit per API call</b></p>
   * <p>Get information about your favorite token! Our API lets you search for all tokens
   * on:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * <li>Tezos - tezos-mainnet</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain and address of any fungible token, NFT or multitoken collection. If
   * available, our API will return information about them such as their name, symbol,
   * supply, and more.</li>
   * <li>You can also get extra infomation (such as metadata) of a specific NFT or multitoken
   * by passing <code>tokenId</code> as a query parameter.</li>
   * </ul>
   *
   *
   * @summary Get information about collection or token
   * @throws FetchError<400, types.GetTokensV4Response400> Bad Request
   * @throws FetchError<401, types.GetTokensV4Response401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetTokensV4Response403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<404, types.GetTokensV4Response404> Collection or token not found.
   * @throws FetchError<500, types.GetTokensV4Response500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getTokensV4(metadata: types.GetTokensV4MetadataParam): Promise<FetchResponse<200, types.GetTokensV4Response200>> {
    return this.core.fetch('/v4/data/tokens', 'get', metadata);
  }

  /**
   * <p><b>1 credit per API call</b></p>
   * <p>Get information about your favorite token! Our API lets you search for all tokens
   * on:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon</li>
   * <li>Horizen EON - eon-mainnet</li>
   * <li>Chiliz - chiliz-mainnet</li>
   * <li>Tezos - tezos-mainnet</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain and address of any fungible token, NFT or multitoken collection. If
   * available, our API will return information about them such as their name, symbol,
   * supply, and more.</li>
   * <li>You can also get extra infomation (such as metadata) of a specific NFT or multitoken
   * by passing <code>tokenId</code> as a query parameter.</li>
   * </ul>
   *
   *
   * @summary Get information about collection or token
   * @throws FetchError<400, types.GetTokensResponse400> Bad Request
   * @throws FetchError<401, types.GetTokensResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetTokensResponse403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<404, types.GetTokensResponse404> Collection or token not found.
   * @throws FetchError<500, types.GetTokensResponse500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getTokens(metadata: types.GetTokensMetadataParam): Promise<FetchResponse<200, types.GetTokensResponse200>> {
    return this.core.fetch('/v3/data/tokens', 'get', metadata);
  }

  /**
   * <p><b>100 credits per API call</b></p>
   * <p>Get unspent UTXOs for a specific address up to a specific total amount.
   * If you want to prepare a transaction on UTXO-based chains like Bitcoin, you need to
   * enter unspent UTXOs to be able to perform a transaction. By providing ```totalValue```
   * as a total, our API will return a list of UTXOs that will be enough to cover the
   * transaction.</p>
   * Our API lets you get the unpenst UTXOs for a specific address on:</p>
   * <ul>
   * <li>Bitcoin - bitcoin / bitcoin-testnet</li>
   * <li>Litecoin - litecoin / litecoin-testnet</li>
   * <li>Dogecoin - doge / doge-testnet</li>
   * <li>Cardano - cardano / cardano-preprod</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain and address you want to list unspent UTXOs for. If available, our
   * API will return information about the unspent UTXOs for a specific address. API
   * traverses latest 200k incoming transactions.</li>
   * </ul>
   *
   *
   * @summary Get unspent UTXOs for an address
   * @throws FetchError<400, types.GetUtxosByAddressV4Response400> Bad Request
   * @throws FetchError<401, types.GetUtxosByAddressV4Response401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetUtxosByAddressV4Response403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetUtxosByAddressV4Response500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getUtxosByAddressV4(metadata: types.GetUtxosByAddressV4MetadataParam): Promise<FetchResponse<200, types.GetUtxosByAddressV4Response200>> {
    return this.core.fetch('/v4/data/utxos', 'get', metadata);
  }

  /**
   * <p><b>100 credits per API call</b></p>
   * <p>Get unspent UTXOs for a specific address up to a specific total amount.
   * If you want to prepare a transaction on UTXO-based chains like Bitcoin, you need to
   * enter unspent UTXOs to be able to perform a transaction. By providing ```totalValue```
   * as a total, our API will return a list of UTXOs that will be enough to cover the
   * transaction.</p>
   * Our API lets you get the unpenst UTXOs for a specific address on:</p>
   * <ul>
   * <li>Bitcoin - bitcoin / bitcoin-testnet</li>
   * <li>Litecoin - litecoin / litecoin-testnet</li>
   * <li>Dogecoin - doge / doge-testnet</li>
   * <li>Cardano - cardano / cardano-preprod</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain and address you want to list unspent UTXOs for. If available, our
   * API will return information about the unspent UTXOs for a specific address. API
   * traverses latest 200k incoming transactions.</li>
   * </ul>
   *
   *
   * @summary Get unspent UTXOs for an address
   * @throws FetchError<400, types.GetUtxosByAddressResponse400> Bad Request
   * @throws FetchError<401, types.GetUtxosByAddressResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetUtxosByAddressResponse403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetUtxosByAddressResponse500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getUtxosByAddress(metadata: types.GetUtxosByAddressMetadataParam): Promise<FetchResponse<200, types.GetUtxosByAddressResponse200>> {
    return this.core.fetch('/v3/data/utxos', 'get', metadata);
  }

  /**
   * <p><b>100 credits per address for each API call.</b></p>
   * <p>Retrieve unspent UTXOs for each provided address, up to a specified total amount.
   * If you want to prepare a transaction on UTXO-based chains like Bitcoin, you need to
   * enter unspent UTXOs to be able to perform a transaction. By providing ```totalValue```
   * as a total, our API will return a list of UTXOs that will be enough to cover the
   * transaction.</p>
   * Our API lets you get the unpenst UTXOs for a specific address on:</p>
   * <ul>
   * <li>Bitcoin - bitcoin / bitcoin-testnet</li>
   * <li>Litecoin - litecoin / litecoin-testnet</li>
   * <li>Dogecoin - doge / doge-testnet</li>
   * <li>Cardano - cardano / cardano-preprod</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain and addresses you want to list unspent UTXOs for. If available, our
   * API will return information about the unspent UTXOs for each address. API traverses
   * latest 200k incoming transactions.</li>
   * </ul>
   *
   *
   * @summary Get unspent UTXOs for a batch of addresses
   * @throws FetchError<400, types.GetUtxosByAddressBatchV4Response400> Bad Request
   * @throws FetchError<401, types.GetUtxosByAddressBatchV4Response401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetUtxosByAddressBatchV4Response403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetUtxosByAddressBatchV4Response500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getUtxosByAddressBatchV4(body: types.GetUtxosByAddressBatchV4BodyParam): Promise<FetchResponse<200, types.GetUtxosByAddressBatchV4Response200>> {
    return this.core.fetch('/v4/data/utxos/batch', 'post', body);
  }

  /**
   * <p><b>100 credits per address for each API call.</b></p>
   * <p>Retrieve unspent UTXOs for each provided address, up to a specified total amount.
   * If you want to prepare a transaction on UTXO-based chains like Bitcoin, you need to
   * enter unspent UTXOs to be able to perform a transaction. By providing ```totalValue```
   * as a total, our API will return a list of UTXOs that will be enough to cover the
   * transaction.</p>
   * Our API lets you get the unpenst UTXOs for a specific address on:</p>
   * <ul>
   * <li>Bitcoin - bitcoin / bitcoin-testnet</li>
   * <li>Litecoin - litecoin / litecoin-testnet</li>
   * <li>Dogecoin - doge / doge-testnet</li>
   * <li>Cardano - cardano / cardano-preprod</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain and addresses you want to list unspent UTXOs for. If available, our
   * API will return information about the unspent UTXOs for each address. API traverses
   * latest 200k incoming transactions.</li>
   * </ul>
   *
   *
   * @summary Get unspent UTXOs for a batch of addresses
   * @throws FetchError<400, types.GetUtxosByAddressBatchResponse400> Bad Request
   * @throws FetchError<401, types.GetUtxosByAddressBatchResponse401> Unauthorized. Not valid or inactive subscription key present in the HTTP Header.
   * @throws FetchError<403, types.GetUtxosByAddressBatchResponse403> Forbidden. The request is authenticated, but it is not possible to perform the
   * operation due to logical error or invalid permissions.
   * @throws FetchError<500, types.GetUtxosByAddressBatchResponse500> Internal server error. There was an error on the server during the processing of the
   * request.
   */
  getUtxosByAddressBatch(body: types.GetUtxosByAddressBatchBodyParam): Promise<FetchResponse<200, types.GetUtxosByAddressBatchResponse200>> {
    return this.core.fetch('/v3/data/utxos/batch', 'post', body);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { CheckOwnerMetadataParam, CheckOwnerResponse200, CheckOwnerResponse400, CheckOwnerResponse401, CheckOwnerResponse403, CheckOwnerResponse500, CheckOwnerV4MetadataParam, CheckOwnerV4Response200, CheckOwnerV4Response400, CheckOwnerV4Response401, CheckOwnerV4Response403, CheckOwnerV4Response500, GetBalancesMetadataParam, GetBalancesResponse200, GetBalancesResponse400, GetBalancesResponse401, GetBalancesResponse403, GetBalancesResponse500, GetBalancesV4MetadataParam, GetBalancesV4Response200, GetBalancesV4Response400, GetBalancesV4Response401, GetBalancesV4Response403, GetBalancesV4Response500, GetBlocksMetadataParam, GetBlocksResponse200, GetBlocksResponse400, GetBlocksResponse401, GetBlocksResponse403, GetBlocksResponse500, GetBlocksV4MetadataParam, GetBlocksV4Response200, GetBlocksV4Response400, GetBlocksV4Response401, GetBlocksV4Response403, GetBlocksV4Response500, GetCollectionsMetadataParam, GetCollectionsResponse200, GetCollectionsResponse400, GetCollectionsResponse401, GetCollectionsResponse403, GetCollectionsResponse500, GetCollectionsV4MetadataParam, GetCollectionsV4Response200, GetCollectionsV4Response400, GetCollectionsV4Response401, GetCollectionsV4Response403, GetCollectionsV4Response500, GetEventsMetadataParam, GetEventsResponse200, GetEventsResponse400, GetEventsResponse401, GetEventsResponse403, GetEventsResponse500, GetEventsV4MetadataParam, GetEventsV4Response200, GetEventsV4Response400, GetEventsV4Response401, GetEventsV4Response403, GetEventsV4Response500, GetLatestBlockMetadataParam, GetLatestBlockResponse200, GetLatestBlockResponse400, GetLatestBlockResponse401, GetLatestBlockResponse403, GetLatestBlockResponse500, GetLatestBlockV4MetadataParam, GetLatestBlockV4Response200, GetLatestBlockV4Response400, GetLatestBlockV4Response401, GetLatestBlockV4Response403, GetLatestBlockV4Response500, GetMetadataMetadataParam, GetMetadataResponse200, GetMetadataResponse400, GetMetadataResponse401, GetMetadataResponse403, GetMetadataResponse500, GetMetadataV4MetadataParam, GetMetadataV4Response200, GetMetadataV4Response400, GetMetadataV4Response401, GetMetadataV4Response403, GetMetadataV4Response500, GetOwnersMetadataParam, GetOwnersResponse200, GetOwnersResponse400, GetOwnersResponse401, GetOwnersResponse403, GetOwnersResponse500, GetOwnersV4MetadataParam, GetOwnersV4Response200, GetOwnersV4Response400, GetOwnersV4Response401, GetOwnersV4Response403, GetOwnersV4Response500, GetTokensMetadataParam, GetTokensResponse200, GetTokensResponse400, GetTokensResponse401, GetTokensResponse403, GetTokensResponse404, GetTokensResponse500, GetTokensV4MetadataParam, GetTokensV4Response200, GetTokensV4Response400, GetTokensV4Response401, GetTokensV4Response403, GetTokensV4Response404, GetTokensV4Response500, GetTransactionsByHashMetadataParam, GetTransactionsByHashResponse200, GetTransactionsByHashResponse400, GetTransactionsByHashResponse401, GetTransactionsByHashResponse403, GetTransactionsByHashResponse500, GetTransactionsByHashV4MetadataParam, GetTransactionsByHashV4Response200, GetTransactionsByHashV4Response400, GetTransactionsByHashV4Response401, GetTransactionsByHashV4Response403, GetTransactionsByHashV4Response500, GetTransactionsMetadataParam, GetTransactionsResponse200, GetTransactionsResponse400, GetTransactionsResponse401, GetTransactionsResponse403, GetTransactionsResponse500, GetTransactionsV4MetadataParam, GetTransactionsV4Response200, GetTransactionsV4Response400, GetTransactionsV4Response401, GetTransactionsV4Response403, GetTransactionsV4Response500, GetUtxosByAddressBatchBodyParam, GetUtxosByAddressBatchResponse200, GetUtxosByAddressBatchResponse400, GetUtxosByAddressBatchResponse401, GetUtxosByAddressBatchResponse403, GetUtxosByAddressBatchResponse500, GetUtxosByAddressBatchV4BodyParam, GetUtxosByAddressBatchV4Response200, GetUtxosByAddressBatchV4Response400, GetUtxosByAddressBatchV4Response401, GetUtxosByAddressBatchV4Response403, GetUtxosByAddressBatchV4Response500, GetUtxosByAddressMetadataParam, GetUtxosByAddressResponse200, GetUtxosByAddressResponse400, GetUtxosByAddressResponse401, GetUtxosByAddressResponse403, GetUtxosByAddressResponse500, GetUtxosByAddressV4MetadataParam, GetUtxosByAddressV4Response200, GetUtxosByAddressV4Response400, GetUtxosByAddressV4Response401, GetUtxosByAddressV4Response403, GetUtxosByAddressV4Response500 } from './types';
