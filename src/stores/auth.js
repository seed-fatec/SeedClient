import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useApi } from '~/composables/api'
import router from '~/router/index'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: useStorage('access_token', null),
    refreshToken: useStorage('refresh_token', null),
    user: useStorage('user_data', null),
    isTeacher: useStorage('is_teacher', false),
  }),
  actions: {
    register(student) {
      return useApi('/student/register').post(student).json()
    },
    login(email, password, isTeacher = false) {
      const endpoint = isTeacher ? '/teacher/login' : '/student/login'
      return useApi(endpoint).post({ email, password }).json()
    },
    async logout() {
      if (!this.refreshToken) {
        this.clearAuth()
        router.push({ name: 'Login' })
        return
      }

      try {
        await useApi('/logout', { immediate: true }).post({
          refresh_token: this.refreshToken,
        })

        this.clearAuth()
        router.push({ name: 'Login' })
      } catch (err) {
        this.clearAuth()
        router.push({ name: 'Login' })
      }
    },
    async refreshAccessToken() {
      if (!this.refreshToken) return false

      try {
        const { data, error } = await useApi('/token/refresh', { immediate: true })
          .post({
            refresh_token: this.refreshToken,
          })
          .json()

        if (error.value)
          throw new Error(error.value?.message || 'Falha ao atualizar o token')

        if (data.value && data.value.access_token) {
          this.setAccessToken(data.value.access_token)
          return true
        }
        return false
      } catch (err) {
        this.clearAuth()
        return false
      }
    },
    me() {
      return useApi('/users/me', { immediate: true }).get().json()
    },
    updateProfile(user) {
      return useApi('/users/me').put(user)
    },
    setAccessToken(token) {
      this.accessToken = token
    },

    setRefreshToken(token) {
      this.refreshToken = token
    },

    setUser(userData) {
      this.user = userData
    },

    setIsTeacher(isTeacher) {
      this.isTeacher = isTeacher
    },

    clearAuth() {
      this.accessToken = null
      this.refreshToken = null
      this.user = null
      this.isTeacher = false
    },
  },
})
