<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800">{{ name }}</h1>
  </div>
</template>
