import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { describe, test, expect } from 'vitest'
import Carts from '../../components/Carts.vue'
import { useCartStore } from '../../store/cart'
import '../setup'

describe('Carts Component', () => {
  test('отображает пустую корзину', () => {
    const wrapper = mount(Carts, {
      global: {
        plugins: [createTestingPinia()]
      }
    })

    expect(wrapper.text()).toContain('Ваша корзина пуста')
    expect(wrapper.text()).toContain('Итого: 0.00 ₽')
  })

  test('отображает товары в корзине', async () => {
    const wrapper = mount(Carts, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            cart: {
              items: [{
                id: 1,
                title: 'Test Product',
                price: 100,
                quantity: 2,
                image: 'test.jpg'
              }]
            }
          }
        })]
      }
    })

    expect(wrapper.text()).toContain('Test Product')
    expect(wrapper.text()).toContain('100.00 ₽ x 2')
  })
}) 