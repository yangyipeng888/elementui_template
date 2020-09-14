import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import MainView from '../views/MainView'
import Checkout from '../components/Checkout.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/mainView',
        redirect: '/checkout',
        name: 'mainView',
        component: MainView,
        children: [
            {
                path: '/checkout',
                name: 'checkout',
                component: Checkout
            },
        ]
    },

]

const router = new VueRouter({
    routes
})

export default router
