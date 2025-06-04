<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

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
      <div class="text-center">
        Matricular
        
      </div>
    </div>
  </div>
</template>
