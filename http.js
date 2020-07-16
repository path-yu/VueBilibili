import axios from "axios";
import router from "./src/router";
import Vue from "vue";
const http = axios.create({ // 创建一个 axios 实例
   baseURL: "http://112.74.99.5:3000/web/api",

})
// axios 请求拦截器 在 请求前拦截
http.interceptors.request.use(function (config) {
  if(localStorage.getItem('id') && localStorage.getItem('token')){
   
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
  }
  
   return config;
}, function (error) {

   return Promise.reject(error);
});

// 在请求响应前拦截
http.interceptors.response.use(function (response) {
   
   return response;
}, function (error) {
   if(error.response.status === 401 || error.response.status == 402){
      router.push("/login")
      Vue.prototype.$msg.fail(error.response.data.message)
   }
   return Promise.reject(error);
});
export default http;