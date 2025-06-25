<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCoursesStore } from '~/stores/courses'
import { apiUrl } from '~/config/env'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const coursesStore = useCoursesStore()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')

async function uploadCourseImage(courseId, file) {
  const formData = new FormData()
  formData.append('file', file)

  const url = `${apiUrl}/courses/${courseId}/avatar`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authStore.accessToken}`
    },
    body: formData
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.message || 'Erro ao enviar imagem do curso')
  }
}


const handleSubmit = async (courseData) => {
  loading.value = true

  try {
    const { file, ...courseFields } = courseData

    const { execute, data } = coursesStore.createCourse(courseFields)

    await execute()

    if (file) {
      await uploadCourseImage(data.value.id, file)
    }
    router.push({ name: 'TeacherCourses' })
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}


const handleCancel = () => {
  router.push({ name: 'TeacherCourses' })
}
</script>

<template>
  <div class="container flex flex-col items-center mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-md p-6 w-full">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Novo Curso</h1>
      <hr class="border-t border-gray-200 mb-6" />
      <CourseForm
        :loading="loading"
        submit-button-text="Criar Curso"
        loading-button-text="Criando..."
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>
