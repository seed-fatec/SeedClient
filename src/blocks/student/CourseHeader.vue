<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ name }}</h1>
    <p class="text-xl text-gray-600 leading-relaxed">{{ description }}</p>
  </div>
</template>
