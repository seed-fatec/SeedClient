<script setup>
defineProps({
  price: {
    type: String,
    required: true,
  },
  maxCapacity: {
    type: [String, Number],
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div>
    <h2 class="text-lg font-semibold text-gray-800 mb-4">
      Informações do Curso
    </h2>
    <div class="space-y-2">
      <p>
        <span class="font-medium text-gray-700">Preço:</span>
        <span class="ml-2 text-gray-600">{{ price }}</span>
      </p>
      <p>
        <span class="font-medium text-gray-700">Capacidade Máxima:</span>
        <span class="ml-2 text-gray-600">{{ maxCapacity }} alunos</span>
      </p>
      <p>
        <span class="font-medium text-gray-700">Data de Início:</span>
        <span class="ml-2 text-gray-600">{{ startDate }}</span>
      </p>
      <p>
        <span class="font-medium text-gray-700">Data de Término:</span>
        <span class="ml-2 text-gray-600">{{ endDate }}</span>
      </p>
    </div>
  </div>
</template>
