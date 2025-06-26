<script setup>
const props = defineProps({
  course: { type: Object, required: true },
});
</script>

<template>
  <div
    class="bg-base-200 border border-base-200 rounded-lg p-4 shadow-sm flex flex-col h-80"
  >
    <img
      :src="course.avatar_url || 'https://placehold.co/600x180.png'"
      :alt="course.name"
      class="w-full h-44 object-cover rounded-md mb-4"
      style="max-height: 180px; min-height: 120px"
    />
    <h3
      class="text-xl font-semibold text-primary mb-1 truncate"
      :title="course.name"
    >
      {{ course.name }}
    </h3>
    <p
      v-if="course.description"
      class="text-gray-700 mb-1 line-clamp-3"
      :title="course.description"
    >
      {{ course.description }}
    </p>
  </div>
</template>