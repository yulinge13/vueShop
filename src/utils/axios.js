import axios from 'axios'
import {
    message
} from 'antd';
import qs from 'qs'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
var instance = axios.create({
    baseURL: 'http://localhost:7001/',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: localStorage.getItem('token') || ''
    },
    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    transformRequest: [function (data) {
        // 对 data 进行任意转换处理

        return data;
    }],

    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
        // 对 data 进行任意转换处理

        return data;
    }],
});
export const httpGet = (parmas) => {
    const {
        url,
        data
    } = parmas
    return new Promise((reslove, reject) => {
        instance.get(url, {
                params: {
                    ...data
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    let data = JSON.parse(res.data)
                    if (data.success) {
                        reslove(data)
                    } else {
                        reslove(data)
                        message.error(data.msg)
                    }
                } else {
                    message.error(res.statusText)
                }
            })
            .catch(error => {
                reject(error);
            });
    })
}

export const httpPost = (parmas) => {
    const {
        url,
        data
    } = parmas
    return new Promise((reslove, reject) => {
        instance.post(
                url, qs.stringify(data)
            )
            .then((res) => {
                if (res.status === 200) {
                    let data = JSON.parse(res.data)
                    if (data.success) {
                        reslove(data)
                    } else {
                        reslove(data)
                        message.error(data.msg)
                    }
                } else {
                    message.error(res.statusText)
                }
            })
            .catch((error) => {
                reject(error);
                message.error(error)
            });
    })
}