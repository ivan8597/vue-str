<template>
  <div>
    <v-btn
      color="secondary"
      variant="outlined"
      @click="dialog = true"
    >
      Мои заказы
    </v-btn>

    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title class="text-h5 d-flex justify-space-between align-center">
          История заказов
          <v-btn
            v-if="orders.length"
            color="error"
            variant="text"
            size="small"
            prepend-icon="mdi-delete-sweep"
            @click="clearAllOrders"
            data-test="clear-all"
          >
            Очистить историю
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-list v-if="orders.length">
            <v-list-item
              v-for="order in orders"
              :key="order.id"
              class="mb-4"
              data-test="order-item"
            >
              <v-card width="100%" variant="outlined">
                <v-card-text>
                  <div class="d-flex justify-space-between align-center mb-2">
                    <div class="text-subtitle-1">
                      Заказ #{{ order.id }}
                    </div>
                    <div class="d-flex align-center">
                      <div class="text-caption mr-2">
                        {{ formatDate(order.date) }}
                      </div>
                      <v-btn
                        icon="mdi-delete"
                        variant="text"
                        color="error"
                        size="small"
                        @click="deleteOrder(order.id)"
                        data-test="delete-order"
                      />
                    </div>
                  </div>

                  <v-divider class="mb-2" />

                  <div class="text-body-2 mb-2">
                    <strong>Информация о покупателе:</strong><br>
                    Имя: {{ order.customerInfo.name }}<br>
                    Email: {{ order.customerInfo.email }}<br>
                    Телефон: {{ order.customerInfo.phone }}
                  </div>

                  <v-divider class="mb-2" />

                  <div class="text-body-2">
                    <strong>Товары:</strong>
                    <div v-for="item in order.items" :key="item.id" class="ml-2">
                      - {{ item.title }} ({{ item.quantity }} шт. x {{ formatPrice(item.price) }})
                    </div>
                  </div>

                  <v-divider class="my-2" />

                  <div class="text-h6 text-right">
                    Итого: {{ formatPrice(order.total) }}
                  </div>
                </v-card-text>
              </v-card>
            </v-list-item>
          </v-list>

          <v-alert
            v-else
            type="info"
            text="У вас пока нет заказов"
            data-test="empty-message"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            variant="text"
            @click="dialog = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Order {
  id: string;
  date: string;
  items: Array<{
    id: number;
    title: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

const dialog = ref(false)
const orders = ref<Order[]>([])

const loadOrders = () => {
  const savedOrders = localStorage.getItem('orders')
  orders.value = savedOrders ? JSON.parse(savedOrders) : []
  orders.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const formatPrice = (price: number) => {
  return `${price.toFixed(2)} ₽`
}

const deleteOrder = (orderId: string) => {
  if (confirm('Вы уверены, что хотите удалить этот заказ?')) {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    const updatedOrders = savedOrders.filter((order: any) => order.id !== orderId)
    localStorage.setItem('orders', JSON.stringify(updatedOrders))
    loadOrders() // Перезагружаем список заказов
  }
}

const clearAllOrders = () => {
  if (confirm('Вы уверены, что хотите очистить всю историю заказов?')) {
    localStorage.setItem('orders', '[]')
    orders.value = []
  }
}

// Загружаем заказы при открытии диалога
watch(dialog, (newValue) => {
  if (newValue) {
    loadOrders()
  }
})
</script>

<style scoped>
.v-card-text {
  padding-top: 20px;
}

.v-card-title {
  padding: 16px !important;
}
</style> 