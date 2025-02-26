import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../../store/cart'
import { describe, test, expect, beforeEach } from 'vitest'

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('начальное состояние корзины пустое', () => {
    const cart = useCartStore()//создаем корзину
    expect(cart.items).toEqual([])//проверяем что корзина пустая
    expect(cart.totalItems).toBe(0)//проверяем что количество товаров в корзине равно 0
    expect(cart.totalPrice).toBe(0)//проверяем что общая стоимость товаров в корзине равна 0
  })

  test('добавление товара в корзину', () => {
    const cart = useCartStore()//создаем корзину
    const product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      image: 'test.jpg'
    }

    cart.addToCart(product)
    expect(cart.items).toHaveLength(1)//проверяем что в корзине 1 товар
    expect(cart.items[0]).toEqual({ //проверяем что товар добавился в корзину
      ...product, //проверяем что товар добавился в корзину
      quantity: 1 //проверяем что количество товаров в корзине равно 1
    })
    expect(cart.totalItems).toBe(1)//проверяем что количество товаров в корзине равно 1
    expect(cart.totalPrice).toBe(100)//проверяем что общая стоимость товаров в корзине равна 100
  })

  test('увеличение количества при повторном добавлении', () => {
    const cart = useCartStore()//создаем корзину
    const product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      image: 'test.jpg'
    }

    cart.addToCart(product)//добавляем товар в корзину
    cart.addToCart(product)//добавляем товар в корзину
    expect(cart.items).toHaveLength(1)//проверяем что в корзине 1 товар
    expect(cart.items[0].quantity).toBe(2)//проверяем что количество товаров в корзине равно 2
    expect(cart.totalItems).toBe(2)//проверяем что количество товаров в корзине равно 2
    expect(cart.totalPrice).toBe(200)//проверяем что общая стоимость товаров в корзине равна 200
  })

  test('удаление товара из корзины', () => {
    const cart = useCartStore()
    const product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      image: 'test.jpg'
    }

    cart.addToCart(product) //добавляем товар в корзину
    cart.removeFromCart(1) //удаляем товар из корзины
    expect(cart.items).toHaveLength(0) //проверяем что в корзине 0 товаров
    expect(cart.totalItems).toBe(0) //проверяем что количество товаров в корзине равно 0
    expect(cart.totalPrice).toBe(0) //проверяем что общая стоимость товаров в корзине равна 0
  })

  test('очистка корзины', () => {
    const cart = useCartStore()
    const product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      image: 'test.jpg'
    }

    cart.addToCart(product) //добавляем товар в корзину
    cart.clearCart() //очищаем корзину
    expect(cart.items).toHaveLength(0) //проверяем что в корзине 0 товаров
    expect(cart.totalItems).toBe(0) //проверяем что количество товаров в корзине равно 0
    expect(cart.totalPrice).toBe(0) //проверяем что общая стоимость товаров в корзине равна 0
  })
}) 