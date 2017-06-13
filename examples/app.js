'use strict'
// **Github:** https://github.com/toajs/toa-i18n
//
// **License:** MIT

const Toa = require('toa')
const toaI18n = require('../index')

const app = new Toa()
app.use(function () {
  this.body = this.__('Hello')
})

toaI18n(app, {
  cookie: 'lang',
  locales: ['zh', 'en'],
  directory: './examples/locales'
})

app.listen(3000)
