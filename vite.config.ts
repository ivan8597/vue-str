import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    deps: {
      inline: ['vuetify']
    },
    css: true,
    testTransformMode: {
      web: ['.[jt]sx?$', '.css$'],
      ssr: ['.css$']
    },
    alias: [
      {
        find: /\.(css|sass|scss)$/,
        replacement: 'tests/mocks/styleMock.js'
      },
      {
        find: /^vuetify\/styles$/,
        replacement: 'tests/mocks/styleMock.js'
      }
    ]
  }
}) 