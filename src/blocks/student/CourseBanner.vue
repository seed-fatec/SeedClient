<template>
  <div class="relative h-64 w-full">
    <img
      v-if="course.avatar_url"
      :src="course.avatar_url"
      alt="Banner do curso"
      class="w-full h-full object-cover"
    />
    <div
      v-else
      class="w-full h-full bg-primary flex items-center justify-center text-white text-4xl font-bold relative"
    >
      <h1 class="flex items-center gap-1">
        Se<span class="text-primary bg-white px-2 rounded ml-1">ed</span>
      </h1>
    </div>
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
    ></div>
    <div class="absolute bottom-0 left-0 w-full px-8 pb-6">
      <h1 class="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
        {{ course.name }}
      </h1>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  course: {
    type: Object,
    default: null,
  },
});
</script>
