<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  classes: {
    type: Array,
    required: true,
  },
})

function formatDate(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
         ' às ' +
         date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
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
      <div class="text-sm font-semibold">
        <span
          class="px-2 py-1 rounded-md"
          :class="classItem.is_free ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
        >
          {{ classItem.is_free ? 'Gratuito' : 'Pago' }}
        </span>
      </div>
    </div>

    <p v-if="classes.length === 0" class="text-neutral-500 text-center">
      Ainda não existe aulas cadastradas
    </p>
  </div>
</template>
