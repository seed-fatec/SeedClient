<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCoursesStore } from '~/stores/courses'
import CourseHeader from '~/blocks/teacher/CourseHeader.vue'
import CourseActions from '~/blocks/teacher/CourseActions.vue'
import CourseInfo from '~/blocks/teacher/CourseInfo.vue'
import CourseLessons from '~/blocks/teacher/CourseLessons.vue'

const router = useRouter()
const route = useRoute()
const coursesStore = useCoursesStore()

const course = ref(null)
const loading = ref(false)
const error = ref(null)
const showDevelopmentModal = ref(false)
const showDeleteModal = ref(false)

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

const handleDelete = async () => {
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  loading.value = true

  try {
    await coursesStore.deleteCourse(route.params.id)
    router.push('/teacher/courses')
  } catch (err) {
    console.error('Erro ao excluir curso:', err)
    router.push('/teacher/courses')
  } finally {
    loading.value = false
    showDeleteModal.value = false
  }
}

const handleCreateLesson = () => {
  showDevelopmentModal.value = true
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
  <div class="container mx-auto px-4 py-8">
    <DevelopmentModal
      :is-open="showDevelopmentModal"
      @close="showDevelopmentModal = false"
    />

    <DeleteModal
      :is-open="showDeleteModal"
      title="Excluir Curso"
      message="Tem certeza que deseja excluir este curso? Esta ação não pode ser desfeita."
      @close="showDeleteModal = false"
      @confirm="confirmDelete"
    />

    <BackButton to="/teacher/courses" text="Voltar para Cursos" />

    <div
      v-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
    >
      {{ error }}
    </div>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
      ></div>
    </div>

    <template v-else-if="course">
      <div class="flex justify-between items-start mb-8">
        <CourseHeader :name="course.name" />
        <CourseActions
          :course-id="course.id"
          @create-lesson="handleCreateLesson"
          @delete="handleDelete"
        />
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="grid grid-cols-2 gap-6">
          <CourseInfo
            :price="formattedPrice(course.price)"
            :max-capacity="course.max_capacity"
            :start-date="formatDate(course.start_date)"
            :end-date="formatDate(course.end_date)"
            :description="course.description"
          />

          <CourseLessons />
        </div>
      </div>
    </template>
  </div>
</template>
