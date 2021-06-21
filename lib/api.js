import { createClient } from 'microcms-js-sdk'

// Initialize Client SDK.
const api = createClient({
  serviceDomain: process.env.API_NAME,
  apiKey: process.env.API_KEY
})

export default api
