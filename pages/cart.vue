<template>
  <v-container>
    <h1 class="text-h4 mb-6">Корзина</h1>
    
    <div v-if="cartStore.items.length === 0" class="text-center">
      <p class="text-h6">Корзина пуста</p>
      <v-btn to="/" color="primary" class="mt-4">
        Перейти к покупкам
      </v-btn>
    </div>

    <template v-else>
      <v-list>
        <v-list-item
          v-for="item in cartStore.items"
          :key="item.id"
          :title="item.title"
        >
          <template v-slot:prepend>
            <v-img :src="item.image" width="50" height="50" cover />
          </template>
          
          <template v-slot:subtitle>
            <div class="d-flex align-center mt-2">
              <span>{{ formatPrice(item.price) }} × {{ item.quantity }}</span>
              <v-spacer />
              <span class="text-primary">
                {{ formatPrice(item.price * item.quantity) }}
              </span>
            </div>
          </template>

          <template v-slot:append>
            <v-btn
              icon="mdi-delete"
              variant="text"
              color="error"
              @click="cartStore.removeFromCart(item.id)"
            />
          </template>
        </v-list-item>
      </v-list>

      <v-divider class="my-4" />

      <div class="d-flex justify-space-between align-center">
        <div class="text-h6">
          Итого: {{ formatPrice(cartStore.totalPrice) }}
        </div>
        <v-btn
          color="success"
          @click="checkout"
        >
          Оформить заказ
        </v-btn>
      </div>
    </template>

    <v-alert
      v-model="showSuccess"
      type="success"
      closable
      class="mb-4"
    >
      Спасибо за покупку!
    </v-alert>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '../store/cart'

const cartStore = useCartStore()
const showSuccess = ref(false)

const formatPrice = (price: number) => {
  return `${price.toFixed(2)} ₽`
}

const checkout = () => {
  showSuccess.value = true
  cartStore.clearCart()
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}
</script> 