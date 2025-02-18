import { defineStore } from 'pinia'

type CartItem={
  id: number
  title: string
  price: number
  quantity: number
  image: string
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),
  
  actions: {
    addToCart(product: any) {
      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({
          ...product,
          quantity: 1
        })
      }
    },
    
    removeFromCart(productId: number) {
      this.items = this.items.filter(item => item.id !== productId)
    },
    
    clearCart() {
      this.items = []
    }
  },
  
  getters: {
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    
    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
  }
}) 