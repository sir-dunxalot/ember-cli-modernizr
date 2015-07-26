/* Should not return true for any of the following */

(function() {

  define('cssresize/app/battery/textshadow', ['exports', 'ember', 'csstransitions'], function (exports, Ember, csstransitions) {
    exports['default'] = Ember.View.extend({
      classNameBindings: [
        'audio',
        'csstransitions',
        'mod-csstransitions',
      ],

      something: 'no-csstransitions',
    });
  });

});
