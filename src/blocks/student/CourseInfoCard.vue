<script setup>
const props = defineProps({
  course: { type: Object, required: true },
});
const emit = defineEmits(["join"]);

const formatDate = (dateString) => {
  if (!dateString) return "Não definida";

  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

const formattedPrice = (price) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price / 100);
};

const handleJoin = () => {
  emit("join");
};
</script>

<template>
  <div class="p-8">
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
    >
      <div class="flex items-center gap-4">
        <img
          v-if="course?.teachers && course?.teachers[0]?.avatar_url"
          :src="course.teachers[0].avatar_url"
          alt="Avatar do professor"
          class="w-12 h-12 rounded-full border-2 border-primary"
        />
        <div>
          <RouterLink
            v-if="course?.teachers && course?.teachers[0]?.id"
            :to="`/teachers/${course.teachers[0].id}/profile`"
            class="text-lg font-semibold text-primary hover:underline"
          >
            {{ course?.teachers[0]?.name || "Professor" }}
          </RouterLink>
          <span v-else class="text-lg font-semibold text-gray-700">
            {{ course?.teachers[0]?.name || "Professor" }}
          </span>
          <div class="text-sm text-gray-500">Professor</div>
        </div>
      </div>
      <div class="flex gap-6 text-sm">
        <div>
          <span class="font-medium text-gray-700">Início:</span>
          <span class="ml-1 text-gray-600">{{
            formatDate(course?.start_date)
          }}</span>
        </div>
        <div>
          <span class="font-medium text-gray-700">Término:</span>
          <span class="ml-1 text-gray-600">{{
            formatDate(course?.end_date)
          }}</span>
        </div>
      </div>
    </div>
    <div class="mb-6">
      <h2 class="text-lg font-semibold text-gray-800 mb-2">Descrição</h2>
      <p class="text-gray-700 whitespace-pre-line">
        {{ course?.description || "Sem descrição." }}
      </p>
    </div>
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
    >
      <div class="flex items-center gap-2">
        <span class="font-medium text-gray-700">Vagas:</span>
        <span class="text-lg font-bold text-primary">{{
          course?.remaining_vacancies
        }}</span>
        <span class="text-gray-500">de {{ course?.max_capacity }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="font-medium text-gray-700">Preço:</span>
        <span class="text-2xl font-bold text-green-600">{{
          formattedPrice(course?.price)
        }}</span>
      </div>
      <button
        class="btn btn-primary px-8 py-3 text-lg font-semibold shadow-md"
        @click="handleJoin"
      >
        Participar do curso
      </button>
    </div>
  </div>
</template>
