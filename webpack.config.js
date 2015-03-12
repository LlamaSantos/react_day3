'use strict';

module.exports = {
  entry: "./app/App.js",
  output: {
    filename: "public/bundle.js"
  },

  resolve: {
    alias: {
      //'firebase': 'firebase/lib/firebase-web'
    }
  },

  module: {
    loaders: [
      { test: /\.js$/, exclue: /node_modules/, loader: 'babel-loader?experimental&optional=runtime' }
    ]
  },

  externals: {
    'firebase' : 'Firebase'
  }

};
