<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCoursesStore } from '~/stores/courses'

const router = useRouter()
const coursesStore = useCoursesStore()

const loading = ref(false)
const error = ref('')

const handleSubmit = async (courseData) => {
  const { execute, data } = coursesStore.createCourse(courseData)

  execute().then(() => {
    if (data.value) {
      router.push({ name: 'TeacherCourses' })
    }
  })
}

const handleCancel = () => {
  router.push({ name: 'TeacherCourses' })
}
</script>

<template>
  <div class="container flex flex-col items-center mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-md p-6 min-w-3xl">
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
