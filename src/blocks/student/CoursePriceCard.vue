<script setup>
defineProps({
  price: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['join'])
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-8 sticky top-4">
    <div class="text-4xl font-bold text-primary mb-6">
      {{ price }}
    </div>

    <button
      @click="emit('join')"
      class="w-full btn btn-primary mb-6 text-lg py-4"
    >
      Participar do Curso
    </button>

    <div class="border-t pt-6">
      <div class="flex items-center justify-between text-gray-600">
        <span class="font-medium">Professor</span>
        <span>{{ teacher }}</span>
      </div>
    </div>
  </div>
</template>
