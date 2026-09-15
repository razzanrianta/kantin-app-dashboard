export interface Product {
  id: number
  name: string
  price: number
  image: string
  merchantId: number
}

export interface Merchant {
  id: number
  name: string
  description: string
  location: string
  phone: string
  logoPath: string | null
  status: 'ACTIVE' | 'SHUTDOWN'
  openAt: string | null
  closeAt: string | null
  products?: Product[]
}

export interface CartItem {
  product: Product
  quantity: number
}
