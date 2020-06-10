/* eslint-disable */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const config = require('./package.json')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// 项目需要用到的cdn所有的cdn如果需要使用的时候建议先通过npm下载到本地之后再放在自己的服务器上，这样做是安全性更高的
const CDNJS = [
  'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js',
  'https://unpkg.com/vuex@3.4.0/dist/vuex.js',
  'https://unpkg.com/vue-router@3.3.2/dist/vue-router.js',
  'https://cdn.jsdelivr.net/npm/vant@2.8/lib/vant.min.js',
  'https://unpkg.com/axios/dist/axios.min.js',
  'https://cdn.bootcdn.net/ajax/libs/fastclick/1.0.6/fastclick.js'
]

const CDNCSS = [
  'https://cdn.jsdelivr.net/npm/vant@2.8/lib/index.css',
  'https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.css'
]

module.exports = {
  publicPath: './',
  indexPath: path.resolve(__dirname, './dist/' + config.version + '/index.html'),
  outputDir: path.resolve(__dirname, './dist/' + config.version),
  assetsDir: 'static',
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 生产环境的时候通用的文件通过cdn的方式引入
      config.externals = {
        vue: 'Vue',
        vant: 'vant',
        axios: 'axios',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        fastclick: 'FastClick'
      }
      // cli3删除目录的是根据outputDir删除之后再更新的，但是我们的version文件每次ci或者出补丁的时候都是需要更新的，防止文件越来越来多，还是需要把dist删除一下
      config.plugins.unshift(
        new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: [
            path.resolve(__dirname, 'dist')
          ]
        })
      )
      // 为生产环境修改配置...
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              // warnings: false,
              drop_debugger: true,
              drop_console: true
            }
          },
          sourceMap: false,
          parallel: true // 加快打包速度
        })
      )
    }
  },
  chainWebpack: config => {
    // 在生产环境中，需要cdn引入的js文件列表
    if (process.env.NODE_ENV === 'production') {
      config.plugin('html')
        .tap(args => {
          args[0].cdnJS = CDNJS
          args[0].cdnCSS = CDNCSS
          return args
        })
    }
    config.plugin('version')
      .use(require.resolve('copy-webpack-plugin'), [
        [{
          toType: 'dir',
          from: './version',
          to: path.resolve(__dirname, 'dist/version')
        }]
      ])
    // 这两个插件并不会造成首页白屏时间加长的问题
    // 那什么时候需要删除这两个插件呢？
    // 当我们的应用很大的时候，或者对于大部分用户来讲只是使用到了较少的页面的时候，
    // 满足以上两点中的任意一点并且用户对流量比较在意，我们需要去除提前加载
    // // 移除 prefetch 插件
    // config.plugins.delete('prefetch')
    // // 移除 preload 插件
    // config.plugins.delete('preload')
  },
  pluginOptions: {
    // 规范css，目前还是比较宽松的
    lintStyleOnBuild: true, // 添加了插件(@ascendancyy/vue-cli-plugin-stylelint), 所以需要配置
    stylelint: {
      fix: true, // boolean (default: true)
      files: ['src/**/*.vue', 'src/assets/css/*.(l|s)?(e|c)ss'] // string | [string] (default: ['src/**/*.{vue,htm,html,css,sss,less,scss}'])
      // formatter: () => { } // function (default: require('stylelint-codeframe-formatter'))
      // etc...
    }
  },
  devServer: {
    proxy: {
      '{{projectContext}}': {
        target: '{{projectProxyUrl}}',
        changeOrigin: true
      }
    },
    open: true
  }
}
