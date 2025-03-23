<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')

const schema = yup.object({
  name: yup.string().required('O nome é obrigatório'),
  email: yup.string().required('O email é obrigatório').email('Email inválido'),
  password: yup
    .string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: yup
    .string()
    .required('Confirme a senha')
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
})

const { handleSubmit, values } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
})

const onRegisterSubmit = handleSubmit(async () => {
  try {
    loading.value = true
    error.value = ''

    console.log('Attempting teacher registration:', values)

    const response = await authStore.registerTeacher({
      name: values.name,
      email: values.email,
      password: values.password,
    })

    console.log('Teacher registration response:', response)

    if (response.data) {
      await authStore.login({
        email: values.email,
        password: values.password,
        isTeacher: true,
      })

      await authStore.me()
      router.push({ name: 'Home' })
    } else {
      error.value = 'Falha no cadastro'
    }
  } catch (err) {
    console.error('Teacher registration error:', err)
    error.value = err.message || 'Falha no cadastro'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="max-w-md w-full">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-primary justify-center flex gap-0.5">
        Se<span class="text-white bg-primary px-1 rounded">ed</span>
      </h1>
      <p class="text-gray-700 mt-2">Crie sua conta de Professor</p>
    </div>

    <form @submit.prevent="onRegisterSubmit" class="space-y-4">
      <InputName
        name="name"
        placeholder="Seu nome completo"
        validation="required"
      />

      <InputEmail
        name="email"
        placeholder="Seu@email.com"
        validation="required|email"
      />

      <InputPassword
        name="password"
        placeholder="Digite sua senha"
        validation="required|min:6"
      />

      <InputPassword
        name="confirmPassword"
        placeholder="Confirme sua senha"
        validation="required|same:password"
      />

      <div v-if="error" class="alert alert-error text-sm">{{ error }}</div>

      <button type="submit" class="btn btn-primary w-full" :disabled="loading">
        <span v-if="loading">Carregando...</span>
        <span v-else>Cadastrar como Professor</span>
      </button>

      <div class="text-center mt-4">
        <p class="text-sm text-gray-700">Já tem uma conta?</p>
        <router-link
          :to="{ name: 'TeacherLogin' }"
          class="text-sm text-primary hover:underline"
        >
          Entrar como Professor
        </router-link>
      </div>

      <div class="text-center mt-4">
        <p class="text-sm text-gray-700">Você é aluno</p>
        <router-link
          :to="{ name: 'Login' }"
          class="text-sm text-primary hover:underline"
        >
          Entrar como Aluno
        </router-link>
      </div>
    </form>
  </div>
</template>
