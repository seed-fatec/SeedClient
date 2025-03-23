<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

if (route.path === '/') {
  router.push({ name: 'Login' })
}

const isLoginPage = computed(
  () => route.name === 'Login' || route.name === 'TeacherLogin'
)

const switchAuth = () => {
  if (isLoginPage.value) {
    router.push({ name: 'Register' })
  } else {
    router.push({ name: 'Login' })
  }
}

const transitionName = computed(() => {
  return isLoginPage.value ? 'slide-right' : 'slide-left'
})
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Lado Esquerdo (Seção com cor primária) -->
    <div
      class="w-1/2 bg-primary text-white flex flex-col items-center justify-center p-8"
      :class="{ 'order-first': isLoginPage, 'order-last': !isLoginPage }"
    >
      <div class="max-w-md text-center">
        <h1 class="text-4xl font-bold mb-6 flex justify-center gap-0.5">
          Se<span class="text-primary bg-white px-1 rounded">ed</span>
        </h1>
        <p class="text-xl mb-10">
          Para uma experiência de aprendizado mais humanizada.
        </p>

        <div v-if="isLoginPage">
          <p class="mb-4">Não tem uma conta?</p>
          <button
            @click="switchAuth"
            class="btn btn-outline btn-white border-white text-white hover:bg-white hover:text-primary"
          >
            Cadastre-se
          </button>
        </div>
        <div v-else>
          <p class="mb-4">Já possui uma conta?</p>
          <button
            @click="switchAuth"
            class="btn btn-outline btn-white border-white text-white hover:bg-white hover:text-primary"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>

    <!-- Lado Direito (Seção do formulário) -->
    <div class="w-1/2 bg-white flex items-center justify-center p-8">
      <router-view v-slot="{ Component }">
        <transition :name="transitionName" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease-out;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
