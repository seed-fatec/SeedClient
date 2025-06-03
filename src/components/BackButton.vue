<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  to: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: 'Voltar',
  },
  defaultRoute: {
    type: String,
    default: '/',
  },
})
</script>

<template>
  <button
    @click="to ? router.push(to) : router.back()"
    class="flex items-center text-gray-600 hover:text-gray-900 mb-6 cursor-pointer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 mr-2"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
        clip-rule="evenodd"
      />
    </svg>
    {{ text }}
  </button>
</template>
