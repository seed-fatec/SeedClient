<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCoursesStore } from "~/stores/courses";
import { useAuthStore } from "~/stores/auth";

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const authStore = useAuthStore();
const coursesStore = useCoursesStore();
const courseDetails = ref(props.course);
const loading = ref(false);

const fetchCourseDetails = async () => {
  if (courseDetails.value.teacher?.name) return;

  loading.value = true;
  try {
    const { data } = await coursesStore.fetchCourseDetails(props.course.id);
    if (data) {
      courseDetails.value = data;
    }
  } catch (err) {
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCourseDetails();
});

const teacherName = computed(
  () => courseDetails.value.teachers[0].name || "Professor"
);
const teacherIcon = computed(
  () => courseDetails.value.teachers[0].avatar_url
);

const formattedPrice = computed(() => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(courseDetails.value.price / 100);
});

const formatDate = (dateString) => {
  if (!dateString) return "Não definida";

  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

const startDate = computed(() => formatDate(courseDetails.value.start_date));
const endDate = computed(() => formatDate(courseDetails.value.end_date));

const navigateToCourse = () => {
  const route = authStore.isTeacher
    ? `/teacher/courses/${courseDetails.value.id}`
    : `/courses/${courseDetails.value.id}`;
  router.push(route);
};
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
    @click="navigateToCourse"
  >
    <div
      v-if="course.avatar_url"
      class="h-40 bg-primary flex items-center justify-center relative"
    >
      <img class="w-full h-full object-cover" :src="course.avatar_url" />
    </div>
    <div v-else class="h-40 bg-primary flex items-center justify-center">
      <h1 class="text-3xl font-bold text-white justify-center flex gap-0.5">
        Se<span class="text-primary bg-white px-1 rounded">ed</span>
      </h1>
    </div>
    <div class="p-4">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-xl font-semibold text-gray-800">
          {{ courseDetails.name }}
        </h3>
        <span class="ml-1 text-white badge badge-success">
          {{ courseDetails.remaining_vacancies }} vagas
        </span>
      </div>
      <div class="grid grid-cols-2 gap-2 mb-4 text-sm">
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
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <div
              v-if="!teacherIcon"
              class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-2"
            >
              {{ teacherName.charAt(0) }}
            </div>
            <img
              v-else
              class="w-8 h-8 rounded-full mr-2"
              :src="teacherIcon"
              alt="Teacher Avatar"/>
            <span class="text-sm text-gray-600">{{ teacherName }}</span>
          </div>
          <div>
            <span class="text-2xl">{{ formattedPrice }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
