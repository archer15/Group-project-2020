const path = require('path');

module.exports = {
  lintOnSave: 'warning',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000'
      }
    }
  },
  transpileDependencies: [
    'vuetify',
  ],
};