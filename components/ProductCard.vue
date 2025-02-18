<template>
  <v-card class="mx-auto" max-width="344">
    <v-img :src="product.image" height="200px"></v-img>
    
    <v-card-title>{{ product.title }}</v-card-title>
    
    <v-card-text>
      <div class="text-h6">
        {{ formatPrice(product.price) }}
      </div>
    </v-card-text>
    
    <v-card-actions>
     
      <v-btn
        variant="text"
        @click="navigateToProduct"
      >
        Подробнее
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cart'
import { useRouter } from 'vue-router'

const props = defineProps<{
  product: {
    id: number
    title: string
    price: number
    image: string
  }
}>()

const router = useRouter()
const cart = useCartStore()

const formatPrice = (price: number) => {
  return `${price.toFixed(2)} ₽`
}

const addToCart = () => {
  cart.addToCart(props.product)
}

const navigateToProduct = () => {
  router.push(`/products/${props.product.id}`)
}
</script> 