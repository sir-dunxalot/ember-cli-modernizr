(function() {

  Modernizr.testStyles('#modernizr { width: 9px; color: papayawhip; }', function(elem, rule){
    return true;
  }, 2, ["video", "image"]);

});
