<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Каталог товаров</h1>
      <OrderHistory />
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
          />
        </v-list>
      </v-col>
      
      <v-col cols="9">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import OrderHistory from '../components/OrderHistory.vue'
import { useFetch } from 'nuxt/app'

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const { data: products } = await useFetch<Product[]>('https://fakestoreapi.com/products')
const { data: categories } = await useFetch<string[]>('https://fakestoreapi.com/products/categories')
</script> 