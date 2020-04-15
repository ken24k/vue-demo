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
        background-image: url("./assets/form-bg-2.gif");
        background-size: cover;
        background-position: center;
        z-index: -1;
    }

</style>
