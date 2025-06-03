<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { toast } from 'vue3-toastify'

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
  const { execute, isFetching, data } = authStore.login(
    values.email,
    values.password,
    false
  )

  loading.value = isFetching.value

  execute().then(() => {
    toast.success('Login realizado com sucesso!')

    if (data.value) {
      authStore.setAccessToken(data.value.access_token)
      authStore.setRefreshToken(data.value.refresh_token)
      authStore.setIsTeacher(false)
    }

    router.push({ name: 'MyCourses' })
  })
})
</script>

<template>
  <div class="max-w-md w-full">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-primary justify-center flex gap-0.5">
        Se<span class="text-white bg-primary px-1 rounded">ed</span>
      </h1>
      <p class="text-gray-700 mt-2">Entrar como Aluno</p>
    </div>

    <form @submit.prevent="onLoginSubmit" class="space-y-6">
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

      <div v-if="error" class="alert alert-error text-sm">{{ error }}</div>

      <button type="submit" class="btn btn-primary w-full" :disabled="loading">
        <span v-if="loading">Carregando...</span>
        <span v-else>Entrar como Aluno</span>
      </button>

      <div class="text-center mt-4">
        <p class="text-sm text-gray-700">Ainda não tem uma conta?</p>
        <router-link
          :to="{ name: 'Register' }"
          class="text-sm text-primary hover:underline"
        >
          Registrar como Aluno
        </router-link>
      </div>

      <div class="text-center mt-4">
        <p class="text-sm text-gray-700">Você é professor?</p>
        <router-link
          :to="{ name: 'TeacherLogin' }"
          class="text-sm text-primary hover:underline"
        >
          Entrar como Professor
        </router-link>
      </div>
    </form>
  </div>
</template>
