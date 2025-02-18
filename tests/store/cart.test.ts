import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../../store/cart'
import { describe, test, expect, beforeEach } from 'vitest'

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('начальное состояние корзины пустое', () => {
    const cart = useCartStore()
    expect(cart.items).toEqual([])
    expect(cart.totalItems).toBe(0)
    expect(cart.totalPrice).toBe(0)
  })

  test('добавление товара в корзину', () => {
    const cart = useCartStore()
    const product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      image: 'test.jpg'
    }

    cart.addToCart(product)
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0]).toEqual({
      ...product,
      quantity: 1
    })
    expect(cart.totalItems).toBe(1)
    expect(cart.totalPrice).toBe(100)
  })

  test('увеличение количества при повторном добавлении', () => {
    const cart = useCartStore()
    const product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      image: 'test.jpg'
    }

    cart.addToCart(product)
    cart.addToCart(product)
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].quantity).toBe(2)
    expect(cart.totalItems).toBe(2)
    expect(cart.totalPrice).toBe(200)
  })

  test('удаление товара из корзины', () => {
    const cart = useCartStore()
    const product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      image: 'test.jpg'
    }

    cart.addToCart(product)
    cart.removeFromCart(1)
    expect(cart.items).toHaveLength(0)
    expect(cart.totalItems).toBe(0)
    expect(cart.totalPrice).toBe(0)
  })

  test('очистка корзины', () => {
    const cart = useCartStore()
    const product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      image: 'test.jpg'
    }

    cart.addToCart(product)
    cart.clearCart()
    expect(cart.items).toHaveLength(0)
    expect(cart.totalItems).toBe(0)
    expect(cart.totalPrice).toBe(0)
  })
}) 