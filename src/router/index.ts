import LoginView from '@/views/LoginView.vue'
import MerchantApplicationView from '@/views/MerchantApplicationView.vue'
import MerchantDetailView from '@/views/MerchantDetailView.vue'
import MerchantListView from '@/views/MerchantListView.vue'
import MyShopsView from '@/views/MyShopsView.vue'
import OrderDetailsView from '@/views/OrderDetailsView.vue'
import OrdersView from '@/views/OrdersView.vue'
import PaymentView from '@/views/PaymentView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: LoginView,
    },
    {
      path: '/register',
      component: RegisterView,
    },
    {
      path: '/merchants',
      component: MerchantListView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/merchants/application',
      component: MerchantApplicationView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/merchants/:merchantId',
      component: MerchantDetailView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/orders',
      component: OrdersView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/orders/:orderId',
      component: OrderDetailsView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/orders/:orderId/payment',
      component: PaymentView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/myshops',
      component: MyShopsView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

export default router
