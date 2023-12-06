import { createClient } from 'urql'

const network: 'polygon' | 'mumbai' = 'polygon';

const API_URL = 'https://api-v2.lens.dev'
const TESTNET_API_URL = 'https://api-v2-mumbai-live.lens.dev'

/* creates the API client */
export const client = createClient({
  url: network == 'mainnet' ? API_URL : TESTNET_API_URL,
})
