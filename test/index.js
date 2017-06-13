'use strict'
// **Github:** https://github.com/toajs/toa-i18n
//
// **License:** MIT

const request = require('supertest')
const Toa = require('toa')
const toaI18n = require('../')
const tman = require('tman')
const assert = require('assert')

tman.suite('toa-i18n', function () {
  tman.it('should work', function () {
    const app = new Toa()
    toaI18n(app, {
      cookie: 'lang',
      defaultLocale: 'zh',
      locales: ['zh', 'en']
    })

    app.use(function () {
      for (let key of ['__', '__n', 'getLocale', 'setLocale', 'getCatalog']) {
        assert.ok(this[key] instanceof Function)
      }
      assert.strictEqual(this.getLocale(), 'zh')
      assert.strictEqual(this.locale, 'zh')
      this.body = 'ok'
    })

    return request(app.listen()).get('/').expect(200)
  })
})
