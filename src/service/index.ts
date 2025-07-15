import AppRequest from './request';
import { BASE_URL, TIME_OUT } from './config';

// 这里可以根据不同的配置创建很多个实例哦-----
// const appRequest = new AppRequest({
//     baseURL: BASE_URL,
//     timeout: TIME_OUT,
//     interceptors: {
//         requestSuccessFn: (config) => {
//             console.log('requestSuccessFn---精细化-');
//             return config;
//         },
//         requestFailureFn: (err) => {
//             console.log('requestFailureFn---精细化-');
//         },
//         responseSuccessFn: (res) => {
//             console.log('responseSuccessFn---精细化-');
//             return res;
//         },
//         responseFailureFn: (err) => {
//             console.log('responseFailureFn-----精细化');
//         }
//     }
// });
const lxRequest = new AppRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptors: {
        requestSuccessFn: (config) => {
            const token = localStorage.getItem('token');
            if (config.headers && token) {
                // 每一个请求都自动携带token Bearer后面有一个空格
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }
    }
});

export default lxRequest;
