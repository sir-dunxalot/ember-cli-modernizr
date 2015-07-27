(function() {

  var someThing = {
    getPrefix: function() {
      return 'prop:value; ' + Modernizr._domPrefixes.join('Prop' + ':value; ') + ':value';
    }
  };

})();
