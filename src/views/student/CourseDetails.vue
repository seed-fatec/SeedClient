<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCoursesStore } from '~/stores/courses'
import CourseHeader from '~/blocks/student/CourseHeader.vue'
import CourseInfoCard from '~/blocks/student/CourseInfoCard.vue'
import CoursePriceCard from '~/blocks/student/CoursePriceCard.vue'
import EnrollModal from '~/blocks/student/EnrollModal.vue'

const route = useRoute()
const coursesStore = useCoursesStore()

const showDevModal = ref(false)

const { execute, data } = coursesStore.fetchCourseDetails(route.params.id)
execute()

const course = computed(() => data.value || null)

const handleJoin = () => {
  showDevModal.value = true
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
              title="Vagas"
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

    <EnrollModal :is-open="showDevModal" @close="showDevModal = false" />
  </div>
</template>
