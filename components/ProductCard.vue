<template>
  <v-card class="mx-auto product-card animate__animated animate__fadeIn d-flex flex-column" height="400">
    <OptimizedImage :src="product.image" :alt="product.title" height="200" class="flex-grow-0" />
    
    <v-card-title class="text-truncate">
      {{ product.title }}
    </v-card-title>
    
    <v-card-text class="flex-grow-1 d-flex flex-column">
      <div class="mt-auto d-flex justify-space-between align-center">
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
import OptimizedImage from '~/components/OptimizedImage.vue'

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

const formatPrice = (price: number) => {
  return `${price.toFixed(2)} ₽`
}

const addToCart = () => {
  cart.addToCart(props.product)
  showSnackbar.value = true
}

const navigateToProduct = async () => {
  try {
    await router.push(`/products/${props.product.id}`)
  } catch (error) {
    console.error('Navigation error:', error)
  }
}
</script>

<style scoped>
.product-card {
  transition: all 0.3s ease;
  transform-origin: center;
}

.product-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

/* Рамка для изображения */
.image-container {
  overflow: hidden;
  border-radius: 4px;
  position: relative;
}

.image-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 0 solid rgba(25, 118, 210, 0.3);
  transition: border 0.3s ease;
  z-index: 1;
  pointer-events: none;
}

.product-card:hover .image-container::before {
  border-width: 4px;
}

/* Анимация для кнопок */
.v-btn {
  transition: all 0.25s ease;
}

.product-card:hover .v-btn {
  transform: translateY(-2px);
}

.v-btn:hover {
  transform: scale(1.1);
}

/* Анимация для изображения */
.v-img {
  transition: transform 0.3s ease;
}

.product-card:hover .v-img {
  transform: scale(1.05);
}
</style> 