import Vue from "vue";
import VueRouter from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Home from "../components/Home.vue";
import Destiny from "../components/Destiny.vue";

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
    }
]

var router = new VueRouter({
    routes
})

export default router;