const path = require('path')
const webpack = require('webpack')
// 模块分析工具
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清理插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 生成模块-bundle之间映射文件
const ManifestPlugin = require('webpack-manifest-plugin');
// PWA 插件
const WorkboxPlugin = require('workbox-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    app: './src/vue-main.js',
    vendor: [
      'lodash'
    ]
  },
  output: {
    filename: '[name].[hash].js', // [hash]
    publicPath: '/',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    // 根据正则表达式，来确定应该查找哪些文件，并将其提供给制定的loader
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: 'babel-loader?cacheDirectory=true',
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      title: '管理输出'
    }),
    new VueLoaderPlugin(),
    // new WorkboxPlugin.GenerateSW({
    //     // 这些选项帮助 ServiceWorkers 快速启用
    //    // 不允许遗留任何“旧的” ServiceWorkers
    //   clientsClaim: true,
    //   skipWaiting: true
    // })
    // new BundleAnalyzerPlugin()
  ],
  // splitChunks 打包优化
  // optimization: {
  //   splitChunks: {
  //     chunks: 'initial',
  //     minSize: 30000,
  //     maxSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 5,
  //     maxInitialRequests: 3,
  //     name: true,
  //     cacheGroups: {
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true
  //       }
  //     }
  //   }
  // }
}