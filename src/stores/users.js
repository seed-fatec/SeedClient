import { defineStore } from 'pinia'
import { useApi } from '~/composables/api'

export const useUsersStore = defineStore('users', {
  actions: {
    index() {
      return useApi('/users').get().json()
    },
    getById(id) {
      return useApi(`/users/${id}`).get().json()
    },
    getTeacherById(id) {
      return useApi(`/teachers/${id}`).get().json()
    },
  },
})
