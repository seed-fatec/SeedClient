<script setup>
import { ref, computed } from 'vue'
import { useCoursesStore } from '~/stores/courses'

const coursesStore = useCoursesStore()

const { execute, data, isFetching } = coursesStore.fetchMyCourses()
execute()

const courses = computed(() => data.value.courses || [])
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Meu aprendizado</h1>
    <div v-if="isFetching" class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
      ></div>
    </div>

    <div v-else>
      <div v-if="courses.length === 0" class="text-center py-12">
        <p class="text-gray-600 text-lg">Nenhum curso adquirido no momento.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MyCourseCard
          v-for="course in courses"
          :key="course.id"
          :course="course"
        />
      </div>
    </div>
  </div>
</template>
