import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'

const firebaseConfig = {
  apiKey: 'AIzaSyBrPqD9haJdxGoskvv6UXvGUq4_Ev15G8Y',
  authDomain: 'jwt-vue3-auth.firebaseapp.com',
  projectId: 'jwt-vue3-auth',
  storageBucket: 'jwt-vue3-auth.appspot.com',
  messagingSenderId: '44384840649',
  appId: '1:44384840649:web:77ad5025dfaaf5dfd65618'
}
initializeApp(firebaseConfig)
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.mount('#app')
