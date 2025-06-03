<script setup>
import { ErrorMessage, useField } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps({
  name: String,
  value: String,
  validation: String,
  label: String,
  placeholder: String,
})

function formatCurrency(value) {
  if (!value) return ''
  const num = Number(value.toString().replace(/\D/g, '')) / 100
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(num)
}

function unmaskCurrency(value) {
  if (!value) return ''
  return value.replace(/\D/g, '')
}

const { value: fieldValue, handleChange } = useField(props.name, props.validation, {
  initialValue: props.value,
})

const maskedValue = computed({
  get: () => formatCurrency(fieldValue.value),
  set: (val) => {
    const unmasked = unmaskCurrency(val)
    handleChange(unmasked)
  },
})
</script>

<template>
  <div>
    <div class="relative">
      <input
        v-model="maskedValue"
        type="text"
        inputmode="numeric"
        class="bg-white block w-full rounded-md indent-2 border-0 py-1.5 text-neutral-800 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-300 focus:outline-2 focus:outline-inset focus:outline-primary sm:text-sm sm:leading-6"
        :placeholder="placeholder"
      />
    </div>
    <ErrorMessage :name="name" class="text-red-400 text-sm" />
  </div>
</template>
