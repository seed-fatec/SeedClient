<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed } from 'vue'

const schema = yup.object({
  name: yup
    .string()
    .required('O nome é obrigatório')
    .min(3, 'O nome deve ter no mínimo 3 caracteres'),
  email: yup
    .string()
    .required('O email é obrigatório')
    .email('Digite um email válido'),
  phone: yup
    .string()
    .required('O telefone é obrigatório')
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Formato de telefone inválido'),
  birthdate: yup
    .string()
    .required('A data de nascimento é obrigatória')
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Formato deve ser dd/mm/aaaa'),
  biography: yup.string().nullable(),
})

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: props.initialValues,
})

const onSubmit = handleSubmit((values) => {
  
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="container max-w-3xl mx-auto px-4 py-8 space-y-6">
    <h1 class="text-2xl font-bold text-center">Meu Perfil</h1>
    <div class="flex items-center justify-center relative mb-4">
      <div class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-4xl text-indigo-500 shadow">
        <i class="fas fa-user"></i>
      </div>
      <button class="absolute bottom-2 right-[calc(50%-48px)] bg-white rounded-full p-1 shadow text-gray-500 hover:text-indigo-500">
        <i class="fas fa-pen"></i>
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <label for="phone" class="label">
          <span class="label-text font-medium text-gray-800">Telefone</span>
        </label>
        <InputPhone
          id="phone"
          name="phone"
          placeholder="(99) 99999-9999"
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
        <label for="birthdate" class="label">
          <span class="label-text font-medium text-gray-800">Data de Nascimento</span>
        </label>
        <InputDate
          id="birthdate"
          name="birthdate"
          placeholder="DD/MM/AAAA"
        />
      </div>
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
      <button type="submit" class="btn btn-primary">
        Salvar
      </button>
    </div>
  </form>
</template>
