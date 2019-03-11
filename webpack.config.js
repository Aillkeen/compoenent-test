var path = require('path');
module.exports = () =>  {
  return {
    entry: {
      index: './src/index.js'
    },
    output: {
      path: path.join(__dirname, 'distribution'),
      filename: '[name].js',
      publicPath: '/distribution/',
      library: 'helena',
      libraryTarget: 'umd',
    },
    externals: {
      react: {
        root: 'React',
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
      },
    },
    module: {
      loaders: [
        {
          test: /\.js$|\.jsx$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            plugins: ['transform-decorators-legacy'],
            presets: ['env', 'es2015', 'stage-0', 'react']},
        },
      ],
    },
  }
};
