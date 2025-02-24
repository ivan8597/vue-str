export default defineEventHandler(async (event) => { // Получаем путь к изображению
  if (!event.context.params) { // Если нет параметра пути, возвращаем ошибку
    return createError({
      statusCode: 400,
      message: 'Missing path parameter'
    })
  }
  
  const path = event.context.params.path // Получаем путь к изображению
  if (!path) { // Если нет пути, возвращаем ошибку
    return createError({
      statusCode: 400,
      message: 'Missing path parameter'
    })
  }
  
  try {
    const response = await fetch(`https://fakestoreapi.com/img/${path}`) // Получаем изображение
    if (!response.ok) throw new Error('Image not found') // Если нет изображения, возвращаем ошибку
    
    const buffer = await response.arrayBuffer() // Получаем буфер изображения
    return buffer // Возвращаем буфер изображения
  } catch (error) {
    return createError({
      statusCode: 404,
      message: 'Image not found'
    })
  }
}) 