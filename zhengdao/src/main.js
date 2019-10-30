import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import md5 from 'js-md5';
import Vuex from 'vuex';
// import { getToken } from './utils/auth';
Vue.use(Element, { size: 'small', zIndex: 3000 });
Vue.use(Vuex);

Vue.prototype.$axios = axios.create({
  baseURL: 'https://test.api.zhengdaoyixing.com'
});

Vue.prototype.$md5 = md5;

Vue.config.productionTip = false

//req拦截器
Vue.prototype.$axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (localStorage.token) {
    config.headers['AUTH-TOKEN'] = localStorage.token
  }
  return config;
}, function (err) {
  // Do something with request error
  return Promise.reject(err);
});



//res拦截器
Vue.prototype.$axios.interceptors.response.use(res => {
  return res
}, err => {
  Vue.prototype.$message.error(err.response.data.msg)
  if (err.response.status === 401) {
    store.dispatch('Logout').then(() => {
      router.push('/login')
    })
  }
  return Promise.reject(err)
})






new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')
