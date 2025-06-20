import { createApp } from 'vue';
import 'normalize.css';
import './assets/css/index.less';
import pinia from './store/index';

import App from './App.vue';
import router from './router';
import './service/modules/home';

const app = createApp(App);

app.use(pinia);
app.use(router);
//也可以写成链式调用的形式哦

app.mount('#app');
