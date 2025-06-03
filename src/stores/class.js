import { defineStore } from 'pinia'
import { useApi } from '~/composables/api'

export const useClassStore = defineStore('class', {
  actions: {
    index(courseId) {
      return useApi(`/courses/${courseId}/classes`).get().json()
    },
    create(courseId, classData) {
      return useApi(`/courses/${courseId}/classes`).post(classData).json()
    },
    getById(courseId) {
      return useApi(`/courses/${courseId}/classes`).get().json()
    },
    delete(courseId) {
      return useApi(`/courses/${courseId}/classes`).delete().json()
    },
    classesList(courseId) {
      return useApi(`/courses/${courseId}/classes`, { immediate: true }).get().json()
    }
  },
})
