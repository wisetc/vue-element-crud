var path = require('path');
var webpack = require('webpack');
var vueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  // entry: './example/info - 01/main.js',
  entry: './example/info inline - 02/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js',
  },
  mode: 'development',
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
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
  },
  performance: {
    hints: false,
  },
  optimization: {
    minimize: true,
  },
  devtool: '#eval-source-map',
  plugins: [new vueLoaderPlugin()],
};

if (process.env.NODE_ENV === 'production') {
  module.exports.entry = './src/index.js';
  module.exports.output = {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'crud.common.js',
    library: 'CRUD',
    libraryTarget: 'umd',
  };
  module.exports.mode = 'production';
  module.exports.externals = ['element-ui'];
  module.exports.devtool = false;
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
}
