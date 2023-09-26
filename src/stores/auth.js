import axios from 'axios'
import { ref } from 'vue'
import { defineStore } from 'pinia'

const API_KEY = import.meta.env.VITE_API_KEY_FIREBASE
export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: ''
  })

  const error = ref('')

  const loader = ref(false)

  const authen = async (payload, type) => {
    const stringUrl = type === 'signup' ? 'signUp' : 'signInWithPassword'
    error.value = ''
    loader.value = true
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${API_KEY}`,
        {
          ...payload,
          returnSecureToken: true
        }
      )
      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn
      }
    } catch (err) {
      switch (err.response.data.error.message) {
        case 'EMAIL_EXISTS':
          error.value = 'Такой email существует'
          break
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Операция недоуступна. Попробуйте еще раз'
          break
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          error.value = 'Вы сделали слишком много попыток. Повторите попытку позже'
          break
        case 'INVALID_EMAIL':
          error.value = 'Неверный email или пароль. Попробуйте еще раз'
          break
        case 'INVALID_PASSWORD':
          error.value = 'Неверный email или пароль. Попробуйте еще раз'
          break
        case 'WEAK_PASSWORD':
          error.value = 'Пароль должен быть минимум 6 символов'
          break
        case 'EMAIL_NOT_FOUND':
          error.value = 'Такого пользователя не сущетсвует. Возможно, пользователь был удален'
          break

        default:
          error.value = 'Неизвестная ошибка. Попробуйте еще раз'
          break
      }
      throw error.value
    } finally {
      loader.value = false
    }
  }
  return { authen, userInfo, error, loader }
})
