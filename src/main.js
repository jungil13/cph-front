import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import App from './App.vue';
import router from './router';
import './assets/global.css';
import AOS from 'aos'
import 'aos/dist/aos.css'

// Create the Vue app
const app = createApp(App);

// Create a Pinia instance
const pinia = createPinia();

// Use Toast, Pinia, and Router
app.use(Toast);
app.use(pinia);
app.use(router);
app.use(AOS)

// Mount the app
app.mount('#app');
