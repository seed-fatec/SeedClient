import { defineStore } from 'pinia'
import { useApi } from '~/composables/api'

export const useCoursesStore = defineStore('courses', {
  actions: {
    fetchCourses() {
      return useApi('/courses').get().json()
    },
    createCourse(courseData) {
      return useApi('/courses').post(courseData).json()
    },
    async fetchCourseDetails(courseId) {
      return useApi(`/courses/${courseId}`).get().json()
    },

    async deleteCourse(courseId) {
      return useApi(`/courses/${courseId}`).delete().json()
    },

    async enrollInCourse(courseId) {
      return useApi(`/courses/${courseId}/enroll`).post().json()
    },

    async fetchCourseTeachers(courseId) {
      return useApi(`/courses/${courseId}/teachers`).get().json()
    },

    async fetchCourseStudents(courseId) {
      return useApi(`/courses/${courseId}/students`).get().json()
    }
  },
})
