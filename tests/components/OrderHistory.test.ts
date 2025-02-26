import { mount } from '@vue/test-utils'
import { describe, test, expect, beforeEach } from 'vitest'
import OrderHistory from '../../components/OrderHistory.vue'
import '../setup'

describe('OrderHistory Component', () => {
  beforeEach(() => {
    localStorage.clear() //очищаем localStorage
  })

  test('компонент монтируется', () => { //проверяем что компонент монтируется
    const wrapper = mount(OrderHistory) //монтируем компонент
    expect(wrapper.exists()).toBe(true) //проверяем что компонент существует
  })

  test('кнопка "Мои заказы" отображается', () => { //проверяем что кнопка "Мои заказы" отображается
    const wrapper = mount(OrderHistory) //монтируем компонент
    const button = wrapper.find('.v-btn') //находим кнопку "Мои заказы"
    expect(button.exists()).toBe(true) //проверяем что кнопка "Мои заказы" существует
    expect(button.text()).toBe('Мои заказы') //проверяем что кнопка "Мои заказы" отображается
  })

 

 

 
}) 