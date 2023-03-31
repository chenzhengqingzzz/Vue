const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  lintOnSave:false /*关闭语法检查*/,

  // 开启代理服务器
  devServer: {
    // 告诉代理服务器请求转发的服务器
    proxy: 'http://localhost:3000'
  }
})