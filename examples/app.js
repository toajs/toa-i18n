'use strict'
// **Github:** https://github.com/toajs/toa-i18n
//
// **License:** MIT

var toa = require('toa')
var toaI18n = require('../index')

var app = toa(function () {
  this.body = this.__('Hello')
})

toaI18n(app, {
  cookie: 'lang',
  locales: ['zh', 'en'],
  directory: './examples/locales'
})

app.listen(3000)
