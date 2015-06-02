/* Should return:

Modernizr.test API
Modernizr.geolocation
Modernizr.csstransitions
*/

(function() {

  Modernizr.load({
    test: Modernizr.geolocation,
    yep: 'geo.js',
    nope: 'geo-polyfill.js'
  }, {
    test: Modernizr.csstransitions,
    nope: 'transitions-polyfill.js'
  });

});
