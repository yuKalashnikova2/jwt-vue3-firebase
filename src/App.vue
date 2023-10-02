<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

const token = computed(() => authStore.userInfo.token)

const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem('tokensUser'))
  if (tokens) {
    authStore.userInfo.token = tokens.token
    authStore.userInfo.refreshToken = tokens.refreshToken
    authStore.userInfo.expiresIn = tokens.expiresIn
  }
}

checkUser()
</script>

<template>
  <div class="menu">
    <RouterLink to="/" class="menu__link">Главная страница</RouterLink>
    <RouterLink to="/signin" v-if="!token" class="menu__link">Войти</RouterLink>
    <RouterLink to="/private" v-if="token" class="menu__link">Личный кабинет</RouterLink>
  </div>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  font-family: 'Arial', sans-serif;
  margin: auto;
  max-width: 600px;
}

.menu {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 20px;
}
.menu__link {
  color: #000;
  margin: 0 20px;
  font-family: 'Arial', sans-serif;
}
</style>
