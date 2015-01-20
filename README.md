toa-i18n
====
I18n module for toa.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Talk topic][talk-image]][talk-url]

## [toa](https://github.com/toajs/toa)

## Wrapped (i18n-node)[https://github.com/mashpie/i18n-node] v0.5.0

## Demo

```js

var toa = require('toa');
var toaI18n = require('toa-i18n');

var app = toa(function(Thunk) {
  this.body = this.__('Hello');
});

toaI18n(app, {
  cookie: 'lang',
  locales:['zh', 'en'],
  directory: './examples/locales'
});
app.listen(3000);
```

## Installation

```bash
npm install toa-i18n
```

## API

```js
var toaI18n = require('toa-i18n');
```
### toaI18n(app, options)

It will add `__`, `__n`, `getLocale`, `setLocale`, `getCatalog` method to `context`, And `locale` getter to `context`.
`options` is the same as (i18n-node)[https://github.com/mashpie/i18n-node].

## Licences
(The MIT License)

[npm-url]: https://npmjs.org/package/toa-i18n
[npm-image]: http://img.shields.io/npm/v/toa-i18n.svg

[travis-url]: https://travis-ci.org/toajs/toa-i18n
[travis-image]: http://img.shields.io/travis/toajs/toa-i18n.svg

[talk-url]: https://guest.talk.ai/rooms/a6a9331024
[talk-image]: https://img.shields.io/talk/t/a6a9331024.svg
