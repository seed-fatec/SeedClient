<script setup>
import { useForm } from 'vee-validate'
import { ref, watch } from 'vue'
import { computed } from 'vue'
import * as yup from 'yup'
import { Icon } from '@iconify/vue'

const props = defineProps({
  initialValues: {
    type: Object,
    default: () => ({
      name: '',
      description: '',
      duration_minutes: '',
      start_timestamp: '',
      free: false,
    }),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  submitButtonText: {
    type: String,
    default: 'Salvar',
  },
  loadingButtonText: {
    type: String,
    default: 'Salvando...',
  },
})

const emit = defineEmits(['submit', 'cancel'])
const free = ref(false)

const schema = yup.object({
  name: yup
    .string()
    .required('O nome é obrigatório')
    .min(8, 'O nome deve ter no mínimo 8 caracteres'),
  description: yup.string().nullable(),
  start_timestamp: yup.string().nullable(),
  duration_minutes: yup.number().nullable(),
})

const { handleSubmit, values } = useForm({
  validationSchema: schema,
  initialValues: props.initialValues,
})

const onSubmit = handleSubmit(async (formValues) => {
  const courseData = {
    ...formValues,
    description: formValues.description,
    start_timestamp: formValues.start_timestamp,
    duration_minutes: formValues.duration_minutes,
    free: free.value,
  }
  console.log('Submitting course data:', courseData)
  emit('submit', courseData)
})

const buttonLabel = computed(() =>
  props.loading ? props.loadingButtonText : props.submitButtonText
)

const imagePreview = ref(null)
const uploadedFiles = ref([])

function onImageChange(event) {
  const file = event.target.files[0]
  if (file) {
    imagePreview.value = URL.createObjectURL(file)
  }
}

function onFilesChange(event) {
  const newFiles = Array.from(event.target.files)

  const existing = new Set(uploadedFiles.value.map(f => f.name + f.size))
  const filtered = newFiles.filter(f => !existing.has(f.name + f.size))

  uploadedFiles.value = [...uploadedFiles.value, ...filtered]
}

function removeFile(index) {
  uploadedFiles.value.splice(index, 1)
}

watch(uploadedFiles, () => {
  console.log('Uploaded files:', uploadedFiles.value)
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
    <div>
      <div class="relative w-full h-40 bg-neutral-100 rounded-md flex items-center justify-center border border-dashed">
        <label class="cursor-pointer w-full h-full flex justify-center items-center">
          <input type="file" accept="image/*" class="hidden" @change="onImageChange" />
          <img v-if="imagePreview" :src="imagePreview" alt="Preview" class="h-full object-contain" />
          <span v-else class="text-neutral-400 text-4xl">
            <Icon icon="line-md:image" class="size-10" />
          </span>
        </label>
      </div>
      <div class="w-full mt-12">
        <label class="block text-sm font-medium text-neutral-700 mb-1">Arquivos</label>
        <input
          type="file"
          class="block w-full text-sm text-neutral-500 file:mr-4 file:py-1 file:px-2 file:border-0 file:rounded file:bg-neutral-200 file:text-neutral-700"
          multiple
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          @change="onFilesChange"
        />

        <ul class="mt-2 text-sm text-neutral-700 space-y-1 overflow-y-auto max-h-40">
          <li
            v-for="(file, index) in uploadedFiles"
            :key="file.name + file.size"
            class="flex items-center justify-between bg-neutral-100 px-2 py-1 rounded"
          >
            <span class="truncate w-40">{{ file.name }}</span>
            <button @click="removeFile(index)" class="text-red-500 hover:text-red-700 text-xs font-semibold ml-2">
              ✕
            </button>
          </li>
        </ul>
      </div>
    </div>
    <form @submit.prevent="onSubmit" class="space-y-6">
      <div class="form-control">
        <label for="name" class="label">
          <span class="label-text font-medium text-gray-800">Nome da Aula</span>
        </label>
        <InputName
          id="name"
          name="name"
          placeholder="Digite o nome do curso"
          validation="required|min:8"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="form-control">
          <label for="start_timestamp" class="label">
            <span class="label-text font-medium text-gray-800"
              >Data de Início</span
            >
          </label>
          <InputTimestamp
            id="start_timestamp"
            name="start_timestamp"
            placeholder="Selecione a data de início"
          />
        </div>
        <div class="form-control">
          <label for="duration_minutes" class="label">
            <span class="label-text font-medium text-gray-800">
              Duração (em minutos)
            </span>
          </label>
          <InputNumber
            id="duration_minutes"
            name="duration_minutes"
            placeholder="Digite a duração da aula"
          />
        </div>
      </div>
      <div class="form-control">
        <label for="description" class="label">
          <span class="label-text font-medium text-gray-800">Descrição</span>
        </label>
        <InputDescription
          id="description"
          name="description"
          placeholder="Digite a descrição do curso"
        />
      </div>
      <div class="form-control flex flex-col">
        <label for="free" class="label">
          <span class="label-text font-medium text-gray-800">Aula grátis</span>
        </label>
        <input
          v-model="free"
          type="checkbox"
          class="h-4 w-4 text-primary border-neutral-300 rounded focus:ring-primary"
        />
      </div>
      <div class="flex justify-end space-x-4">
        <button
          :disabled="loading"
          type="button"
          class="btn btn-outline btn-error"
          @click="emit('cancel')"
        >
          Cancelar
        </button>

        <button :disabled="loading" type="submit" class="btn btn-primary">
          {{ buttonLabel }}
        </button>
      </div>
    </form>
  </div>
</template>
