const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./base.conf')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 告诉服务器从哪个目录中提供内容,只有在你想要提供静态文件时才需要.
    publicPath: '/',
    port: 8088,
    hot: true, //开启热替换
    open: true,
    compress: true, // 一起服务都启用gzip压缩
    historyApiFallback: true
  },
  module: {
    // 根据正则表达式，来确定应该查找哪些文件，并将其提供给制定的loader
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      { 
        test: /\.css$/, 
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ] 
      },
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new VueLoaderPlugin()
  ]
})