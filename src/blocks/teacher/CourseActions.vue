<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  courseId: {
    type: [String, Number],
    required: true,
  },
})

const emit = defineEmits(['createLesson', 'delete'])
</script>

<template>
  <div class="flex gap-4">
    <button @click="emit('createLesson')" class="btn btn-primary">
      Criar Aula
    </button>
    <button
      @click="router.push(`/teacher/courses/${courseId}/edit`)"
      class="btn btn-accent"
    >
      Editar Curso
    </button>
    <button @click="emit('delete')" class="btn btn-error">Excluir Curso</button>
  </div>
</template>
