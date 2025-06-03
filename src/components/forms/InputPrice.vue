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
    <div class="relative">
      <span
        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
        >R$</span
      >
      <Field
        :name="name"
        :value="value"
        :rules="validation"
        :label="label"
        :placeholder="placeholder"
        type="text"
        min="0"
        step="1"
        class="bg-white block w-full rounded-md indent-2 pl-8 border-0 py-1.5 text-neutral-800 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-300 focus:outline-2 focus:outline-inset focus:outline-primary sm:text-sm sm:leading-6"
      />
    </div>
    <ErrorMessage :name="name" class="text-red-400 text-sm" />
  </div>
</template>
