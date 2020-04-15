<template>
    <div>
        <ul>
            <li>
                <router-link to="/Test">Test</router-link>
            </li>
            <li>
                <router-link to="/HelloWorld">HelloWorld</router-link>
            </li>
            <li>
                <router-link to="/Destiny">Destiny</router-link>
            </li>
        </ul>
        <div id="btn-1">
            <el-button type="primary" v-on:click="counter += 1">按 {{counter}} 次</el-button>
            <el-button type="primary" v-on:click="counter2fun()">按 {{counter2}} 次</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Test',
        data() {
            return {
                counter: 0,
                counter2: 1
            }
        },
        methods: {
            counter2fun: function () {
                if (this.counter2 === 1) {
                    this.counter2 = 2;
                } else {
                    this.counter2 = 1;
                }
            }
        }
    }
</script>
<style scoped>
    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    router-link {
        color: #42b983;
    }
</style>