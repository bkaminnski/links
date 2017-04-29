var path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, '../menu-and-content-be/src/main/webapp/app/'),
    filename: 'app.js',
    publicPath: 'app'
  },
  devServer: {
    contentBase: path.join(__dirname, '../menu-and-content-be/src/main/webapp'),
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