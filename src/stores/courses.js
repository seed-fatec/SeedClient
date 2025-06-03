import { defineStore } from 'pinia'
import { useApi } from '~/composables/api'

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchCourses() {
      this.loading = true
      this.error = null

      try {
        const { data, error } = await useApi('/courses').get().json()

        if (error.value) {
          throw new Error(error.value?.message || 'Falha ao carregar cursos')
        }

        const coursesData = data.value?.courses || []
        this.courses = Array.isArray(coursesData) ? coursesData : []
        return { data: this.courses }
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async createCourse(courseData) {
      this.loading = true
      this.error = null

      try {
        const { data, error } = await useApi('/courses').post(courseData).json()

        if (error.value) {
          throw new Error(error.value?.message || 'Falha ao criar curso')
        }

        if (!Array.isArray(this.courses)) {
          this.courses = []
        }

        if (data.value) {
          this.courses = [...this.courses, data.value]
        }

        return { data: data.value }
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchCourseDetails(courseId) {
      this.loading = true
      this.error = null

      try {
        const { data, error } = await useApi(`/courses/${courseId}`)
          .get()
          .json()

        if (error.value) {
          throw new Error(
            error.value?.message || 'Falha ao carregar detalhes do curso'
          )
        }

        return { data: data.value }
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteCourse(courseId) {
      this.loading = true
      this.error = null

      try {
        const { error } = await useApi(`/courses/${courseId}`).delete().json()

        if (error.value) {
          throw new Error(error.value?.message || 'Falha ao deletar curso')
        }

        this.courses = this.courses.filter((course) => course.id !== courseId)
        return { success: true }
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async enrollInCourse(courseId) {
      this.loading = true
      this.error = null

      try {
        const { data, error } = await useApi(`/courses/${courseId}/enroll`)
          .post()
          .json()

        if (error.value) {
          throw new Error(
            error.value?.message || 'Falha ao se matricular no curso'
          )
        }

        return { data: data.value }
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchCourseTeachers(courseId) {
      this.loading = true
      this.error = null

      try {
        const { data, error } = await useApi(`/courses/${courseId}/teachers`)
          .get()
          .json()

        if (error.value) {
          throw new Error(
            error.value?.message || 'Falha ao carregar professores do curso'
          )
        }

        return { data: data.value }
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchCourseStudents(courseId) {
      this.loading = true
      this.error = null

      try {
        const { data, error } = await useApi(`/courses/${courseId}/students`)
          .get()
          .json()

        if (error.value) {
          throw new Error(
            error.value?.message || 'Falha ao carregar alunos do curso'
          )
        }

        return { data: data.value }
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})
