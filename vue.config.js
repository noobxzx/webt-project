const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          VUE_APP_RAPIDAPI_KEY: JSON.stringify(process.env.VUE_APP_RAPIDAPI_KEY),
        },
      }),
    ],
  },
})
