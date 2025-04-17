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
    async register({ name, email, password }) {
      if (!password) {
        throw new Error('A senha é obrigatória')
      }

      const endpoint = '/student/register'

      try {
        const { data, error } = await useApi(endpoint)
          .post({
            name,
            email,
            password,
          })
          .json()

        if (error.value)
          throw new Error(error.value?.message || 'Falha no cadastro')

        return { data: data.value }
      } catch (err) {
        throw err
      }
    },

    async login({ email, password, isTeacher = false }) {
      const endpoint = isTeacher ? '/teacher/login' : '/student/login'

      try {
        const { data, error } = await useApi(endpoint)
          .post({
            email,
            password,
          })
          .json()

        if (error.value)
          throw new Error(error.value?.message || 'Falha no login')

        if (data.value) {
          this.setAccessToken(data.value.access_token)
          this.setRefreshToken(data.value.refresh_token)
          this.setIsTeacher(isTeacher)
          return { data: data.value }
        } else {
          throw new Error('Resposta inválida do servidor')
        }
      } catch (err) {
        throw err
      }
    },

    async logout() {
      if (!this.refreshToken) {
        this.clearAuth()
        router.push({ name: 'Login' })
        return
      }

      try {
        await useApi('/logout').post({
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
        const { data, error } = await useApi('/token/refresh')
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

    async me() {
      try {
        const { data, error } = await useApi('/users/me').get().json()

        if (error.value)
          throw new Error(
            error.value?.message || 'Falha ao obter dados do usuário'
          )

        if (data.value) {
          this.setUser(data.value)
          return data.value
        }
        return null
      } catch (err) {
        return null
      }
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
