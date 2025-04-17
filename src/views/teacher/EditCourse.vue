<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCoursesStore } from '~/stores/courses'

const router = useRouter()
const route = useRoute()
const coursesStore = useCoursesStore()

const loading = ref(false)
const error = ref('')
const showDevModal = ref(false)
const initialValues = ref({
  name: '',
  description: '',
  price: '',
  max_capacity: '',
  start_date: '',
  end_date: '',
})

onMounted(async () => {
  loading.value = true
  error.value = null

  try {
    const { data } = await coursesStore.fetchCourseDetails(route.params.id)
    initialValues.value = {
      name: data.name,
      description: data.description || '',
      price: data.price,
      max_capacity: data.max_capacity,
      start_date: data.start_date || '',
      end_date: data.end_date || '',
    }
  } catch (err) {
    error.value =
      'Erro ao carregar detalhes do curso. Por favor, tente novamente.'
  } finally {
    loading.value = false
  }
})

const handleSubmit = async (courseData) => {
  showDevModal.value = true
}

const handleCancel = () => {
  router.push(`/teacher/courses/${route.params.id}`)
}
</script>

<template>
  <div class="container flex flex-col items-center mx-auto px-4 py-8">
    <DevelopmentModal :is-open="showDevModal" @close="showDevModal = false" />

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

    <div v-else class="bg-white rounded-lg shadow-md p-6 min-w-3xl">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Editar Curso</h1>
      <hr class="border-t border-gray-200 mb-6" />
      <CourseForm
        :initial-values="initialValues"
        :loading="loading"
        submit-button-text="Salvar Alterações"
        loading-button-text="Salvando..."
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>
