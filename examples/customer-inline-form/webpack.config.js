var path = require('path')
var webpack = require('webpack')
var vueLoaderPlugin = require('vue-loader/lib/plugin')
var I18nPlugin = require('i18n-webpack-plugin')
var CopyPlugin = require('copy-webpack-plugin')

const outputDir = path.join(__dirname, 'dist')

var languages = {
  en: null,
  zh_hans: require('./i18n/zh_hans.json'),
}

module.exports = Object.keys(languages).map(function(language) {
  return {
    name: language,
    mode: 'development',
    entry: path.resolve(__dirname, 'main.js'),
    output: {
      path: outputDir,
      filename: language === 'en' ? 'build.js' : language + '.build.js',
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              whitespace: 'condense',
            },
          },
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpg|gif|svg|ttf|woff)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]',
          },
        },
      ],
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },
    devServer: {
      serveIndex: true,
      contentBase: outputDir,
      compress: true,
      port: 8080,
    },
    performance: {
      hints: false,
    },
    optimization: {
      minimize: true,
    },
    devtool: '#eval-source-map',
    plugins: [
      new I18nPlugin(languages[language]),
      new vueLoaderPlugin(),
      new CopyPlugin([
        {
          from: path.resolve(__dirname, 'public'),
          to: outputDir,
        },
      ]),
    ],
  }
})

if (process.env.NODE_ENV === 'production') {
  module.exports.forEach(mo => {
    mo.mode = 'production'
    mo.devtool = false
    // http://vue-loader.vuejs.org/en/workflow/production.html
    mo.plugins = (mo.plugins || []).concat([
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      }),
    ])
  })
}
