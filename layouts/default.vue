<template>
  <v-app>
    <TheHeader />
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
import TheHeader from '~/components/TheHeader.vue'
</script>

<style>
.ripple {
  position: relative;
  overflow: hidden;
}

.ripple::after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform .5s, opacity 1s;
}

.ripple:active::after {
  transform: scale(0, 0);
  opacity: .3;
  transition: 0s;
}
</style> 