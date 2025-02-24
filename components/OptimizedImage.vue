  
<template>
  <div class="image-container">
    <v-img
      :src="currentSrc"
      :lazy-src="placeholderUrl"
      :aspect-ratio="1"
      cover
      @error="handleError"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey-lighten-5" />
        </v-row>
      </template>
    </v-img>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  src: string
  alt?: string
}>()

const placeholderUrl = '/images/placeholder.jpg'
const currentSrc = ref(props.src)

const handleError = () => {
  currentSrc.value = placeholderUrl
}
</script> 