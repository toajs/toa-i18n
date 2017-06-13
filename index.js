'use strict'
// **Github:** https://github.com/toajs/toa-i18n
//
// **License:** MIT

const i18n = require('i18n')

/**
 * Wrap with https://github.com/mashpie/i18n-node
 */

module.exports = function toaI18n (app, options) {
  if (!options || !Array.isArray(options.locales)) throw new Error('options.locales is required')

  const cookiename = typeof options.cookie === 'string' ? options.cookie : null
  const defaultLocale = typeof options.defaultLocale === 'string' ? options.defaultLocale : 'en'
  const locales = {}
  options.defaultLocale = defaultLocale
  i18n.configure(options)

  for (let locale of options.locales) locales[locale] = true
  for (let method of ['__', '__n', 'getLocale', 'setLocale', 'getCatalog']) {
    app.context[method] = function () {
      return i18n[method].apply(this, arguments)
    }
  }

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
    let languageHeader = ctx.headers['accept-language']
    let languages = []
    let regions = []
    let region = ''

    if (languageHeader) {
      for (let l of languageHeader.split(',')) {
        let header = l.split(';', 1)[0]
        let lr = header.split('-', 2)
        if (lr[0]) languages.push(lr[0].toLowerCase())
        if (lr[1]) regions.push(lr[1].toLowerCase())
      }

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
