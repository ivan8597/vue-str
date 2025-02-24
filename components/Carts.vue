<template>
  <v-card>
    <v-card-title class="text-h4 pa-4">
      Корзина
    </v-card-title>

    <v-card-text>
      <v-list v-if="items.length > 0">
        <v-list-item
          v-for="item in items"
          :key="item.id"
        >
          <template v-slot:prepend>
            <v-avatar size="40">
              <v-img :src="item.image" cover />
            </v-avatar>
          </template>
          
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ formatPrice(item.price) }} x {{ item.quantity }}
          </v-list-item-subtitle>

          <template v-slot:append>
            <v-btn
              icon="mdi-delete"
              variant="text"
              @click="removeFromCart(item.id)"
              data-test="delete-item"
            />
          </template>
        </v-list-item>
      </v-list>

      <v-alert v-else type="info">
        Ваша корзина пуста.
      </v-alert>

      <div class="mt-4">
        <h2 class="text-h5">Итого: {{ formatPrice(totalPrice) }}</h2>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        color="grey-darken-1"
        variant="text"
        @click="$emit('close')"
      >
        Закрыть
      </v-btn>
      <v-btn
        color="primary"
        :disabled="items.length === 0"
        @click="showCheckoutForm"
        data-test="checkout-button"
      >
        Оформить заказ
      </v-btn>
    </v-card-actions>

    <!-- Модальное окно оформления заказа -->
    <v-dialog v-model="showForm" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">
          Оформление заказа
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="isFormValid">
            <v-text-field
              v-model="form.name"
              label="Имя"
              :rules="[v => !!v || 'Обязательное поле']"
              required
              data-test="name-input"
            />

            <v-text-field
              v-model="form.email"
              label="Email"
              :rules="[
                v => !!v || 'Обязательное поле',
                v => /.+@.+\..+/.test(v) || 'Введите корректный email'
              ]"
              required
              data-test="email-input"
            />

            <v-text-field
              v-model="form.phone"
              label="Телефон"
              :rules="[
                v => !!v || 'Обязательное поле',
                v => /^(\+7|8)\d{10}$/.test(v.replace(/\D/g, '')) || 'Введите корректный номер телефона'
              ]"
              required
              data-test="phone-input"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="showForm = false"
          >
            Отмена
          </v-btn>
          <v-btn
            color="primary"
            :disabled="!isFormValid"
            @click="submitOrder"
            data-test="submit-order"
          >
            Оформить заказ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { useCartStore } from '../store/cart'
import { computed, ref } from 'vue'

const cartStore = useCartStore()
const form = ref({
  name: '',
  email: '',
  phone: ''
})
const showForm = ref(false)
const isFormValid = ref(false)

const items = computed(() => cartStore.items)
const totalPrice = computed(() => cartStore.totalPrice)

const formatPrice = (price: number) => {
  return `${price.toFixed(2)} ₽`
}

const removeFromCart = (productId: number) => {
  cartStore.removeFromCart(productId)
}

const showCheckoutForm = () => {
  showForm.value = true
}

const submitOrder = async () => {
  const order = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    items: items.value,
    total: totalPrice.value,
    customerInfo: { ...form.value }
  }
  
  const orders = JSON.parse(localStorage.getItem('orders') || '[]')
  orders.push(order)
  localStorage.setItem('orders', JSON.stringify(orders))
  
  // Отправляем уведомление на почту
  try {
    await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify({
        order,
        email: form.value.email
      })
    })
  } catch (error) {
    console.error('Error sending email notification:', error)
  }
  
  cartStore.clearCart()
  showForm.value = false
  form.value = { name: '', email: '', phone: '' }
}
</script>

<style lang="scss" scoped>
.v-container {
  max-width: 1200px;
  margin: 0 auto;
}

.v-list {
  margin-bottom: 1rem;
}

.v-card-text {
  padding-top: 20px;
}
</style>
