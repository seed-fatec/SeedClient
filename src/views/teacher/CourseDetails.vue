<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCoursesStore } from '~/stores/courses'
import CourseHeader from '~/blocks/teacher/CourseHeader.vue'
import CourseActions from '~/blocks/teacher/CourseActions.vue'
import CourseInfo from '~/blocks/teacher/CourseInfo.vue'
import CourseLessons from '~/blocks/teacher/CourseLessons.vue'
import { useClassStore } from '~/stores/class'
import { toast } from 'vue3-toastify'

const router = useRouter()
const route = useRoute()
const coursesStore = useCoursesStore()
const classStore = useClassStore()

const loading = ref(false)
const error = ref(null)
const showDevelopmentModal = ref(false)
const showDeleteModal = ref(false)

const { execute, data, isFetching } = coursesStore.fetchCourseDetails(route.params.id)
const { execute: deleteCourse } = coursesStore.deleteCourse(route.params.id)
execute()

const { data: classData } = classStore.classesList(route.params.id)

const course = computed(() => data.value || null)
const classes = computed(() => classData.value.classes || [])

const handleDelete = async () => {
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  deleteCourse()
    .then(() => {
      toast.success('Curso excluído com sucesso!')
      router.push({ name: 'TeacherCourses' })
    })
}

const handleCreateLesson = () => {
  router.push({ name: 'CreateClass' })
}

const formatDate = (dateString) => {
  if (!dateString) return 'Não definida'

  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

const formattedPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price / 100)
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


    <div v-if="isFetching" class="flex justify-center items-center h-64">
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
          <CourseLessons :classes :courseId="course.id"/>
        </div>
      </div>
    </template>
  </div>
</template>
