const isProd = process.env.NODE_ENV === "production";

module.exports = {
  runtimeCompiler: true,
  publicPath: isProd ? "http://static.linzhihui.online" : "/",
  assetsDir: "yxy",
  devServer: {
    //open: process.platform === 'darwin',
    //serve地址
    // host: "localhost",
    port: 8080,
    // open: true, //配置自动启动浏览器
    proxy: {
      "/pro": {
        target: "http://yxy.linzhihui.online/",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/pro": "",
        },
      },
    },
  },
};
