import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// import MukUI from '@/components/index.js';
import MukUI from 'vue3-j-scroll';

createApp(App).use(MukUI).mount('#app')
