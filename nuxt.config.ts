import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
  ],

  css: ['vuetify/lib/styles/main.sass', 'animate.css'],

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
    },
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: ['./tests/setup.ts'],
      include: ['tests/**/*.test.ts'],
      deps: {
        inline: ['vuetify']
      }
    }
  },

  runtimeConfig: {
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    public: {
     
    }
  },

  nitro: {
    routeRules: {
      '/api/**': { cors: true },
      'https://fakestoreapi.com/**': { 
        proxy: 'https://fakestoreapi.com/**',
        cors: true,
        cache: {
          maxAge: 60 * 60 * 24 // кеширование на 24 часа
        }
      },
      '/api/images/**': {
        proxy: 'https://fakestoreapi.com/img/**',
        cors: true,
        cache: {
          maxAge: 60 * 60 * 24 * 7
        }
      }
    }
  },

  // @ts-ignore - игнорирование ошибки типа
  image: {
    provider: 'ipx',
    domains: ['fakestoreapi.com'],
    format: ['webp', 'jpg'],
    cache: {
      maxAge: 60 * 60 * 24 * 7
    }
  }
})