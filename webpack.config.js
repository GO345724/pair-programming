const path = require('path');

module.exports = {
  devtool: 'eval',
  entry: './client/client',
  output: {
    path: path.join(__dirname, 'client', 'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets:['es2015', 'react']
        }
      },
      {
        test: /(\.css)$/, loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'
      },
      {
        test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '/index', '/index.js', '/index.jsx']
  }
}
