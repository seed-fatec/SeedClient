<script setup>
import Header from '~/blocks/Header.vue'
</script>

<template>
  <div class="flex flex-col">
    <Header />
    <main class="min-h-screen bg-neutral-200 flex justify-center">
      <RouterView />
    </main>
  </div>
</template>
