import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import '~/style.css'
import 'vue3-toastify/dist/index.css';
import App from '~/App.vue'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)

  .mount('#app')
