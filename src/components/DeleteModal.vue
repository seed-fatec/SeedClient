<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Confirmar exclusão',
  },
  message: {
    type: String,
    default: 'Tem certeza que deseja excluir este item?',
  },
})

const emit = defineEmits(['close', 'confirm'])

const handleClose = () => {
  emit('close')
}

const handleConfirm = () => {
  emit('confirm')
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
      <div class="text-center">
        <div
          class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          {{ title }}
        </h3>
        <p class="text-sm text-gray-500 mb-4">
          {{ message }}
        </p>
        <div class="flex gap-4">
          <button @click="handleClose" class="btn btn-outline btn-neutral flex-1">
            Cancelar
          </button>
          <button @click="handleConfirm" class="btn btn-error flex-1">
            Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
