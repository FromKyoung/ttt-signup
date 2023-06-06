import { createApp } from 'vue'
import App from './App.vue'
import router from './router' //익스포트한  라우터 모듈 가져오기

createApp(App)
  .use(router)
  .mount('#app')
