import Vue from "vue";
import VueRouter from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Test from "../components/Test.vue";
import Destiny from "../components/Destiny.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/Test'
    },
    {
        path: "/Test",
        component: Test
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