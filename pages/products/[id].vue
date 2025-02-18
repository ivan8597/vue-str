<template>
  <v-container v-if="product">
    <v-row>
      <v-col cols="12" md="6">
        <v-img
          :src="product.image"
          height="400"
          contain
        />
      </v-col>
      
      <v-col cols="12" md="6" class="d-flex flex-column">
        <h1 class="text-h4 mb-4">{{ product.title }}</h1>
        <p class="text-body-1 mb-4">{{ product.description }}</p>
        
        <div class="text-h5 mb-4">
          {{ formatPrice(product.price) }}
        </div>
        
        <v-btn
          color="primary"
          size="large"
          @click="addToCart"
        >
          Купить
        </v-btn>
        
        <v-btn
          color="secondary"
          size="large"
          @click="goToHome"
          class="mt-auto"
        >
          Вернуться в главное меню
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup lang="ts">
import { useCartStore } from '../../store/cart'
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from 'nuxt/app'

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

// Получение продукта по ID
const { data: product } = await useFetch<Product>(`https://fakestoreapi.com/products/${route.params.id}`)

const formatPrice = (price: number) => {
  return `${price.toFixed(2)} ₽`
}

const addToCart = () => {
  if (product.value) {
    // Добавление товара в корзину
    cartStore.addToCart(product.value)
    alert(`${product.value.title} добавлен в корзину!`) // Уведомление пользователю
  }
}

const goToHome = () => {
  router.push('/')
}
</script>
