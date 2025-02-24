import fallbackProducts from '~/data/products.json'

export default defineEventHandler(async (event) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products', {
      signal: AbortSignal.timeout(5000) // таймаут 5 секунд
    })
    if (!response.ok) throw new Error('API Error')
    return await response.json()
  } catch (error) {
    console.warn('Using fallback products data')
    return fallbackProducts
  }
}) 