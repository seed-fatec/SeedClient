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
    fetchCourseDetails(courseId) {
      return useApi(`/courses/${courseId}`).get().json()
    },

    deleteCourse(courseId) {
      return useApi(`/courses/${courseId}`).delete()
    },
    enrollInCourse(courseId) {
      return useApi(`/courses/${courseId}/enroll`).post().json()
    },
    fetchCourseTeachers(courseId) {
      return useApi(`/courses/${courseId}/teachers`).get().json()
    },
    fetchCourseStudents(courseId) {
      return useApi(`/courses/${courseId}/students`).get().json()
    },
    fetchMyCourses() {
      return useApi('/courses/enrolled').get().json()
    },
    fetchTaughtCourses() {
      return useApi('/courses/taught').get().json()
    }
  },
})
