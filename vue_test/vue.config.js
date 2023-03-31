const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  lintOnSave:false /*关闭语法检查*/,

  // 开启代理服务器（方式一）
  // devServer: {
  //   // 告诉代理服务器请求转发的服务器
  //   proxy: 'http://localhost:3000'
  // },
  devServer: {
    proxy: {
      // 请求前缀 代理服务器会检查请求有没有这个前缀，控制是否需要全部走代理
      '/api': { // 匹配所有以 '/api'开头的请求路径
        target: 'http://localhost:3000',// 代理目标的基础路径

        // 匹配所有以/api开头的路径，都变成空字符串
        // 避免代理服务器转发给服务器的路径中带有/api从而匹配错误404
        pathRewrite: {'^/api': ''},
        ws: true, // 用于支持websocket
        // changeOrigin: true // 用于控制请求头中的host值
      },
      '/czq': { // 匹配所有以 '/czq'开头的请求路径
        target: 'http://localhost:3001',// 代理目标的基础路径
        
        // 匹配所有以/api开头的路径，都变成空字符串
        // 避免代理服务器转发给服务器的路径中带有/czq从而匹配错误404
        pathRewrite: {'^/czq': ''},
        ws: true, // 用于支持websocket
        // changeOrigin: true // 用于控制请求头中的host值
      },
    }
  }
})