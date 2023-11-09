import { createClient } from 'urql'

const API_URL = 'https://api-v2.lens.dev'

/* creates the API client */
export const client = createClient({
  url: API_URL
})
