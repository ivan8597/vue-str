<template>
  <div>
    <!-- Основной хедер -->
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
      class="floating-cart-btn"
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

    <!-- Выдвигающаяся панель корзины -->
    <v-expand-transition>
      <div v-if="isCartExpanded" class="cart-panel-overlay" @click.self="isCartExpanded = false">
        <div class="cart-panel">
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
      </div>
    </v-expand-transition>
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
  isCartExpanded.value = !isCartExpanded.value
}
</script>

<style scoped>
.floating-cart-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
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

.cart-panel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.cart-panel {
  width: 100%;
  max-height: 90vh;
  background: white;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  animation: slideUp 0.3s ease;
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

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@media (min-width: 600px) {
  .cart-panel {
    width: 600px;
  }
}
</style> 