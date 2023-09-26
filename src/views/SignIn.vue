<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import TheLoader from '../components/TheLoader.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')

const password = ref('')
const signin = async () => {
  await authStore.authen({ email: email.value, password: password.value })
  router.push('/private')
}
</script>

<template>
  <h2>Вход</h2>
  <form class="flex flex-column gap-3">
    <Message v-if="authStore.error" severity="warn">{{ authStore.error }}</Message>
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
      </span>
      <InputText type="email" v-model="email" placeholder="Введите Email" autocomplete="on" />
    </div>
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <i class="pi pi-at"></i>
      </span>
      <InputText type="password" v-model="password" placeholder="Введите пароль" autocomplete="on" />
    </div>
    <TheLoader v-if="authStore.loader" />
    <div v-else class="flex flex-column gap-3">
      <Button label="Войти" @click="signin" />
      <span>Еще не зарегистрированы? <router-link to="/signup">Зарегистрироваться</router-link></span>
    </div>
  </form>
</template>
