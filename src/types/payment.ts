import type { Order } from './order'

export interface Payment {
  id: number
  orderId: number
  proofPath: string
  status: string
  uploadedAt: string
  verifiedAt: string
}

export interface UpdatePayment {
  order: Order
  payment: Payment
}
