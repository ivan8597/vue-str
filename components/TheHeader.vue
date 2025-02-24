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
      color="primary"
      icon
      @click="showCart"
    >
      <v-icon size="28">mdi-cart</v-icon>
      <v-badge
        v-if="totalItems > 0"
        :content="totalItems"
        color="error"
        floating
      />
    </v-btn>

    <!-- Модальное окно корзины -->
    <v-dialog v-model="cartDialog" max-width="700">
      <Carts @close="cartDialog = false" />
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '../store/cart'
import OrderHistory from './OrderHistory.vue'

const cartStore = useCartStore()
const cartDialog = ref(false)
const totalItems = computed(() => cartStore.totalItems)

const showCart = () => {
  cartDialog.value = true
}
</script>

<style scoped>
.floating-cart-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style> 