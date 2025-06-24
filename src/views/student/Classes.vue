<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClassStore } from '~/stores/class'
import { useCoursesStore } from '~/stores/courses'

const route = useRoute()
const classStore = useClassStore()
const coursesStore = useCoursesStore()

const { execute, data, isFetching } = classStore.index(route.params.id)
execute()

const { execute: getCourse, data: courseData } = coursesStore.fetchCourseDetails(route.params.id)
getCourse()

const course = computed(() => courseData.value || null)

const classes = computed(() => data.value.classes || [])
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <BackButton to="/my/courses" text="Voltar para meus cursos" />
    <h1 class="text-3xl font-bold text-gray-800 mb-8">{{ course?.name }}</h1>
    <div v-if="isFetching" class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
      ></div>
    </div>

    <div v-else>
      <div v-if="classes.length === 0" class="text-center py-12">
        <p class="text-gray-600 text-lg">Nenhuma aula criada no momento.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ClassCard
          v-for="item in classes"
          :key="item.id"
          :classItem="item"
          :course-id="course?.id"
        />
      </div>
    </div>
  </div>
</template>
