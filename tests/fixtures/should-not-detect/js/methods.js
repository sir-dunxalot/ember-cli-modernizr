/* Should not return true for any of the following */

(function() {

  define('Modernizr/history/views/microdata', ['exports', 'ember', 'csstransitions'], function (exports, Ember, csstransitions) {
    exports['default'] = Ember.View.extend({

      indexeddb: function() {
        this.rgba();
        this.csstransitions();
      },

      history: function() {
        this.cssanimations();
      }
    });
  });

});
