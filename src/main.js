import { createApp } from 'vue';
import App from './App.vue';
import vue3_accessible_accordions from './index';

const app = createApp(App);

app.use(vue3_accessible_accordions);

app.mount('#app');
