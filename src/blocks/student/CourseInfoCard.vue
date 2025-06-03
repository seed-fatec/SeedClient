<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h3 class="font-medium text-gray-900 text-center">{{ title }}</h3>
    <p class="text-gray-600 text-center mt-2">{{ value }}</p>
  </div>
</template>
