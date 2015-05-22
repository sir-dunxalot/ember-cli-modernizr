/* Should return true for the following

textshadow
boxsizing
history
hsla
opacity
canvastext
*/

(function() {

  var something = {
    mediaqueries: Modernizr.textshadow,
    somethingElse: Modernizr.opacity,

    video: function() {
      return Modernizr.hsla;
    }
  };


  define('cssresize/app/battery/textshadow', ['exports', 'ember', 'csstransitions'], function (exports, Ember, csstransitions) {
    exports['default'] = Ember.View.extend({
      csstransitions: Modernizr.boxsizing,
      someProp: Modernizr.opacity,

      canDoHistory: Ember.observer('rgba', function() {
        return Modernizr.history && this.get('rgba');
      }),

      someEvent: function() {
        this.set('someProp', Modernizr.canvastext);
      }.on('willinsertElement'),
    });
  });

});
