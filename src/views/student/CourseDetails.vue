<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCoursesStore } from "~/stores/courses";
import { useClassStore } from "~/stores/class";
import EnrollModal from "~/blocks/student/EnrollModal.vue";
import CourseBanner from "~/blocks/student/CourseBanner.vue";
import CourseInfoCard from "~/blocks/student/CourseInfoCard.vue";
import ClassInfoCard from "~/blocks/student/ClassInfoCard.vue";

const route = useRoute();
const coursesStore = useCoursesStore();
const classStore = useClassStore();

const showDevModal = ref(false);
const classes = ref([]);
const loadingClasses = ref(true);

const { execute, data } = coursesStore.fetchCourseDetails(route.params.id);
execute();

const course = computed(() => data.value || null);

const handleJoin = () => {
  showDevModal.value = true;
};

onMounted(async () => {
  loadingClasses.value = true;
  try {
    const { data, execute } = classStore.index(route.params.id);
    await execute();
    classes.value = data.value?.classes || [];
  } finally {
    loadingClasses.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col items-center min-h-screen bg-base-100">
    <div
      v-if="course"
      class="w-full max-w-4xl mx-auto rounded-2xl shadow-lg overflow-hidden bg-white mt-8 mb-12"
    >
      <CourseBanner :course="course" />
      <CourseInfoCard :course="course" @join="handleJoin" />
    </div>
    <!-- Listagem de aulas -->
    <div class="w-full max-w-4xl mx-auto mb-12 px-4">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Aulas do curso</h2>
      <div v-if="loadingClasses" class="flex justify-center items-center h-32">
        <div
          class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"
        ></div>
      </div>
      <div v-else-if="classes.length === 0" class="text-gray-500">
        Nenhuma aula cadastrada para este curso.
      </div>
      <div v-else class="flex flex-col gap-4">
        <ClassInfoCard v-for="lesson in classes" :key="lesson.id" :lesson="lesson" />
      </div>
    </div>
    <EnrollModal
      v-if="course"
      :course="course"
      :is-open="showDevModal"
      @close="showDevModal = false"
    />
  </div>
</template>
