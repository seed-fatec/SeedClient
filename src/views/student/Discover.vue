<script setup>
import { ref, computed } from 'vue'
import { useCoursesStore } from '~/stores/courses'

const coursesStore = useCoursesStore()
const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const sortOrder = ref('desc')

const { execute, data, isFetching } = coursesStore.fetchCourses()
execute()

const allCourses = computed(() => data.value.courses || [])

const courses = computed(() => {
  let filtered = allCourses.value

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter((course) =>
      course.name.toLowerCase().includes(query)
    )
  }

  filtered = [...filtered].sort((a, b) => {
    const dateA = new Date(a.created_at)
    const dateB = new Date(b.created_at)

    if (sortOrder.value === 'desc') {
      return dateA - dateB
    } else {
      return dateB - dateA
    }
  })

  return filtered
})

const handleSearch = (query) => {
  searchQuery.value = query
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
    >
      <h1 class="text-3xl font-bold text-gray-800">Explorar</h1>
      <div class="sm:max-w-md w-full">
        <Search
          v-model="searchQuery"
          v-model:sort-order="sortOrder"
          placeholder="Buscar cursos por nome..."
          @search="handleSearch"
        />
      </div>
    </div>

    <div v-if="isFetching" class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
      ></div>
    </div>

    <div v-else>
      <div
        v-if="courses.length === 0 && !searchQuery.trim()"
        class="text-center py-12"
      >
        <p class="text-gray-600 text-lg">Nenhum curso disponível no momento.</p>
      </div>

      <div
        v-else-if="courses.length === 0 && searchQuery.trim()"
        class="text-center py-12"
      >
        <p class="text-gray-600 text-lg">
          Nenhum curso encontrado para "{{ searchQuery }}".
        </p>
        <button
          @click="searchQuery = ''"
          class="mt-4 text-primary hover:text-primary-dark underline"
        >
          Limpar busca
        </button>
      </div>

      <div v-else>
        <div class="mb-6 text-sm text-gray-600">
          <span v-if="searchQuery.trim()">
            {{ courses.length }} curso{{
              courses.length !== 1 ? 's' : ''
            }}
            encontrado{{ courses.length !== 1 ? 's' : '' }} para "{{
              searchQuery
            }}"
          </span>
          <span v-else>
            {{ courses.length }} curso{{
              courses.length !== 1 ? 's' : ''
            }}
            disponív{{ courses.length !== 1 ? 'eis' : 'el' }}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CourseCard
            v-for="course in courses"
            :key="course.id"
            :course="course"
          />
        </div>
      </div>
    </div>
  </div>
</template>
