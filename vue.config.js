module.exports = {

    /** 区分打包环境与开发环境
     process.env.NODE_ENV==='production'  (打包环境)
     process.env.NODE_ENV==='development' (开发环境)*/
    publicPath: process.env.NODE_ENV === 'production' ? "/" : '/',

    // 输出文件目录
    outputDir: 'dist',

    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: 'assets',

    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    indexPath: 'index.html',

    // 默认在生成的静态资源文件名中包含hash以控制缓存
    filenameHashing: true,

    // eslint-loader 是否在保存的时候检查，在生产构建时禁用 eslint-loader
    lintOnSave: process.env.NODE_ENV !== 'production',

    // 生产环境是否生成 sourceMap 文件，false将提高构建速度 */
    productionSourceMap: false,

    // css相关配置
    css: {
        // 当为true时，css文件名可省略 module 默认为 false
        requireModuleExtension: true,

        // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
        // 默认生产环境下是 true，开发环境下是 false
        extract: false,

        // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
        sourceMap: false,

        //向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
        loaderOptions: {css: {}, less: {}}
    },

    // 是否为 Babel 或 TypeScript 使用 thread-loader
    parallel: require('os').cpus().length > 1,

    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {
    },
    configureWebpack: () => {
    },

    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},

    // webpack-dev-server 相关配置
    devServer: {
        // 启动项目后自动开启浏览器
        open: true,

        // 设置为0.0.0.0则所有的地址均能访问
        host: '0.0.0.0',

        // 端口号
        port: 8080,

        // 配置true是https安全通道
        https: false,

        // 启用热更新
        hotOnly: true,

        // 代理设置
        proxy: {
            '/api': {
                // 目标代理服务器地址
                target: 'http://apis.juhe.cn',
                ws: true,
                // 允许跨域
                changeOrigin: true,
                // 如果是https接口，需要配置该参数
                secure: false,
                // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替
                pathRewrite: {'^/api': ''}
            },
            '/api2': {
                // 目标代理服务器地址
                target: 'http://v.juhe.cn',
                ws: true,
                // 允许跨域
                changeOrigin: true,
                // 如果是https接口，需要配置该参数
                secure: false,
                // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替
                pathRewrite: {'^/api2': ''}
            }
        }
    },

    // 第三方插件配置
    pluginOptions: {}

}