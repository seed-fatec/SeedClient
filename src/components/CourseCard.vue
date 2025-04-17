<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCoursesStore } from '~/stores/courses'
import { useAuthStore } from '~/stores/auth'

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const authStore = useAuthStore()
const coursesStore = useCoursesStore()
const courseDetails = ref(props.course)
const loading = ref(false)

const fetchCourseDetails = async () => {
  if (courseDetails.value.teacher?.name) return

  loading.value = true
  try {
    const { data } = await coursesStore.fetchCourseDetails(props.course.id)
    if (data) {
      courseDetails.value = data
    }
  } catch (err) {
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCourseDetails()
})

const teacherName = computed(
  () => courseDetails.value.teacher?.name || 'Professor'
)

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(courseDetails.value.price)
})

const formatDate = (dateString) => {
  if (!dateString) return 'Não definida'

  const date = new Date(dateString)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

const startDate = computed(() => formatDate(courseDetails.value.start_date))
const endDate = computed(() => formatDate(courseDetails.value.end_date))

const navigateToCourse = () => {
  const route = authStore.isTeacher
    ? `/teacher/courses/${courseDetails.value.id}`
    : `/courses/${courseDetails.value.id}`
  router.push(route)
}
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
    @click="navigateToCourse"
  >
    <div class="h-40 bg-primary flex items-center justify-center">
      <h1 class="text-3xl font-bold text-white justify-center flex gap-0.5">
        Se<span class="text-primary bg-white px-1 rounded">ed</span>
      </h1>
    </div>

    <div class="p-4">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">
        {{ courseDetails.name }}
      </h3>

      <p
        v-if="courseDetails.description"
        class="text-gray-600 mb-4 line-clamp-2"
      >
        {{ courseDetails.description }}
      </p>

      <div class="grid grid-cols-2 gap-2 mb-4 text-sm">
        <div>
          <span class="font-medium text-gray-700">Preço:</span>
          <span class="ml-1 text-gray-600">{{ formattedPrice }}</span>
        </div>

        <div>
          <span class="font-medium text-gray-700">Capacidade:</span>
          <span class="ml-1 text-gray-600"
            >{{ courseDetails.max_capacity }} alunos</span
          >
        </div>

        <div>
          <span class="font-medium text-gray-700">Início:</span>
          <span class="ml-1 text-gray-600">{{ startDate }}</span>
        </div>

        <div>
          <span class="font-medium text-gray-700">Término:</span>
          <span class="ml-1 text-gray-600">{{ endDate }}</span>
        </div>
      </div>

      <div class="border-t border-gray-200 pt-3 mt-3">
        <div class="flex items-center">
          <div
            class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-2"
          >
            {{ teacherName.charAt(0) }}
          </div>
          <span class="text-sm text-gray-600">{{ teacherName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
