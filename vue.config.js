const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  // 打包时不需要打包map文件
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  //代理跨域
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        // pathRewrite: { "^/api": "" },
      },
    },
  },
});
