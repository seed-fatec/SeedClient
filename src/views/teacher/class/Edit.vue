<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import { useClassStore } from '~/stores/class'

const router = useRouter()
const route = useRoute()
const classStore = useClassStore()

const { execute, data, isFetching } = classStore.getById(route.params.id, route.params.classId)
execute()

const selectedClass = computed(() => data.value || null)

const handleSubmit = async (classData) => {
  const { execute, statusCode } = classStore.edit(route.params.id, route.params.classId, classData)

  try{
    await execute()
  }catch(e) {
    console.error(e)
  } finally {
    if (statusCode.value === 204) {
      router.push(`/teacher/courses/${route.params.id}/class/${route.params.id}/view`)
      setTimeout(() => toast.success('Aula editada com sucesso'), 0)
    }
  }
}

const handleCancel = () => {
  router.push(`/teacher/courses/${route.params.id}`)
}
</script>

<template>
  <div class="container flex flex-col items-center mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-md p-6 w-full">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Editar aula</h1>
      <hr class="border-t border-gray-200 mb-6" />
      <ClassForm
        v-if="selectedClass"
        :initialValues="selectedClass"
        :loading="isFetching"
        :isFree="selectedClass.is_free"
        submit-button-text="Editar aula"
        loading-button-text="Salvando..."
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>
