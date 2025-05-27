<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useClassStore } from '~/stores/class'

const router = useRouter()
const route = useRoute()
const classStore = useClassStore()

const loading = ref(false)

const handleSubmit = async (classData) => {
  const { execute, data } = classStore.create(route.params.id, classData)

  execute().then(() => {
    if (data.value) {
      router.push(`/teacher/courses/${route.params.id}`)
    }
  })
}

const handleCancel = () => {
  router.push(`/teacher/courses/${route.params.id}`)
}
</script>

<template>
  <div class="container flex flex-col items-center mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-md p-6 w-full">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Nova aula</h1>
      <hr class="border-t border-gray-200 mb-6" />
      <ClassForm
        :loading="loading"
        submit-button-text="Criar aula"
        loading-button-text="Criando..."
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>
