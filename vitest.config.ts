/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    deps: {
      inline: ['vuetify']
    },
    alias: {
      'vuetify/styles': path.resolve(__dirname, 'tests/mocks/styleMock.js'),
      'vuetify/lib/styles/main.css': path.resolve(__dirname, 'tests/mocks/styleMock.js'),
      'vuetify/lib/styles/main.sass': path.resolve(__dirname, 'tests/mocks/styleMock.js'),
      '.css': path.resolve(__dirname, 'tests/mocks/styleMock.js')
    }
  },
  resolve: {
    alias: [
      { find: /^~\/(.*)/, replacement: path.resolve(__dirname, '$1') }
    ]
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  optimizeDeps: {
    exclude: ['vuetify']
  }
}) 