'use strict'
// **Github:** https://github.com/toajs/toa-i18n
//
// **License:** MIT

var i18n = require('i18n')
var api = ['__', '__n', 'getLocale', 'setLocale', 'getCatalog']

/**
 * Wrap with https://github.com/mashpie/i18n-node
 */

module.exports = function toaI18n (app, options) {
  if (!options || !Array.isArray(options.locales)) throw new Error('options.locales is required')

  var cookiename = typeof options.cookie === 'string' ? options.cookie : null
  var defaultLocale = typeof options.defaultLocale === 'string' ? options.defaultLocale : 'en'
  var locales = {}
  options.defaultLocale = defaultLocale
  options.locales.forEach(function (locale) {
    locales[locale] = true
  })

  i18n.configure(options)

  api.forEach(function (method) {
    app.context[method] = function () {
      return i18n[method].apply(this, arguments)
    }
  })

  Object.defineProperty(app.context, 'locale', {
    enumerable: true,
    configurable: false,
    get: function () {
      if (this._locale) return this._locale
      return initI18n(this)
    },
    set: function (val) {
      this._locale = val + ''
    }
  })

  app.context.language = undefined

  return i18n

  function initI18n (ctx) {
    var languageHeader = ctx.headers['accept-language']
    var languages = []
    var regions = []
    var region = ''

    if (languageHeader) {
      languageHeader.split(',').forEach(function (l) {
        var header = l.split(';', 1)[0]
        var lr = header.split('-', 2)
        if (lr[0]) languages.push(lr[0].toLowerCase())
        if (lr[1]) regions.push(lr[1].toLowerCase())
      })

      if (languages.length > 0) ctx.language = languages[0] || defaultLocale
      if (regions.length > 0) region = regions[0]

      // to test if having region translation
      if (region) region = ctx.language + '-' + region
      if (locales[region]) ctx.language = region
    }

    // setting the language by cookie
    if (cookiename) region = ctx.cookies.get(cookiename)
    if (region) ctx.language = region
    return i18n.setLocale(ctx, ctx.language)
  }
}
