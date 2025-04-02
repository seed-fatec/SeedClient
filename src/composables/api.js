import { apiUrl } from '~/config/env'
import { createFetch } from '@vueuse/core'
import { useAuthStore } from '~/stores/auth'

export const useApi = createFetch({
  baseUrl: apiUrl,
  options: {
    beforeFetch({ options }) {
      const authStore = useAuthStore()
      if (authStore.accessToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${authStore.accessToken}`,
        }
      }
      return { options }
    },
    onFetchError(ctx) {
      const msg = ctx.data?.message || 'A requisição falhou.'
      console.error('API Error:', msg)
      return ctx
    },
  },
  fetchOptions: {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
})
