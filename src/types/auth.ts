export type UserRole = 'USER' | 'ADMIN'

interface Merchant {
  id: number
  name: string
}

export interface User {
  id: number
  username: string
  email: string
  role: UserRole
  merchants: Merchant[]
}
