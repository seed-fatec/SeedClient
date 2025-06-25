<script setup>
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { computed } from 'vue'
import * as yup from 'yup'
import { Icon } from '@iconify/vue'
import { apiUrl } from '~/config/env'
import { useAuthStore } from '~/stores/auth'

const props = defineProps({
  initialValues: {
    type: Object,
    default: () => ({
      name: '',
      biography: '',
      email: '',
      birth_date: '',
    }),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  isFree: {
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

const authStore = useAuthStore()

const emit = defineEmits(['submit', 'cancel'])
const free = ref(props.isFree)

const schema = yup.object({
  name: yup
    .string()
    .required('O nome é obrigatório')
    .min(3, 'O nome deve ter no mínimo 3 caracteres'),
  biography: yup.string().nullable(),
  birth_date: yup
    .string()
    .nullable(),
})

const { handleSubmit, values } = useForm({
  validationSchema: schema,
  initialValues: props.initialValues,
})

const onSubmit = handleSubmit(async (formValues) => {
  emit('submit', formValues)
})

const buttonLabel = computed(() =>
  props.loading ? props.loadingButtonText : props.submitButtonText
)

const imagePreview = ref(props.initialValues.avatar_url)
const uploadedFiles = ref([])

async function onImageChange(event) {
  const file = event.target.files[0]
  if (!file) return

  imagePreview.value = URL.createObjectURL(file)

  const formData = new FormData()
  formData.append('file', file)

  const url = `${apiUrl}/users/me/avatar`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authStore.accessToken}`
      },
      body: formData
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Erro ao enviar avatar:', error)
    }
  } catch (error) {
    console.error('Erro na requisição:', error)
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
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
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
    <div class="col-span-1">
      <div class="relative w-full h-40 bg-neutral-100 rounded-md flex items-center justify-center border border-dashed">
        <label class="aular-pointer w-full h-full flex justify-center items-center">
          <input type="file" accept="image/*" class="hidden" @change="onImageChange" />
          <img v-if="imagePreview" :src="imagePreview" alt="Preview" class="h-full object-cover" />
          <span v-else class="text-neutral-400 text-4xl">
            <Icon icon="material-symbols:image-outline" class="size-10" />
          </span>
        </label>
      </div>
    </div>
    <form @submit.prevent="onSubmit" class="space-y-6 col-span-2">
      <div class="form-control">
        <label for="name" class="label">
          <span class="label-text font-medium text-gray-800">Nome</span>
        </label>
        <InputName
          id="name"
          name="name"
          placeholder="Digite seu nome completo"
        />
      </div>
      <div class="form-control">
        <label for="email" class="label">
          <span class="label-text font-medium text-gray-800">Email</span>
        </label>
        <InputEmail
          id="email"
          name="email"
          placeholder="exemplo@email.com"
        />
      </div>
      <div class="form-control">
        <label for="birth_date" class="label">
          <span class="label-text font-medium text-gray-800">Data de Nascimento</span>
        </label>
        <InputDate
          id="birth_date"
          name="birth_date"
          placeholder="DD/MM/AAAA"
        />
      </div>
      <div class="form-control">
        <label for="biography" class="label">
          <span class="label-text font-medium text-gray-800">Biografia</span>
        </label>
        <InputDescription
          id="biography"
          name="biography"
          placeholder="Conte um pouco sobre você"
        />
      </div>
      <div class="flex justify-end space-x-4">
        <button :disabled="loading" type="submit" class="btn btn-primary">
          {{ buttonLabel }}
        </button>
      </div>
    </form>
  </div>
</template>
