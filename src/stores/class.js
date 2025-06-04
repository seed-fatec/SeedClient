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
    getById(courseId, classId) {
      return useApi(`/courses/${courseId}/classes/${classId}`).get().json()
    },
    edit(courseId, classId, classData) {
      return useApi(`/courses/${courseId}/classes/${classId}`).put(classData).json()
    },
    delete(courseId, classId) {
      return useApi(`/courses/${courseId}/classes/${classId}`).delete().json()
    },
    classesList(courseId) {
      return useApi(`/courses/${courseId}/classes`, { immediate: true }).get().json()
    }
  },
})
