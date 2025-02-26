import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { describe, test, expect } from 'vitest'
import Carts from '../../components/Carts.vue'
import '../setup'

describe('Carts Component', () => {
  test('отображает пустую корзину', () => { //проверяем что корзина пустая
    const wrapper = mount(Carts, { //монтируем корзину
      global: { //глобальные настройки
        plugins: [createTestingPinia()] //используем createTestingPinia для тестирования
      }
    })

    expect(wrapper.text()).toContain('Ваша корзина пуста') //проверяем что корзина пустая
    expect(wrapper.text()).toContain('Общий итог:') //проверяем что корзина пустая
    expect(wrapper.text()).toContain('0.00 ₽') //проверяем что корзина пустая
  })

  test('отображает товары в корзине', async () => { //проверяем что корзина не пустая
    const wrapper = mount(Carts, { //монтируем корзину
      global: { //глобальные настройки
        plugins: [createTestingPinia({ //используем createTestingPinia для тестирования
          initialState: { //начальное состояние
            cart: { //корзина
              items: [{ //товары в корзине
                id: 1, //id товара
                title: 'Test Product', //название товара
                price: 100, //цена товара
                quantity: 2, //количество товара
                image: 'test.jpg' //изображение товара
              }]
            }
          }
        })]
      }
    })

    expect(wrapper.text()).toContain('Test Product') //проверяем что корзина не пустая
    expect(wrapper.text()).toContain('100.00 ₽ x 2') //проверяем что корзина не пустая
  })
}) 