import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
  ],

  css: ['vuetify/lib/styles/main.sass'],

  build: {
    transpile: ['vuetify'],
  },

  compatibilityDate: '2025-02-18',

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "sass:map";'
        }
      }
    }
  },

  runtimeConfig: {
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    public: {
      // публичные переменные если нужны
    }
  }
})