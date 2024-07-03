// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'

import { useUserStore } from '@/store/user'

const app = createApp(App)
app.use(createPinia())

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

const userStore = useUserStore()
const {verifyAuth} = userStore;
await verifyAuth();



app.use(router)
app.use(ElementPlus)

app.mount('#app')
