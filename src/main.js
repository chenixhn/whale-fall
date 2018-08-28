// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Element from 'element-ui';
import VueParticles from 'vue-particles';
import 'swiper/dist/css/swiper.css';
import '@/assets/font_icon/iconfont.css';
import '@/styles/element_variables.scss';
import '@/styles/index.scss';
import 'babel-polyfill';
import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import './assets/font_icon/iconfont';

import App from './App';
import router from './router';
import store from './store';
import http from './utils/request';

Vue.use(VueAwesomeSwiper, /* { default global options } */);

Vue.use(VueParticles);

Vue.config.productionTip = false;
Vue.prototype.$http = http;

Vue.use(Element, {
    size: 'medium' // set element-ui default size
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
});

