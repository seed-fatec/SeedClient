<template>
  <div class="bg-base-100 border border-base-200 rounded-lg p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between">
    <div class="flex-1">
      <h3 class="text-lg font-semibold text-primary mb-1">{{ lesson.name }}</h3>
      <p class="text-gray-700 mb-2">{{ lesson.description }}</p>
      <div class="flex gap-4 text-sm text-gray-600">
        <span>
          Início:
          {{
            lesson.start_timestamp
              ? new Date(lesson.start_timestamp).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
              : '---'
          }}
        </span>
        <span>Duração: {{ lesson.duration_minutes }} min</span>
        <span v-if="lesson.is_free" class="text-green-600 font-semibold">Aula gratuita</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  lesson: { type: Object, required: true }
})
</script>
