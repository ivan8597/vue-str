<template>
  <v-app-bar>
    <v-container class="d-flex align-center">
      <v-app-bar-title>
        <nuxt-link to="/" class="text-decoration-none text-black">
          Магазин
        </nuxt-link>
      </v-app-bar-title>

      <v-spacer />

      <div class="d-flex align-center">
        <OrderHistory class="mr-4" />
        
        <v-btn
          :prepend-icon="'mdi-cart'"
          color="primary"
          variant="text"
          @click="dialog = true"
        >
          Корзина
          <v-badge
            v-if="totalItems > 0"
            :content="totalItems"
            color="error"
            floating
          />
        </v-btn>
      </div>
    </v-container>

    <!-- Модальное окно корзины -->
    <v-dialog v-model="dialog" max-width="700px">
      <Carts @close="dialog = false" />
    </v-dialog>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '../store/cart'
import OrderHistory from './OrderHistory.vue'

const dialog = ref(false)
const cartStore = useCartStore()
const totalItems = computed(() => cartStore.totalItems)
</script> 