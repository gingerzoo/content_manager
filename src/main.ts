import { createApp } from 'vue';
import 'normalize.css';
import './assets/css/index.less';
import pinia from './store/index';
import * as Icons from '@element-plus/icons-vue';

import App from './App.vue';
import router from './router';
import useLoginStore from './store/login/login';

const app = createApp(App);
// 批量全局注册：所有图标组件都能用字符串名字访问
for (const [name, component] of Object.entries(Icons)) {
    app.component(name, component);
}

app.use(pinia);

// 这个位置很重要
useLoginStore().loadLocaldataFromRefresh();

app.use(router);
//也可以写成链式调用的形式哦

app.mount('#app');
