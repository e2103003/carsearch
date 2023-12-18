import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

import Home from '@/components/Home';
import SeeEmployees from '@/components/see/SeeEmployees';
import SeeDealerships from '@/components/see/SeeDealerships';
import SeeCars from '@/components/see/SeeCars';
import SeeMoreData from '@/components/see/SeeMoreData';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path:'/', component:Home},
        { path:'/see-employees', component:SeeEmployees},
        { path:'/see-dealerships', component:SeeDealerships},
        { path:'/see-cars', component:SeeCars},
        { path: '/see-moredata', component: SeeMoreData}
    ],
});

createApp(App).use(router, bootstrap).mount('#app')
