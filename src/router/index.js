import Vue from "vue";
import VueRouter from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Home from "../components/Home.vue";
import Destiny from "../components/Destiny.vue";
import AccountBook from "../components/AccountBook.vue";
import NewsAndWeather from "../components/NewsAndWeather.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/Home'
    },
    {
        path: "/Home",
        component: Home
    },
    {
        path: "/HelloWorld",
        component: HelloWorld
    },
    {
        path: "/Destiny",
        component: Destiny
    },
    {
        path: "/AccountBook",
        component: AccountBook
    },
    {
        path: "/NewsAndWeather",
        component: NewsAndWeather
    }
]

var router = new VueRouter({
    routes
})

export default router;