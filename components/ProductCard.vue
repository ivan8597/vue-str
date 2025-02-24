<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      :src="imageUrl"
      height="200"
      :aspect-ratio="1"
      class="bg-grey-lighten-2"
      @error="handleImageError"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey-lighten-5"
          />
        </v-row>
      </template>
    </v-img>
    
    <v-card-title class="text-truncate">
      {{ product.title }}
    </v-card-title>
    
    <v-card-text>
      <div class="d-flex justify-space-between align-center">
        <span class="text-h6">{{ formatPrice(product.price) }}</span>
        <div>
          <v-btn
            color="primary"
            variant="text"
            @click="navigateToProduct"
          >
            Подробнее
          </v-btn>
          <v-btn
            color="primary"
            icon="mdi-cart"
            @click="addToCart"
          />
        </div>
      </div>
    </v-card-text>

    <!-- Снэкбар вместо модального окна -->
    <v-snackbar
      v-model="showSnackbar"
      :timeout="2000"
      color="success"
    >
      {{ product.title }} добавлен в корзину!
    </v-snackbar>
  </v-card>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cart'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{
  product: {
    id: number
    title: string
    price: number
    image: string
  }
}>()

const cart = useCartStore()
const showSnackbar = ref(false)
const imageUrl = ref(props.product.image || '/images/placeholder.jpg')

const formatPrice = (price: number) => {
  return `${price.toFixed(2)} ₽`
}

const addToCart = () => {
  cart.addToCart(props.product)
  showSnackbar.value = true
}

const handleImageError = () => {
  imageUrl.value = '/images/placeholder.jpg'
}

const navigateToProduct = async () => {
  try {
    await router.push(`/products/${props.product.id}`)
  } catch (error) {
    console.error('Navigation error:', error)
  }
}
</script> 