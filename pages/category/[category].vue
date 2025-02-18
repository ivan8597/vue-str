<template>
  <v-container>
    <h1 class="text-h4 mb-6 text-capitalize">{{ route.params.category }}</h1>
    
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        md="4"
      >
        <ProductCard :product="product" />
      </v-col>
    </v-row>

    <v-btn
      color="secondary"
      @click="goToHome"
      class="mt-4"
    >
      Вернуться в главное меню
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from 'nuxt/app'

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const route = useRoute()
const router = useRouter()

const { data: products } = await useFetch<Product[]>(
  `https://fakestoreapi.com/products/category/${route.params.category}`
)

const goToHome = () => {
  router.push('/')
}
</script>
