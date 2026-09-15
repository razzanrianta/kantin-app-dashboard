export interface CreateOrderItem {
  productId: number
  quantity: number
}

export interface CreateOrderRequest {
  merchantId: number
  items: CreateOrderItem[]
}

export interface OrderItem {
  id: number
  productId: number
  quantity: number
  price: number
  product: {
    id: number
    name: string
  }
}

export interface Order {
  id: number
  buyerId: number
  merchantId: number
  totalPrice: number
  status: string
  createdAt: string
  items: OrderItem[]
}
