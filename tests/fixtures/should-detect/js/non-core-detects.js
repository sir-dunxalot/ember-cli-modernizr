/* Should return true for the following

pointerevents
emoji
battery
cssmask
boxsizing
inputtypes
*/

(function() {

  define('cssresize/app/regions/textshadow', ['exports', 'ember', 'csstransitions'], function (exports, Ember, csstransitions) {

    var something = {
      mediaqueries: Modernizr.pointerevents,
      somethingElse: Modernizr.emoji
    };

    exports['default'] = Ember.View.extend({
      csstransitions: Modernizr['batteryapi'],
      someProp: Modernizr.cssmask,

      canDoHistory: Ember.observer('lastchild', function() {
        return Modernizr.boxsizing && this.get('lastchild');
      }),

      someEvent: function() {
        this.set('someProp', Modernizr.inputtypes.time);
      }.on('willinsertElement'),
    });
  });

});
