const webpack = require('webpack')
const merge = require('webpack-merge')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const baseWebpackConfig = require('./base.conf')
// 抽离css文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      { 
        test: /\.css$/, 
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!postcss-loader'
        })
      },
    ]
  },  
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath('css/[name].css').replace('css/js', 'css');
      },
      allChunks: true
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
})