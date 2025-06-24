<script setup>
const props = defineProps({
  teacherName: {
    type: String,
    required: true,
  },
  avatarSrc: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="bg-primary text-primary-content p-4 flex items-center space-x-4 shadow-md shrink-0"
  >
    <div class="avatar online">
      <div
        class="w-12 h-12 rounded-full ring ring-primary-content ring-offset-primary ring-offset-2"
      >
        <img
          :src="avatarSrc"
          data-ai-hint="teacher avatar"
          :alt="teacherName"
        />
      </div>
    </div>
    <div>
      <h2 class="text-xl font-semibold">{{ teacherName }}</h2>
    </div>
  </div>
</template>
