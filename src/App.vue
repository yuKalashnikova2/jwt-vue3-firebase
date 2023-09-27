<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore()

const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem('tokensUser'))
  if(tokens) {
    authStore.userInfo.token = tokens.token
    authStore.userInfo.refreshToken = tokens.refreshToken
    authStore.userInfo.expiresIn = tokens.expiresIn
  }
}

checkUser()
</script>

<template>
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
</style>

