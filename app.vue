<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <Carts />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cart'

const cartStore = useCartStore()
</script>
