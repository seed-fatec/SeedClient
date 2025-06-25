<script setup>
import { ref } from 'vue'
import { apiUrl } from '~/config/env'
import { useAuthStore } from '~/stores/auth'

const imagePreview = ref(null)
const emit = defineEmits(['file-selected'])
const authStore = useAuthStore()

function onImageChange(event) {
  const file = event.target.files[0]
  if (!file) return

  imagePreview.value = URL.createObjectURL(file)
  emit('file-selected', file)
}
</script>

<template>
  <div class="relative w-full h-40 bg-neutral-100 rounded-md flex items-center justify-center border border-dashed">
    <label class="aular-pointer w-full h-full flex justify-center items-center">
      <input type="file" accept="image/*" class="hidden" @change="onImageChange" />
      <img v-if="imagePreview" :src="imagePreview" alt="Preview" class="h-full object-cover" />
      <span v-else class="text-neutral-400 text-4xl">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9 6 9-6" />
        </svg>
      </span>
    </label>
  </div>
</template>
