import { mount } from '@vue/test-utils'
import { describe, test, expect, beforeEach } from 'vitest'
import OrderHistory from '../../components/OrderHistory.vue'
import '../setup'

describe('OrderHistory Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('компонент монтируется', () => {
    const wrapper = mount(OrderHistory)
    expect(wrapper.exists()).toBe(true)
  })

  test('кнопка "Мои заказы" отображается', () => {
    const wrapper = mount(OrderHistory)
    const button = wrapper.find('.v-btn')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Мои заказы')
  })

 

 

 
}) 