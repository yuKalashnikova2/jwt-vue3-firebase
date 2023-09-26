<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'
import Card from 'primevue/card'
import TheLoader from '../components/TheLoader.vue'

const authStore = useAuthStore()

const cars = ref([])
const showLoader = ref(false)

const getAllCars = async () => {
  showLoader.value = true
  try {
    const response = await axios.get(
      `https://jwt-vue3-auth-default-rtdb.europe-west1.firebasedatabase.app/Cars.json?auth=${authStore.userInfo.token}`
    )
    cars.value = response.data
  } catch (error) {
    console.log(error.response, 'OSHIBKA TYT')
  } finally {
    showLoader.value = false
  }
}

onMounted(async () => {
  await getAllCars()
})
</script>
<template>
  <div>
    <h2>Личный кабинет</h2>
    <h3>Мои машины</h3>
    <TheLoader v-if="showLoader" />
    <div class="flex flex-column gap-3" v-else>
      <Card v-for="(car, i) in cars" :key="i">
        <template #title> {{ car.name }} </template>
        <template #subtitle> {{ car.type }} </template>
      </Card>
    </div>
  </div>
</template>
