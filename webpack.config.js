var path = require('path')
var webpack = require('webpack')
var vueLoaderPlugin = require('vue-loader/lib/plugin')
var I18nPlugin = require('i18n-webpack-plugin')
var CopyPlugin = require('copy-webpack-plugin')

var languages = {
  en: null,
  zh_hans: require('./i18n/zh_hans.json'),
}

module.exports = Object.keys(languages).map(function(language) {
  return {
    name: language,
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/dist/',
      filename:
        language === 'en' ? 'crud.common.js' : language + '.crud.common.js',
      library: 'CRUD',
      libraryTarget: 'umd',
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
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            appendTsSuffixTo: ['\\.vue$'],
            // https://github.com/TypeStrong/ts-loader#happypackmode-boolean-defaultfalse
            happyPackMode: false,
          },
        },
        {
          test: /\.tsx$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            appendTsxSuffixTo: ['\\.vue$'],
          },
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
      contentBase: path.join(__dirname, 'dist'),
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
    plugins: [new I18nPlugin(languages[language]), new vueLoaderPlugin()],
  }
})

if (process.env.NODE_ENV === 'production') {
  module.exports.forEach(mo => {
    mo.mode = 'production'
    mo.externals = ['element-ui']
    mo.devtool = false
    // http://vue-loader.vuejs.org/en/workflow/production.html
    mo.plugins = (mo.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        },
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      }),
      new CopyPlugin([
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
        },
      ]),
    ])
  })
}
