module.exports = {
  'transpileDependencies': [
    'vuetify'
  ],
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config
        .output
        .filename('[name].[hash].js')
        .end()
    }
  }
}
