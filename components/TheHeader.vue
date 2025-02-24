<template>
  <div>
    <!-- Основной хедер с клиентским рендерингом -->
    <client-only>
      <v-app-bar>
        <v-container class="d-flex align-center">
          <v-app-bar-title>
            <nuxt-link to="/" class="text-decoration-none text-black">
              Магазин
            </nuxt-link>
          </v-app-bar-title>

          <v-spacer />
          
          <OrderHistory />
        </v-container>
      </v-app-bar>

      <!-- Плавающая кнопка корзины -->
      <v-btn
        class="floating-cart-btn pulse-on-hover"
        :class="{ 'cart-btn-expanded': isCartExpanded }"
        color="primary"
        icon
        @click="toggleCart"
      >
        <v-icon size="28">{{ isCartExpanded ? 'mdi-chevron-down' : 'mdi-cart' }}</v-icon>
        <v-badge
          v-if="totalItems > 0 && !isCartExpanded"
          :content="totalItems"
          color="error"
          floating
        />
      </v-btn>

      <!-- Плейсхолдер для SSR -->
      <template #placeholder>
        <div class="app-bar-placeholder">
          <div class="container d-flex align-center">
            <div class="app-bar-title">
              <span class="text-decoration-none text-black">Магазин</span>
            </div>
          </div>
        </div>
      </template>
    </client-only>

    <!-- Выдвигающаяся панель корзины -->
    <client-only>
      <div class="cart-panel animate__animated animate__slideInUp" v-if="isCartExpanded">
        <v-card class="cart-card">
          <v-card-title class="d-flex justify-space-between align-center pa-4">
            <span class="text-h6">
              Корзина
              <v-badge
                v-if="totalItems > 0"
                :content="totalItems"
                color="primary"
                class="ml-2"
              />
            </span>
            <v-btn
              icon="mdi-close"
              variant="text"
              size="small"
              @click="isCartExpanded = false"
            />
          </v-card-title>

          <div class="cart-content">
            <Carts @close="isCartExpanded = false" />
          </div>
        </v-card>
      </div>
    </client-only>

    <div 
      class="cart-overlay animate__animated" 
      :class="{ 
        'animate__fadeIn': isCartExpanded,
        'animate__fadeOut': !isCartExpanded 
      }"
    >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '../store/cart'
import OrderHistory from './OrderHistory.vue'

const cartStore = useCartStore()
const isCartExpanded = ref(false)
const totalItems = computed(() => cartStore.totalItems)

const toggleCart = () => {
  if (process.client) {
    isCartExpanded.value = !isCartExpanded.value
  }
}
</script>

<style scoped>
.floating-cart-btn {
  position: fixed;
  bottom: 99px;
  right: 99px;
  z-index: 1000;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.cart-btn-expanded {
  border-radius: 50% 50% 0 0;
}

.cart-panel {
  width: 100%;
  max-height: 90vh;
  background: white;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  animation: slideIn 0.3s ease;
}

.cart-card {
  height: 100%;
  border-radius: 16px 16px 0 0;
  display: flex;
  flex-direction: column;
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 16px 16px;
}

@keyframes slideIn {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (min-width: 600px) {
  .cart-panel {
    width: 600px;
  }
}

.pulse-on-hover {
  transition: all 0.3s ease;
}

.pulse-on-hover:hover {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style> 