import axios from 'axios';

const instance = axios.create({
    //请求地址(根)
    baseURL:'https://api.jqrjq.cn/',
    timeout: 6000
});

//拦截器

instance.interceptors.request.use((config) => {
    return config;
},(err) => {
    return Promise.reject(err);
});

instance.interceptors.response.use((res) => {
    //直接获取响应数据
    return res.data;
},(err) => {
    return Promise.reject(err.response.data);
})

export default instance;

//test-git