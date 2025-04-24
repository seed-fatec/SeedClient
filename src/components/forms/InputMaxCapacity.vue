<script setup>
import { Field, ErrorMessage } from 'vee-validate'

const props = defineProps({
  name: String,
  value: String,
  validation: String,
  label: String,
  placeholder: String,
})
</script>

<template>
  <div>
    <Field
      :name
      :value
      :rules
      :label
      :placeholder
      type="number"
      min="1"
      max="30"
      step="1"
      class="bg-white block w-full rounded-md indent-2 border-0 py-1.5 text-neutral-800 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-300 focus:outline-2 focus:outline-inset focus:outline-primary-700 sm:text-sm sm:leading-6"
    />
    <ErrorMessage :name="name" class="text-red-400 text-sm" />
  </div>
</template>
