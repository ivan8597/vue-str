<template>
  <v-card>
    <v-card-title class="text-h4 pa-4 d-flex justify-space-between align-center">
      Корзина
      <v-btn
        v-if="items.length > 0"
        color="error"
        variant="text"
        size="small"
        prepend-icon="mdi-delete-sweep"
        @click="showClearConfirm = true"
      >
        Очистить корзину
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-list v-if="items.length > 0">
        <v-list-item
          v-for="item in items"
          :key="item.id"
          class="mb-4"
        >
          <v-card width="100%" variant="outlined">
            <v-card-text>
              <div class="d-flex align-center">
                <v-img
                  :src="item.image"
                  width="100"
                  height="100"
                  cover
                  class="rounded mr-4"
                />
                <div class="flex-grow-1">
                  <div class="text-h6 mb-1">{{ item.title }}</div>
                  <div class="text-subtitle-1 text-primary mb-1">
                    {{ formatPrice(item.price) }} x {{ item.quantity }}
                  </div>
                  <div class="text-subtitle-1 font-weight-bold">
                    Итого: {{ formatPrice(item.price * item.quantity) }}
                  </div>
                </div>
                <v-btn
                  icon="mdi-delete"
                  variant="text"
                  color="error"
                  @click="removeFromCart(item.id)"
                  data-test="delete-item"
                />
              </div>
            </v-card-text>
          </v-card>
        </v-list-item>
      </v-list>

      <v-alert v-else type="info" class="mt-2">
        Ваша корзина пуста
      </v-alert>

      <v-divider class="my-4" />

      <div class="d-flex justify-space-between align-center">
        <div class="text-h5">
          Общий итог:
        </div>
        <div class="text-h5 text-primary">
          {{ formatPrice(totalPrice) }}
        </div>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        color="grey-darken-1"
        variant="text"
        @click="emit('close')"
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
          <v-alert
            v-if="orderSuccess"
            type="success"
            class="mb-4"
          >
            Ваш заказ успешно оформлен!
          </v-alert>

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

    <!-- Модальное окно успешного оформления -->
    <v-dialog v-model="showSuccessDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5 pa-4 success lighten-4 text-success">
          <v-icon icon="mdi-check-circle" class="mr-2" />
          Заказ оформлен
        </v-card-title>
        
        <v-card-text class="pa-4 text-center">
          <p class="text-body-1 mb-4">
            Ваш заказ успешно оформлен!
          </p>
          <p class="text-body-2">
            Подтверждение отправлено на email: {{ form.email }}
          </p>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            color="primary"
            @click="closeSuccessDialog"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Модальное окно подтверждения очистки корзины -->
    <v-dialog v-model="showClearConfirm" max-width="400">
      <v-card>
        <v-card-title class="text-h5 pa-4">
          Подтверждение очистки
        </v-card-title>
        
        <v-card-text class="pa-4">
          Вы уверены, что хотите очистить корзину?
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            color="grey"
            variant="text"
            @click="showClearConfirm = false"
          >
            Отмена
          </v-btn>
          <v-btn
            color="error"
            @click="confirmClear"
          >
            Очистить
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
const showSuccessDialog = ref(false)
const orderSuccess = ref(false)
const showClearConfirm = ref(false)

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
  try {
    const orderItems = items.value.map(item => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.image
    }))

    const order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: orderItems,
      total: totalPrice.value,
      customerInfo: {
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone
      }
    }
    
    // Сохраняем заказ в localStorage
    let existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    if (!Array.isArray(existingOrders)) {
      existingOrders = []
    }
    localStorage.setItem('orders', JSON.stringify([...existingOrders, order]))

    // Очищаем корзину и показываем успешное сообщение
    cartStore.clearCart()
    orderSuccess.value = true
    
    setTimeout(() => {
      showForm.value = false
      orderSuccess.value = false
      form.value = { name: '', email: '', phone: '' }
    }, 2000)

  } catch (error) {
    console.error('Error processing order:', error)
  }
}

const emit = defineEmits(['close'])

const closeSuccessDialog = () => {
  showSuccessDialog.value = false
  form.value = { name: '', email: '', phone: '' }
  emit('close')
}

const clearCart = () => {
  showClearConfirm.value = true
}

const confirmClear = () => {
  cartStore.clearCart()
  showClearConfirm.value = false
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

.v-list-item {
  padding: 0;
}

.v-card-text {
  padding: 16px;
}

.v-img {
  border: 1px solid #eee;
}

.success {
  background-color: #E8F5E9 !important;
  color: #2E7D32 !important;
}
</style>
