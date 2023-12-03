import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index";
import VueLazyload from 'vue-lazyload'
const app = createApp(App)
app.use(router)
app.use(VueLazyload, {
    preLoad: 1,
    loading: '/src/assets/icon.png',
    error: 'http://img.shiyit.com/img-loading-error.png',
    attempt: 1
})
app.config.globalProperties.$am = 1;
app.mount('#app')
// App.use(router);
const Url = "http://localhost:3000/";
// require('../renderer/src/api/app.js')

