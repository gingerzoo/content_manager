import myRequest from '..';

interface IHomeData {
    data: any;
    returnCode: string;
    success: boolean;
}

myRequest
    .request<IHomeData>({
        url: 'home/multidata',
        interceptors: {
            requestSuccessFn: (config) => {
                console.log('requestSuccessFn---更更精细化-');
                return config;
            },
            requestFailureFn: (err) => {
                console.log('requestFailureFn---更更精细化-');
            },
            responseSuccessFn: (res) => {
                console.log('responseSuccessFn---更更精细化-');
                return res;
            },
            responseFailureFn: (err) => {
                console.log('responseFailureFn-----更更精细化');
            }
        }
    })
    .then((res) => {
        console.log('home-------------', res);
    });
