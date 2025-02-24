<template>
  <v-container class="fade-in">
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Каталог товаров</h1>
    </div>

    <v-row>
      <v-col cols="3">
        <v-list>
          <v-list-subheader>Категории</v-list-subheader>
          <v-list-item
            v-for="category in categories"
            :key="category"
            :to="`/category/${category}`"
            :title="category"
            class="category-item"
          />
        </v-list>
      </v-col>
      
      <v-col cols="9">
        <v-row>
          <v-col
            v-for="(product, index) in products"
            :key="product.id"
            cols="12"
            md="4"
            class="animate__animated animate__fadeInUp"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <ProductCard :product="product" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app'
import { fallbackCategories } from '~/data/categories'

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const { data: products, error: productsError } = await useFetch<Product[]>('/api/products', {
  timeout: 5000,
  retry: 3,
  onRequestError({ error }) {
    console.error('API Error:', error)
  }
})

const { data: categories } = await useFetch<string[]>('https://fakestoreapi.com/products/categories', {
  timeout: 5000,
  retry: 2,
  default: () => fallbackCategories
})
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.category-item {
  transition: all 0.3s ease;
  border-left: 0 solid transparent;
  position: relative;
  overflow: hidden;
}

.category-item::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
  opacity: 0.5;
}

.category-item:hover {
  background-color: rgba(25, 118, 210, 0.05);
  border-left: 4px solid var(--v-primary-base, #1976d2);
  padding-left: 12px;
}

.category-item:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}
</style> 