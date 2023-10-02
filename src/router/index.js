import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import HomeView from '../views/HomeView.vue'
import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'
import PrivateOffice from '../views/PrivateOffice.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
      meta: {
        auth: false
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
      meta: {
        auth: false
      }
    },
    {
      path: '/private',
      name: 'private',
      component: PrivateOffice,
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.auth && !authStore.userInfo.token) {
    next('/signin')
  }
  if (!to.meta.auth && authStore.userInfo.token) {
    next('/private')
  } else {
    next()
  }
})
export default router
