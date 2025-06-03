import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useAuthStore } from '~/stores/auth'
import { isTokenExpired } from '~/utils/jwt'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guarda de navegação para verificar autenticação e permissões
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const { accessToken, refreshToken } = authStore

  // Se for fazer login ou registro e já tiver tokens, redireciona para a página inicial
  if (
    (to.name === 'Login' ||
      to.name === 'Register' ||
      to.name === 'TeacherLogin') &&
    accessToken &&
    refreshToken
  ) {
    return next({ name: 'MyCourses' })
  }

  // Se faltar o token e tentar acessar uma rota protegida, redireciona para o login
  if (
    (!accessToken || !refreshToken) &&
    to.matched.some((record) => record.meta.requiresAuth)
  ) {
    return next({ name: 'Login' })
  }

  // Se faltar o token e for para login ou registro, permite o acesso
  if (!accessToken || !refreshToken) {
    return next()
  }

  // Verifica a expiração do token
  if (isTokenExpired(accessToken)) {
    // Se o token de atualização também tiver expirado, faz o logout e redireciona para o login
    if (isTokenExpired(refreshToken)) {
      await authStore.logout()
      return next({ name: 'Login' })
    }

    // Se o token de atualização for válido, atualiza o token de acesso
    const success = await authStore.refreshAccessToken()
    if (!success) {
      // Se a atualização falhar, faz o logout e redireciona para o login
      await authStore.logout()
      return next({ name: 'Login' })
    }
  }

  // Verifica se a rota requer que o usuário seja professor
  if (
    to.matched.some((record) => record.meta.requiresTeacher === true) &&
    !authStore.isTeacher
  ) {
    // Se a rota requer professor mas o usuário não é professor, redireciona para a página inicial
    return next({ name: 'MyCourses' })
  }

  // Verifica se a rota requer que o usuário seja aluno
  if (
    to.matched.some((record) => record.meta.requiresTeacher === false) &&
    authStore.isTeacher
  ) {
    // Se a rota requer aluno mas o usuário é professor, redireciona para a página de cursos do professor
    return next({ name: 'TeacherCourses' })
  }

  next()
})

export default router
