<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {}
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    body {
        background: url("assets/img/form-bg-2.gif") no-repeat center;
        background-size: cover;
        font-weight: 300;
        z-index: -1;
    }

</style>
