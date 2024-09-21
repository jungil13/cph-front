import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/global.css';


const app = createApp(App);

// Create a Pinia instance
const pinia = createPinia();

// Use the Pinia instance with the app
app.use(pinia);
app.use(router);

// Mount the app
app.mount('#app');
