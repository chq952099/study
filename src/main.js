import { createApp } from 'vue'
import css from '../src/assets/css/reset.css'
import App from './App.vue'
import router from '../src/router'
import store from './store'
createApp(App).use(router).use(store).use(css).mount('#app')
