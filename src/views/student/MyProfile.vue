<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const loading = ref(false)

const { data } = authStore.me()

const handleSubmit = async (classData) => {
  const { execute } = authStore.updateProfile(classData)

  execute().then(() => {
    toast.success("Perfil atualizado com sucesso")
  })
}

const handleCancel = () => {
  router.push(`/teacher/courses/${route.params.id}`)
}
</script>

<template>
  <div class="container flex flex-col items-center mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-md p-6 w-[80%]">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Meu perfil</h1>
      <hr class="border-t border-gray-200 mb-6" />
      <ProfileForm
        v-if="data"
        :initial-values="data"
        :loading="loading"
        submit-button-text="Salvar"
        loading-button-text="Salvando..."
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>
