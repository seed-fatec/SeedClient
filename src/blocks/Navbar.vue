<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const router = useRouter()
const authStore = useAuthStore()

const isTeacher = computed(() => authStore.isTeacher)

const handleLogout = async () => {
  await authStore.logout()
}
</script>

<template>
  <nav class="bg-neutral-100 shadow-md">
    <div class="container mx-auto flex items-center justify-between h-16 select-none">
      <div class="flex items-center">
        <h1 class="text-3xl font-bold text-primary justify-center flex gap-0.5">
          Se<span class="text-white bg-primary px-1 rounded">ed</span>
        </h1>
      </div>

      <div class="flex items-center space-x-8 h-full">
        <template v-if="!isTeacher">
          <RouterLink
            :to="{ name: 'Discover' }"
            class="text-gray-700 hover:text-primary font-semibold flex items-center space-x-2 h-full relative group"
          >
            <Icon icon="mdi:compass" class="text-xl" />
            <span>Explorar</span>
            <div
              class="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
            ></div>
          </RouterLink>
          <RouterLink
            :to="{ name: 'MyCourses' }"
            class="text-gray-700 hover:text-primary font-semibold flex items-center space-x-2 h-full relative group"
          >
            <Icon icon="mdi:book-open-variant" class="text-xl" />
            <span>Meu Aprendizado</span>
            <div
              class="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
            ></div>
          </RouterLink>
        </template>
        
        <template v-else>
          <RouterLink
            :to="{ name: 'TeacherCourses' }"
            class="text-gray-700 hover:text-primary font-semibold flex items-center space-x-2 h-full relative group"
          >
            <Icon icon="mdi:book-multiple" class="text-xl" />
            <span>Meus Cursos</span>
            <div
              class="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
            ></div>
          </RouterLink>
          <RouterLink
            :to="{ name: 'NewCourse' }"
            class="text-gray-700 hover:text-primary font-semibold flex items-center space-x-2 h-full relative group"
          >
            <Icon icon="mdi:plus-circle" class="text-xl" />
            <span>Novo Curso</span>
            <div
              class="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
            ></div>
          </RouterLink>
        </template>
      </div>
      <div class="flex items-center space-x-4">
        <button
          class="p-2 rounded-full hover:bg-primary/10 transition-colors duration-200 cursor-pointer group"
        >
          <Icon
            icon="mdi:account"
            class="text-gray-700 text-2xl group-hover:text-primary transition-colors duration-200"
          />
        </button>
        <button
          @click="handleLogout"
          class="p-2 rounded-full hover:bg-primary/10 transition-colors duration-200 cursor-pointer group"
        >
          <Icon
            icon="mdi:logout"
            class="text-gray-700 text-2xl group-hover:text-primary transition-colors duration-200"
          />
        </button>
      </div>
    </div>
  </nav>
</template>
