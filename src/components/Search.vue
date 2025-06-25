<script setup>
import { ref, watch, computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  sortOrder: {
    type: String,
    default: 'desc',
  },
  placeholder: {
    type: String,
    default: 'Pesquisar...',
  },
})

const emit = defineEmits(['update:modelValue', 'update:sortOrder', 'search'])

const searchQuery = ref(props.modelValue)

watch(searchQuery, (newValue) => {
  emit('update:modelValue', newValue)
  emit('search', newValue)
})

watch(
  () => props.modelValue,
  (newValue) => {
    searchQuery.value = newValue
  }
)

const setSortOrder = (newSortOrder) => {
  emit('update:sortOrder', newSortOrder)
}

const sortIcon = computed(() => {
  return props.sortOrder === 'desc'
    ? 'lucide:arrow-down-wide-narrow'
    : 'lucide:arrow-up-wide-narrow'
})

const sortOptions = [
  { value: 'asc', label: 'Mais recentes' },
  { value: 'desc', label: 'Mais antigos' },
]
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-3 select-none">
    <!-- Sort Dropdown -->
    <div class="dropdown dropdown-left">
      <button
        tabindex="0"
        role="button"
        class="w-full sm:w-auto px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring focus:ring-primary"
        aria-label="Sort Options"
      >
        <Icon :icon="sortIcon" class="size-5 text-gray-400" />
      </button>
      <ul
        tabindex="0"
        class="dropdown-content mr-2 bg-white rounded-box w-56 p-2 border border-gray-300"
      >
        <li v-for="option in sortOptions" :key="option.value">
          <a
            @click="setSortOrder(option.value)"
            class="btn btn-ghost font-normal flex items-center justify-between hover:bg-gray-100"
            :class="{ active: props.sortOrder === option.value }"
          >
            <span>{{ option.label }}</span>
            <input
              type="radio"
              :checked="props.sortOrder === option.value"
              class="radio radio-primary radio-sm"
              readonly
            />
          </a>
        </li>
      </ul>
    </div>

    <!-- Search Input -->
    <div class="relative flex-1">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="placeholder"
        class="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary text-sm text-gray-700 placeholder-gray-400"
        aria-label="Search"
      />
      <span
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <Icon icon="lucide:search" class="size-5 text-gray-400" />
      </span>
    </div>
  </div>
</template>
