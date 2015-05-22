(function() {

  Modernizr.testStyles('#modernizr { width: 9px; color: papayawhip; }', function(elem, rule){
    Modernizr.addTest('width', elem.offsetWidth == 9);
  }, 2, ["video", "image"]);

});
