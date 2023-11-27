import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index";
const app = createApp(App)
app.use(router)
app.config.globalProperties.$am = 1;
app.mount('#app')
// App.use(router);
const Url = "http://localhost:3000/";
// require('../renderer/src/api/app.js')

