<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClassStore } from '~/stores/class'
import { useAuthStore } from '~/stores/auth'
import { useCoursesStore } from '~/stores/courses'
import { Icon } from '@iconify/vue'
import router from '~/router'

const route = useRoute()
const classStore = useClassStore()
const authStore = useAuthStore()
const coursesStore = useCoursesStore()

const { execute, data, isFetching } = classStore.getById(route.params.id, route.params.classId)
execute()

const { execute: fetchStudents, data: studentsData } = coursesStore.fetchCourseStudents(route.params.id)
fetchStudents()

const { data: currentUser } = authStore.me();

const classItem = computed(() => data.value || [])
const students = computed(() => studentsData.value?.users || [])

function padZero(num) {
  return num.toString().padStart(2, '0')
}

function formatDateTime(date) {
  const day = padZero(date.getDate())
  const month = padZero(date.getMonth() + 1)
  const year = date.getFullYear()
  const hours = padZero(date.getHours())
  const minutes = padZero(date.getMinutes())
  return `${day}/${month}/${year} ${hours}:${minutes}`
}

const startTimeFormatted = computed(() => {
  const raw = classItem.value.start_timestamp
  if (!raw) return 'Não definido'
  const date = new Date(raw)
  if (isNaN(date)) return 'Não definido'
  return formatDateTime(date)
})

const endTimeFormatted = computed(() => {
  const raw = classItem.value.start_timestamp
  const minutes = classItem.value.duration_minutes
  if (!raw || !minutes) return 'Não definido'
  const date = new Date(raw)
  if (isNaN(date)) return 'Não definido'
  date.setMinutes(date.getMinutes() + minutes)
  return formatDateTime(date)
})

function redirectToChat(id) {
  if (checkIfIsCurrentUser(id)) return
  router.push(`/chat/${id}`)
}

function checkIfIsCurrentUser(id) {
  return id === currentUser.value.id
}
</script>

<template>
  <div class="container flex flex-col items-center mx-auto px-4 py-8 ">
    <div class="bg-white rounded-lg shadow-md p-6 w-full min-h-screen h-full">
      <div class="w-full grid grid-cols-3">
        <div class="w-72 p-4 rounded-xl shadow-md">
          <h2 class="text-lg font-semibold mb-4 text-base-content">Usuários</h2>
          <ul class="space-y-2">
            <li
              v-for="user in students"
              :key="user.id"
              class="flex items-center gap-3 p-2 rounded-lg hover:bg-base-300 transition-all"
              @click="redirectToChat(user.id)"
            >
              <div class="avatar">
                <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 flex justify-center">
                  <img
                    v-if="user.avatar_url"
                    :src="user.avatar_url"
                    alt="Avatar"
                    class="w-full h-full object-cover"
                  />
                  <Icon
                    v-else
                    icon="mdi:account"
                    class="w-full h-full text-base-content text-xl p-1"
                  />
                </div>
              </div>
              <div class="flex-1">
                <p class="text-base-content font-medium truncate">{{ user.name }}</p>
              </div>
              <div v-if="checkIfIsCurrentUser(user.id)" class="text-gray-400">
                (você)
              </div>
              <span v-else class="w-3 h-3 rounded-full bg-success"></span>
            </li>
          </ul>
        </div>
        <div class="col-span-2">
          <div class="w-full h-40 bg-primary flex items-center justify-center">
            <h1 class="text-3xl font-bold text-white justify-center flex gap-0.5"> 
              Se<span class="text-primary bg-white px-1 rounded">ed</span>
            </h1>
          </div>
          <div class="text-3xl font-bold my-8">
            {{ classItem.name }}
          </div>
          <div class="grid grid-cols-2 gap-2 mb-4 text-sm">
            <div class="flex flex-col">
              <span class="font-medium text-gray-700">Início:</span>
              <span class="ml-1 text-gray-600">{{ startTimeFormatted }}</span>
            </div>
            <div class="flex flex-col">
              <span class="font-medium text-gray-700">Término:</span>
              <span class="ml-1 text-gray-600">{{ endTimeFormatted }}</span>
            </div>
          </div>
          <div class="mt-8">
            <button class="btn btn-primary"> 
              Acessar sala virtual
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
