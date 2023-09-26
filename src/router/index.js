import { createRouter, createWebHistory } from 'vue-router'
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
      component: SignUp
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/private',
      name: 'private',
      component: PrivateOffice
    },
  ]
})

export default router
