<script setup>
import { useForm } from 'vee-validate'
import { computed } from 'vue'
import * as yup from 'yup'

const props = defineProps({
  initialValues: {
    type: Object,
    default: () => ({
      name: '',
      description: '',
      price: '',
      max_capacity: '',
      start_date: '',
      end_date: '',
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

const schema = yup.object({
  name: yup
    .string()
    .required('O nome é obrigatório')
    .min(8, 'O nome deve ter no mínimo 8 caracteres'),
  description: yup.string().nullable(),
  price: yup
    .string()
    .required('O preço é obrigatório')
    .min(0, 'O preço deve ser maior ou igual a zero'),
  max_capacity: yup
    .number()
    .required('A capacidade máxima é obrigatória')
    .typeError('A capacidade deve ser um número inteiro')
    .min(1, 'A capacidade deve ser maior ou igual a 1')
    .max(30, 'A capacidade deve ser menor ou igual a 30'),
  start_date: yup.string().nullable(),
  end_date: yup.string().nullable(),
})

const { handleSubmit, values, setValues } = useForm({
  validationSchema: schema,
  initialValues: props.initialValues,
})

const onSubmit = handleSubmit(async (formValues) => {
  const courseData = {
    ...formValues,
    price: parseInt(formValues.price, 10),
    max_capacity: parseInt(formValues.max_capacity, 10),
    description: formValues.description,
    start_date: formValues.start_date,
    end_date: formValues.end_date,
  }
  emit('submit', courseData)
})

const buttonLabel = computed(() => props.loading ? props.loadingButtonText : props.submitButtonText)
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <div class="form-control">
      <label for="name" class="label">
        <span class="label-text font-medium text-gray-800">Nome do Curso</span>
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
        <label for="price" class="label">
          <span class="label-text font-medium text-gray-800">Preço</span>
        </label>
        <InputPrice
          id="price"
          name="price"
          placeholder="Digite o preço do curso"
          validation="required|integer|min:0"
        />
      </div>

      <div class="form-control">
        <label for="max_capacity" class="label">
          <span class="label-text font-medium text-gray-800"
            >Capacidade Máxima</span
          >
        </label>
        <InputMaxCapacity
          id="max_capacity"
          name="max_capacity"
          placeholder="Digite a capacidade máxima"
          validation="required|integer|min:1|max:30"
        />
      </div>
    </div>
    

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="form-control">
        <label for="start_date" class="label">
          <span class="label-text font-medium text-gray-800"
            >Data de Início</span
          >
        </label>
        <InputDate
          id="start_date"
          name="start_date"
          placeholder="Selecione a data de início"
        />
      </div>

      <div class="form-control">
        <label for="end_date" class="label">
          <span class="label-text font-medium text-gray-800"
            >Data de Término</span
          >
        </label>
        <InputDate
          id="end_date"
          name="end_date"
          placeholder="Selecione a data de término"
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

    <div class="flex justify-end space-x-4">
      <button
        type="button"
        class="btn btn-outline btn-error"
        @click="emit('cancel')"
        :disabled="loading"
      >
        Cancelar
      </button>

      <button
        :disabled="loading"
        type="submit"
        class="btn btn-primary"
      >
        {{ buttonLabel }}
      </button>
    </div>
  </form>
</template>
