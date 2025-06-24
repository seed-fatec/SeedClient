<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useClassStore } from '~/stores/class'
import { useAuthStore } from '~/stores/auth'

const props = defineProps({
  courseId: {
    type: Number
  },
  classItem: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const authStore = useAuthStore()
const classStore = useClassStore()
const classDetails = ref(props.classItem)
const loading = ref(false)

const fetchclassDetails = async () => {
  loading.value = true
  try {
    const { data } = await classStore.getById(props.courseId, props.class.id)
    if (data) {
      classDetails.value = data
    }
  } catch (err) {
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchclassDetails()
})

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
  const raw = classDetails.value.start_timestamp
  if (!raw) return 'Não definido'
  const date = new Date(raw)
  if (isNaN(date)) return 'Não definido'
  return formatDateTime(date)
})

const endTimeFormatted = computed(() => {
  const raw = classDetails.value.start_timestamp
  const minutes = classDetails.value.duration_minutes
  if (!raw || !minutes) return 'Não definido'
  const date = new Date(raw)
  if (isNaN(date)) return 'Não definido'
  date.setMinutes(date.getMinutes() + minutes)
  return formatDateTime(date)
})

const navigateToCourse = () => {
  const route = authStore.isTeacher
    ? `/teacher/courses/${classDetails.value.course_id}`
    : `/courses/${classDetails.value.course_id}`
  router.push(route)
}
</script>


<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
    @click="navigateToCourse"
  >
    <div class="p-4">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-xl font-semibold text-gray-800">
          {{ classDetails.name }}
        </h3>
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
      <div class="border-t border-gray-200 pt-3 mt-3">
        <div class="flex justify-between items-center">
          <button class="btn btn-primary">
            Acessar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
