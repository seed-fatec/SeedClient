<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

if (route.path === '/') {
  router.push({ name: 'Login' })
}

const isLoginPage = computed(() => route.name === 'Login')

const isTeacherLoginPage = computed(() => route.name === 'TeacherLogin')

const isRegisterPage = computed(() => route.name === 'Register')

const switchAuth = () => {
  if (isLoginPage.value || isTeacherLoginPage.value) {
    router.push({ name: 'Register' })
  } else {
    router.push({ name: 'Login' })
  }
}

const transitionName = computed(() => {
  return isLoginPage.value || isTeacherLoginPage.value
    ? 'slide-right'
    : 'slide-left'
})

const sidebarColor = computed(() => {
  return isTeacherLoginPage.value ? 'bg-emerald-600' : 'bg-primary'
})

const sidebarText = computed(() => {
  if (isTeacherLoginPage.value) {
    return 'Compartilhe conhecimento e inspire seus alunos.'
  } else {
    return 'Para uma experiência de aprendizado mais humanizada.'
  }
})
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Lado Esquerdo (Seção com cor dinâmica) -->
    <div
      :class="[
        sidebarColor,
        'w-1/2 text-white flex flex-col items-center justify-center p-8',
        {
          'order-first': isLoginPage || isTeacherLoginPage,
          'order-last': isRegisterPage,
        },
      ]"
    >
      <div class="max-w-md text-center">
        <h1
          v-if="!isTeacherLoginPage"
          class="text-4xl font-bold mb-6 flex justify-center gap-0.5"
        >
          Se<span class="text-primary bg-white px-1 rounded">ed</span>
        </h1>
        <h1 v-else class="text-4xl font-bold mb-6 flex justify-center gap-0.5">
          Seed
          <span class="text-emerald-600 bg-white px-2 rounded">Teacher</span>
        </h1>

        <p class="text-xl mb-10">
          {{ sidebarText }}
        </p>

        <div v-if="isTeacherLoginPage">
          <p class="mb-4">Área exclusiva para educadores</p>
          <div class="flex space-x-4 justify-center">
            <router-link
              :to="{ name: 'Login' }"
              class="btn bg-white border-none text-emerald-600 hover:bg-gray-200"
            >
              Área do Aluno
            </router-link>
          </div>
        </div>
        <div v-else-if="isLoginPage">
          <p class="mb-4">Não tem uma conta?</p>
          <div class="flex space-x-4 justify-center">
            <button
              @click="switchAuth"
              class="btn btn-outline btn-white border-white text-white hover:bg-white hover:text-primary"
            >
              Cadastre-se
            </button>
            <router-link
              :to="{ name: 'TeacherLogin' }"
              class="btn bg-white text-primary border-none hover:bg-gray-200"
            >
              Área do Professor
            </router-link>
          </div>
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
