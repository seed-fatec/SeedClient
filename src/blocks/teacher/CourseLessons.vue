<script setup>
import { Icon } from '@iconify/vue'
import router from '~/router'

const props = defineProps({
  classes: {
    type: Array,
    required: true,
  },
  courseId: {
    type: Number
  }
})

function formatDate(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
         ' às ' +
         date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

function handleViewClass(id) {
  router.push(`/teacher/courses/${props.courseId}/class/${id}/view`)
}
</script>

<template>
  <div class="space-y-2">
    <h2 class="text-lg font-semibold text-gray-800 mb-4">Aulas do Curso</h2>
    <div
      v-for="classItem in classes"
      :key="classItem.id"
      class="bg-neutral-100 rounded-md p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
    >
      <div>
        <p class="font-medium text-primary">{{ classItem.name }}</p>
        <p class="text-sm text-neutral-500 flex items-center gap-1">
          {{ formatDate(classItem.start_timestamp) }}
          <span class="mx-1">•</span>
          <Icon icon="lucide:clock" class="w-4 h-4 text-neutral-500" />
          <span>{{ classItem.duration_minutes }} minutos</span>
        </p>
      </div>
      <div class="text-sm font-semibold flex items-center gap-x-4">
        <span
          v-if="classItem.is_free"
          class="px-2 py-1 rounded-md bg-green-100 text-green-700"
        >
          Gratuita
        </span>
        <Icon 
          icon="hugeicons:view" 
          class="size-6 text-neutral-500 cursor-pointer" 
          title="Visualizar aula" 
          @click="handleViewClass(classItem.id)"/>
        <button class="btn btn-primary btn-outline">
          Acessar
        </button>
      </div>
    </div>
    <p v-if="classes.length === 0" class="text-neutral-500 text-center">
      Ainda não existem aulas cadastradas
    </p>
  </div>
</template>
