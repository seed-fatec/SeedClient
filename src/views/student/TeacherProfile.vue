<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useUsersStore } from "~/stores/users";
import { useCoursesStore } from "~/stores/courses";
import TeacherCourseCard from "~/blocks/TeacherCourseCard.vue";

const route = useRoute();
const usersStore = useUsersStore();
const coursesStore = useCoursesStore();
const loading = ref(true);
const error = ref("");
const teacher = ref(null);
const teacherCourses = ref([]);
const bioExpanded = ref(false);

onMounted(async () => {
  loading.value = true;
  error.value = "";
  try {
    // Buscar dados do professor
    const { data: teacherData, execute: fetchTeacher } =
      usersStore.getTeacherById(route.params.id);
    await fetchTeacher();
    teacher.value = teacherData.value;

    // Buscar cursos do professor
    const { data: coursesData, execute: fetchCourses } =
      coursesStore.fetchTeacherCourses(route.params.id);
    await fetchCourses();
    teacherCourses.value =
      coursesData.value && coursesData.value.courses
        ? coursesData.value.courses
        : [];
  } catch (err) {
    console.log(err);
    error.value = "Erro ao carregar perfil do professor.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="w-full min-h-screen bg-white px-0 py-8">
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
      ></div>
    </div>
    <div
      v-else-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-2xl mx-auto"
    >
      {{ error }}
    </div>
    <div v-else-if="teacher" class="max-w-5xl mx-auto px-4">
      <div class="flex flex-col md:flex-row md:items-center md:space-x-8 mb-8">
        <img
          :src="teacher.avatar_url || 'https://placehold.co/120x120.png'"
          :alt="teacher.name"
          class="w-32 h-32 rounded-full border-2 border-primary mb-4 md:mb-0"
        />
        <div class="flex-1">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            {{ teacher.name }}
          </h1>
          <div class="mb-4">
            <h2 class="text-lg font-semibold mb-2">Sobre</h2>
            <div
              :class="[
                'relative',
                bioExpanded ? '' : 'max-h-24 overflow-hidden',
              ]"
            >
              <p class="text-gray-700 whitespace-pre-line">
                {{ teacher.biography || "Nenhuma descrição disponível." }}
              </p>
              <div
                v-if="
                  !bioExpanded &&
                  teacher.biography &&
                  teacher.biography.length > 120
                "
                class="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent flex items-end justify-center pointer-events-none"
              ></div>
            </div>
            <button
              v-if="teacher.biography && teacher.biography.length > 120"
              class="mt-2 text-primary font-semibold focus:outline-none"
              @click="bioExpanded = !bioExpanded"
            >
              {{ bioExpanded ? "Mostrar menos" : "Mostrar mais" }}
            </button>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 class="text-base font-semibold text-gray-600">Cursos</h3>
              <p class="text-2xl font-bold text-primary">
                {{ teacherCourses.length }}
              </p>
            </div>
            <div class="text-right">
              <h3 class="text-base font-semibold text-gray-600">
                Data de nascimento
              </h3>
              <p class="text-lg text-gray-700">
                {{
                  teacher.birth_date
                    ? teacher.birth_date.split("-").reverse().join("/")
                    : "Não informada"
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 class="text-2xl font-bold text-gray-800 mb-4">
          Cursos do professor
        </h2>
        <div v-if="teacherCourses.length === 0" class="text-gray-500">
          Nenhum curso encontrado.
        </div>
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <TeacherCourseCard
            v-for="course in teacherCourses"
            :key="course.id"
            :course="course"
          />
        </div>
      </div>
    </div>
  </div>
</template>
