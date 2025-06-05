<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import CourseHeader from '~/blocks/teacher/CourseHeader.vue'
import { useClassStore } from '~/stores/class'

const router = useRouter()
const route = useRoute()
const classStore = useClassStore()

const showDevelopmentModal = ref(false)
const showDeleteModal = ref(false)

const { execute, data, isFetching } = classStore.getById(route.params.id, route.params.classId)
const { execute: deleteClass, statusCode } = classStore.delete(route.params.id, route.params.classId)
execute()

const selectedClass = computed(() => data.value || null)

const handleDelete = async () => {
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  deleteClass()
    .then(() => {
      showDeleteModal.value = false
      execute()
      toast.success('Aula excluída com sucesso!')
      router.push(`/teacher/courses/${route.params.id}/class/${route.params.classId}/view`)
    })
}

function formatDate(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
         ' às ' +
         date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <DevelopmentModal
      :is-open="showDevelopmentModal"
      @close="showDevelopmentModal = false"
    />

    <DeleteModal
      :is-open="showDeleteModal"
      title="Excluir aula"
      message="Tem certeza que deseja excluir este aula? Esta ação não pode ser desfeita."
      @close="showDeleteModal = false"
      @confirm="confirmDelete"
    />

    <BackButton to="/teacher/courses" text="Voltar para aulas" />


    <div v-if="isFetching" class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
      ></div>
    </div>

    <template v-else-if="selectedClass">
      <div class="flex justify-between items-start mb-8">
        <CourseHeader :name="selectedClass.name" />
        <div class="flex gap-4">
        <button
          @click="router.push(`/teacher/courses/${route.params.id}/class/${selectedClass.id}/edit`)"
          class="btn btn-accent"
        >
          Editar Aula
        </button>
        <button @click="handleDelete" class="btn btn-error">Excluir aula</button>
      </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="grid grid-cols-2 gap-6">
          <div>
            <h2 class="text-lg font-semibold text-gray-800 mb-4">
              Informações da aula
            </h2>
            <span
              v-if="selectedClass.is_free"
              class="px-2 py-1 rounded-md mb-2 bg-green-100 text-green-700"
            >
              Gratuita
            </span>
            <div class="space-y-2 mt-4">
              <p>
                <span class="font-medium text-gray-700">Data de Início:</span>
                <span class="ml-2 text-gray-600">{{ formatDate(selectedClass.start_timestamp) }}</span>
              </p>
              <p>
                <span class="font-medium text-gray-700">Duração:</span>
                <span class="ml-2 text-gray-600">{{ selectedClass.duration_minutes }} minutos</span>
              </p>
              <p class="text-gray-600 bg-gray-100 p-4 rounded-md">
                {{ selectedClass.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
