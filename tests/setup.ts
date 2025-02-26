import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Моки для стилей
vi.mock('vuetify/styles', () => ({}))
vi.mock('vuetify/lib/styles/main.css', () => ({}))
vi.mock('vuetify/lib/styles/main.sass', () => ({}))

const vuetify = createVuetify({
  components,
  directives
})

// Глобальная настройка для всех тестов
config.global.plugins = [vuetify]

// Мок для localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
  key: vi.fn(),
  length: 0
}

global.localStorage = localStorageMock 