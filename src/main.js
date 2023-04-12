require('./bootstrap.js');
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import HighchartsVue from 'highcharts-vue'
import axios from 'axios'

import './../public/dist/css/tabler.min.css?1674944402';
import './../public/dist/css/tabler-flags.min.css?1674944402';
import './../public/dist/css/tabler-payments.min.css?1674944402';
import './../public/dist/css/tabler-vendors.min.css?1674944402';
import './../public/dist/css/demo.min.css?1674944402';

import './../public/dist/js/demo-theme.js';
import './../public/dist/libs/apexcharts/dist/apexcharts.min.js?1674944402';
import './../public/dist/libs/jsvectormap/dist/js/jsvectormap.min.js?1674944402';
import './../public/dist/libs/jsvectormap/dist/maps/world.js?1674944402';
import './../public/dist/libs/jsvectormap/dist/maps/world-merc.js?1674944402';
import './../public/dist/js/tabler.min.js?1674944402';
import './../public/dist/js/demo.min.js?1674944402';

import SimpleVueValidation from 'simple-vue-validator';

const app = createApp(App)
app.use(router)
app.use(HighchartsVue)
app.use(SimpleVueValidation);

app.mount('#app')



window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
window.axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

let token = localStorage.accessToken;
if (token) {
    window.axios.defaults.headers.common["Authorization"] = localStorage.accessToken;
} 

