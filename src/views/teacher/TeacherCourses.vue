<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCoursesStore } from '~/stores/courses'

const router = useRouter()
const coursesStore = useCoursesStore()
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  loading.value = true
  error.value = null

  try {
    await coursesStore.fetchCourses()
  } catch (err) {
    error.value = 'Erro ao carregar cursos. Por favor, tente novamente.'
  } finally {
    loading.value = false
  }
})

const navigateToNewCourse = () => {
  router.push('/teacher/courses/new')
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Meus Cursos</h1>
      <button @click="navigateToNewCourse" class="btn btn-primary">
        Criar Novo Curso
      </button>
    </div>

    <div
      v-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
    >
      {{ error }}
    </div>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
      ></div>
    </div>

    <div v-else>
      <div v-if="coursesStore.courses.length === 0" class="text-center py-12">
        <p class="text-gray-600 text-lg">Você ainda não criou nenhum curso.</p>
        <button @click="navigateToNewCourse" class="btn btn-primary mt-4">
          Criar Meu Primeiro Curso
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseCard
          v-for="course in coursesStore.courses"
          :key="course.id"
          :course="course"
        />
      </div>
    </div>
  </div>
</template>
