import http from 'axios';
// import {Message} from 'element-ui';
// // import router from '@/router/index';
// import qs from 'qs';

// // const url = location.href;
// // let loadingInstance = null;

// function regExp(params) {
//     return /form-data/.test(params);
// }

// function regApi(api) {
//     return /getStatusDic|goods\/index|order\/payway|\/checkname|\/checkName|\/songsearch|\/play|\/searchtip/.test(api.request.responseURL);
// }
// function regReq(api) {
//     return /songsearch|\/play|\/searchtip/.test(api);
// }

// const baseURL = process.env.NODE_ENV === 'development' ? '' : 'http://localhost:3000/';
// http.defaults.baseURL = baseURL;
// // http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// // http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// // 添加请求拦截器
// http.interceptors.request.use((config) => {
//     const temp = config;
//     // loadingInstance = Loading.service();
//     temp.params = temp.params || {};
//     temp.params._ = Date.now();// 防止请求缓存
//     if (!regReq(temp.url) && !regExp(temp.headers['Content-Type'])) {
//         temp.data = temp.data && qs.stringify(temp.data); // post处理
//     }

//     // 在发送请求之前做些什么
//     return temp;
// }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });

// 添加响应拦截器
http.interceptors.response.use((response) => {
    // loadingInstance.close({background: 'rgba(0,0,0,.1)'});
    const data = response.data;
    // if (response.status === 200) {
        // // if (data.status == '-1') {
        // //     router.push('/login');
        // // }
        // //此处应该为swich判断，对异常情况处理
        // if (data.status !== 0 && !regApi(response)) {
        //     switch (data.status) {
        //         case -1:
        //             Message({
        //                 showClose: true,
        //                 message: data.message,
        //                 type: 'error'
        //             });
        //             break;
        //         default:
        //             break;
            // }
            // return new Promise(() => { });
        // }
    // }
    // 对响应数据做点什么
    return data;
}, (error) => {
    return Promise.reject(error);
});
// , (value) => {
//     return Promise.resolve(value);
// }
export default http;
