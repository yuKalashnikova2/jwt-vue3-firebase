<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import TheLoader from '../components/TheLoader.vue'

const authStore = useAuthStore()

const email = ref('')

const password = ref('')
const succsess = ref(false)

const signup = async () => {
  await authStore.authen({ email: email.value, password: password.value }, 'signup')
  email.value = ''
  password.value = ''
  succsess.value = true
  console.log('Проверка на прочность')
}
</script>

<template>
  <h2>Регистрация</h2>
  <form class="flex flex-column gap-3">
    <Message v-if="authStore.error" severity="warn">{{ authStore.error }}</Message>
    <Message v-if="succsess" severity="success"
      >Вы успешно зарегистрированы! Нажмите на кнопку "Войти" и введите логин и пароль, чтобы войти
      в систему</Message
    >
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
      <InputText
        type="password"
        v-model="password"
        placeholder="Введите пароль"
        autocomplete="on"
      />
    </div>
    <TheLoader v-if="authStore.loader" />
    <div v-else class="flex flex-column gap-3">
      <Button label="Зарегистрироваться" @click="signup" />
      <span>Уже зарегистрированы?<router-link to="/signin">Войти</router-link></span>
    </div>
  </form>
</template>
