Ember CLI Modernizr [![Build Status](https://travis-ci.org/sir-dunxalot/ember-cli-modernizr.svg?branch=master)](https://travis-ci.org/sir-dunxalot/ember-cli-modernizr)
======

**Early stage addon - [looking for help](#todos)**

This Ember addon parses your app for Modernizr references and creates a small, custom [Modernizr 3.0](http://modernizr.com/) build.

You can learn more about Modernizr 3.0 by reading the following resources:

- [Modernizr 3 release notes](https://github.com/Modernizr/Modernizr/issues/805)
- [Modernizr 3 blog post](http://modernizr.com/news/modernizr-v3-stickers-diversity/)

## Installation

```
ember install ember-cli-modernizr
```

## Usage

Simply install the addon. It will run when you build your app in a production environment or set the `shouldParseFiles` option to `true`.

Options can be customized in your Brocfile. The **default** options are shown as examples below.

```js
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({

  modernizr: {
    fileOptions: { encoding: 'utf8' },
    outputDir: 'assets',
    outputFileName: 'ember-cli-modernizr',
    shouldParseFiles: false,

    /* If you use a class prefix (e.g. .mod-csstransitions
    instead of .csstransitions) */

    classPrefix: '',

    /* Add feature AMD paths (see lib/config-all.json)
    if you want a feature regardless of file parsing */

    'feature-detects': [],

    /* Set options for Modernizr extensions here */

    options: {
      addTest: false,
      atRule: false,
      domPrefixes: false,
      hasEvent: false,
      html5shiv: false,
      html5printshiv: false,
      load: false,
      mq: false,
      prefixed: false,
      prefixes: false,
      prefixedCSS: false,
      setClasses: true, // Adds classes to <html>
      testAllProps: false,
      testProp: false,
      testStyles: false
    },
  }

});

module.exports = app.toTree();
```

## TODOs

I would love help with the following requirements:

- Automatically add `assets/ember-cli-modernizr.js` to `assets/vendor.js` instead of creating another HTTP request
- Minify the `assets/ember-cli-modernizr.js` output
- Retrieving configAll from the Modernizr namespace instead of a copy in the addon tree
- Testing the asset path in the `contentFor` hook
- Using some install hook to create the development build instead of a static file in the `vendor` directory

## Development

If you have an issue or feature request please [open an issue](https://github.com/sir-dunxalot/ember-cli-modernizr/issues/new) or submit a PR.

The test suite can be ran as follows:

```
npm test
```
