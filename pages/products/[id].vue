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
    
    <!-- Добавьте модальное окно -->
    <v-dialog v-model="dialog" max-width="450">
      <v-card class="rounded-lg">
        <v-card-title class="text-h5 pa-4 success lighten-4 text-success">
          <v-icon icon="mdi-check-circle" class="mr-2" />
          Товар добавлен в корзину
        </v-card-title>
        
        <v-card-text class="pa-4">
          <div class="d-flex align-center py-4">
            <v-img
              :src="product.image"
              max-width="80"
              contain
              class="mr-4"
            />
            <div>
              <div class="text-body-1 font-weight-medium mb-1">
                {{ product.title }}
              </div>
              <div class="text-subtitle-1 text-primary">
                {{ formatPrice(product.price) }}
              </div>
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="pa-4 pt-0">
          <v-spacer />
          <v-btn
            color="grey"
            variant="text"
            size="small"
            class="mr-2"
            @click="dialog = false"
          >
            Назад
          </v-btn>
          <v-btn
            color="primary"
            size="small"
            @click="goToCart"
          >
            В корзину
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Модальное окно корзины -->
    <v-dialog v-model="cartDialog" max-width="700px">
      <Carts @close="cartDialog = false" />
    </v-dialog>
  </v-container>
</template>


<script setup lang="ts">
import { useCartStore } from '../../store/cart'
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from 'nuxt/app'
import { ref } from 'vue'
import Carts from '../../components/Carts.vue'

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

const dialog = ref(false)
const cartDialog = ref(false)

const addToCart = () => {
  if (product.value) {
    // Добавление товара в корзину
    cartStore.addToCart(product.value)
    dialog.value = true
  }
}

const goToHome = () => {
  router.push('/')
}

const goToCart = () => {
  dialog.value = false
  cartDialog.value = true
}
</script>

<style scoped>
.v-card {
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
}

.success {
  background-color: #E8F5E9 !important;
  color: #2E7D32 !important;
}
</style>
