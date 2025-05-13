<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCoursesStore } from '~/stores/courses'
import CourseHeader from '~/blocks/student/CourseHeader.vue'
import CourseInfoCard from '~/blocks/student/CourseInfoCard.vue'
import CoursePriceCard from '~/blocks/student/CoursePriceCard.vue'

const router = useRouter()
const route = useRoute()
const coursesStore = useCoursesStore()

const course = ref(null)
const loading = ref(false)
const error = ref(null)
const showDevModal = ref(false)

onMounted(async () => {
  loading.value = true
  error.value = null

  try {
    const { data } = await coursesStore.fetchCourseDetails(route.params.id)
    course.value = data
  } catch (err) {
    error.value =
      'Erro ao carregar detalhes do curso. Por favor, tente novamente.'
  } finally {
    loading.value = false
  }
})

const handleJoin = () => {
  showDevModal.value = true
}

const formatDate = (dateString) => {
  if (!dateString) return 'Não definida'

  const date = new Date(dateString)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

const formattedPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)
}
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="container px-4 py-8">
      <BackButton to="/discover/courses" text="Voltar para Explorar" />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <CourseHeader
            :name="course?.name"
            :description="course?.description"
          />

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CourseInfoCard
              title="Data de Início"
              :value="formatDate(course?.start_date)"
            />
            <CourseInfoCard
              title="Data de Término"
              :value="formatDate(course?.end_date)"
            />
            <CourseInfoCard
              title="Capacidade"
              :value="`${course?.max_capacity} alunos`"
            />
          </div>
        </div>

        <div class="lg:col-span-1">
          <CoursePriceCard
            :price="formattedPrice(course?.price)"
            :teacher="course?.teacher"
            @join="handleJoin"
          />
        </div>
      </div>
    </div>

    <DevelopmentModal :is-open="showDevModal" @close="showDevModal = false" />
  </div>
</template>
