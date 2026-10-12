import LoginView from '@/views/LoginView.vue'
import MerchantApplicationView from '@/views/MerchantApplicationView.vue'
import MerchantDetailView from '@/views/MerchantDetailView.vue'
import MerchantListView from '@/views/MerchantListView.vue'
import MyShopsView from '@/views/MyShopsView.vue'
import OrderDetailsView from '@/views/OrderDetailsView.vue'
import OrdersView from '@/views/OrdersView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import CartView from '@/views/CartView.vue'
import OneShopView from '@/views/OneShopView.vue'
import MyShopSalesView from '@/views/MyShopSalesView.vue'
import ProfileView from '@/views/ProfileView.vue'
import SalesDetailView from '@/views/SalesDetailView.vue'

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
      path: '/profile',
      component: ProfileView,
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
      path: '/myshops',
      component: MyShopsView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/myshops/:merchantId',
      component: OneShopView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/myshops/:merchantId/sales',
      component: MyShopSalesView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/myshops/:merchantId/sales/:orderId',
      component: SalesDetailView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/cart',
      component: CartView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return '/login'
  }
})

export default router
