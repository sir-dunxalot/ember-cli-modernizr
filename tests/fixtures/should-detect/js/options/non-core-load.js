(function() {

  Modernizr.load({
    test: Modernizr.cors && Modernizr.cssvhunit,
    yep: 'cors.js',
    nope: 'cors-polyfill.js'
  });

});
