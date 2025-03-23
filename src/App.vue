<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
let refreshInterval = null

onMounted(() => {
  if (authStore.isAuthenticated) {
    // Check no token a cada 10 minutos
    refreshInterval = setInterval(() => {
      if (authStore.isTokenExpired && authStore.refreshToken) {
        authStore.refreshAccessToken()
      }
    }, 10 * 60 * 1000) // 10 minutos
  }
})

onBeforeUnmount(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
})
</script>

<template>
  <RouterView />
</template>
