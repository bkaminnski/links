module.exports = {
  entry: './src/app.js',
  output: {
    path: '../Links/src/main/webapp/app/',
    filename: 'app.js',
    publicPath: 'app'
  },
  devServer: {
    contentBase: '../Links/src/main/webapp',
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};