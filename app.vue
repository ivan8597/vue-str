<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Кнопка прокрутки вверх -->
    <v-btn
      v-show="showScrollButton"
      class="scroll-to-top"
      color="primary"
      @click="scrollToTop"
    >
      <PhArrowUp :size="24" weight="bold" />
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cart'
import { computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { PhArrowUp } from '@phosphor-icons/vue'

const cartStore = useCartStore()
const { y: scrollY } = useWindowScroll()
const showScrollButton = computed(() => scrollY.value > 300)

const scrollToTop = () => {
  if (process.client) {
    scrollY.value = 0
  }
}
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 110px;
  right: 24px;
  z-index: 999;
  padding: 8px 16px;
}
</style>
