<script setup>
const props = defineProps({
  username: {
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
          v-if="avatarSrc"
          :src="avatarSrc"
          :alt="username"
        />
        <div v-else class="bg-gray-300 w-full h-full rounded-full flex items-center justify-center">
          <span class="text-gray-500">{{ username.charAt(0).toUpperCase() }}</span>
        </div>
      </div>
    </div>
    <div>
      <h2 class="text-xl font-semibold">{{ username }}</h2>
    </div>
  </div>
</template>
