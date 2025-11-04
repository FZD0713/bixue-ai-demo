// main.js
import { createApp } from 'vue'
import App from './App.vue'

// 确保没有全局样式导入冲突
const app = createApp(App)
app.mount('#app')