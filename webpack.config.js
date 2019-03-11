var path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '/output/'),
    filename: 'output.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '/src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["env","es2015", "stage-0", "react"]
          }
        }
      }      
    ]
  },
  externals: {
    'react': 'commonjs react'
  }
};
