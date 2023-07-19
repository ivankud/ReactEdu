module.exports = {
  renderer: {
    entry: './src/renderer/javascripts/index.js',
    module:{
      rules:[
        {
          exclude: '/node_modules/',
          use:{
            loader: 'babel-loader',
            query: {
              presets: ['@babel/react','@babel/preset-env']
            }
          }
        }
      ]
    },
  },
  preload: {
    entry: './src/preload/index.js'
  },
  main: {
    entry: './src/main/index.js'
  }
}
