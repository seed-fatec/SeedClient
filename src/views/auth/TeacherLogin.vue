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
  email: yup.string().required('O email é obrigatório').email('Email inválido'),
  password: yup
    .string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

const { handleSubmit, values } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: '',
  },
})

const onLoginSubmit = handleSubmit(async () => {
  try {
    loading.value = true
    error.value = ''

    const response = await authStore.login({
      email: values.email,
      password: values.password,
      isTeacher: true,
    })

    if (response.data) {
      await authStore.me()
      router.push({ name: 'TeacherCourses' })
    } else {
      error.value = 'Credenciais inválidas'
    }
  } catch (err) {
    error.value = err.message || 'Falha no login'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="max-w-md w-full">
    <div class="text-center mb-8">
      <h1
        class="text-3xl font-bold text-emerald-600 justify-center flex gap-0.5"
      >
        Seed <span class="text-white bg-emerald-600 px-2 rounded">Teacher</span>
      </h1>
      <p class="text-gray-700 mt-2">Portal do Professor</p>
    </div>

    <form @submit.prevent="onLoginSubmit" class="space-y-6">
      <InputEmail
        name="email"
        placeholder="Seu@email.com"
        validation="required|email"
        class="border-emerald-600 focus:border-emerald-700"
      />
      <InputPassword
        name="password"
        placeholder="Digite sua senha"
        validation="required|min:6"
        class="border-emerald-600 focus:border-emerald-700"
      />

      <div v-if="error" class="alert alert-error text-sm">{{ error }}</div>

      <button
        type="submit"
        class="btn w-full border-none bg-emerald-600 hover:bg-emerald-700 text-white"
        :disabled="loading"
      >
        <span v-if="loading">Carregando...</span>
        <span v-else>Acessar Portal do Professor</span>
      </button>

      <div class="text-center mt-4">
        <p class="text-sm text-gray-700">Você é aluno?</p>
        <router-link
          :to="{ name: 'Login' }"
          class="text-sm text-emerald-600 hover:underline"
        >
          Entrar como Aluno
        </router-link>
      </div>
    </form>
  </div>
</template>
