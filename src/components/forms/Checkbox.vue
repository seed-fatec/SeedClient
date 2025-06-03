<script setup>
import { Field, ErrorMessage } from 'vee-validate'

const props = defineProps({
  name: String,
  label: String,
  validation: String,
})
</script>

<template>
  <div class="flex items-center gap-2">
    <Field
      type="checkbox"
      :name="name"
      :label
      :rules="validation"
     
    >
      <input
        type="checkbox"
        v-bind="field"
        :id="name"
        class="h-4 w-4 text-primary border-neutral-300 rounded focus:ring-primary"
      />
    </Field>
    <ErrorMessage :name="name" class="text-red-400 text-sm ml-2" />
  </div>
</template>
