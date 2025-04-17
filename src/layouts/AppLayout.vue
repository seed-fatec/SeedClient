<script setup>
import Header from '~/blocks/Header.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-grow bg-neutral-200 flex items-center justify-center">
      <RouterView />
    </main>
  </div>
</template>
