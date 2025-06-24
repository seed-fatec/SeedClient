<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { toast } from 'vue3-toastify'
import { useCoursesStore } from '~/stores/courses'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  course: {
    type: Object
  }
})

const coursesStore = useCoursesStore()

const { execute: enroll } = coursesStore.enrollInCourse(props.course.id)

const formatDate = (dateString) => {
  if (!dateString) return 'Não definida'

  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

const formattedPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price / 100)
}

function handleEnroll() {
  enroll().then(() => {
    toast.success('Você foi matriculado com sucesso!')
  })
}

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}

const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    handleClose()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <div
      class="absolute inset-0 bg-black opacity-50"
      @click="handleClose"
    ></div>

    <div
      class="relative bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
    >
      <div class="text-xl font-bold mb-4">
        Resumo do curso
      </div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="flex flex-col">
          <span class="font-bold">
            Preço
          </span>
          {{ course.name }}
        </div>
        <div class="flex flex-col">
          <span class="font-bold">
            Preço
          </span>
          {{ formattedPrice(course.price) }}
        </div>
        <div class="flex flex-col">
          <span class="font-bold">
            Data de Início
          </span>
          {{ formatDate(course.start_date) }}
        </div>
        <div class="flex flex-col">
          <span class="font-bold">
            Data de Fim
          </span>
          {{ formatDate(course.end_date) }}
        </div>
      </div>
      <span class="font-bold mt-8 mb-1">
        Descrição
      </span>
      <div class="max-h-50 overflow-y-auto">
        {{ course.description }}
      </div>
      <div class="mt-4">
        <button class="btn btn-primary w-full" @click="handleEnroll">
          Matricular-se
        </button>
      </div>
    </div>
  </div>
</template>
