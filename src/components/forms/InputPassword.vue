<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  name: String,
  value: String,
  validation: String,
  label: String,
  placeholder: String,
})

const showPassword = ref(false)
const inputType = computed(() => (showPassword.value ? 'text' : 'password'))
</script>

<template>
  <div class="relative">
    <div class="relative">
      <Field
        v-bind="props"
        :type="inputType"
        class="bg-white block w-full rounded-md indent-2 border-0 py-1.5 text-neutral-800 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-300 focus:outline-2 focus:outline-inset focus:outline-primary-700 sm:text-sm sm:leading-6 pr-10"
      />
      <button
        type="button"
        @click="showPassword = !showPassword"
        class="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
      >
        <Icon
          :icon="showPassword ? 'mdi:eye-off' : 'mdi:eye'"
          class="w-5 h-5"
        />
      </button>
    </div>
    <ErrorMessage :name="name" class="text-red-400 text-sm" />
  </div>
</template>
