# Ember-cli-modernizr

This Ember addon decreases the size of your `vendor.js` file by parsing your application for Modernizr references and creating a small, custom [Modernizr](http://modernizr.com/) build.

- In development, Modernizr's default development source will be automatically added to your `vendor.js` file
- In production, when `ember build` is ran, your JS and CSS will be parsed for all Modernizr references before the smallest possible custom Modernizr production build is automatically added to your `vendor.js` file
- Full build customization where needed

## Installation

```
ember install ember-cli-modernizr
```

## Customization

* `ember server`
* Visit your app at http://localhost:4200.

## TODOS

Would love help with these:

- Automatically adding `assets/ember-cli-modernizr.js` to `assets/vendor.js`
- Minifying the Modernizr output
- Retrieving configAll from the Modernizr namespace

## Development

If you have an issue or feature request please [open an issue](https://github.com/sir-dunxalot/ember-cli-modernizr/issues/new) or submit a PR.

The test suite can be ran as follows:

- `ember test`
- `ember test --server`
