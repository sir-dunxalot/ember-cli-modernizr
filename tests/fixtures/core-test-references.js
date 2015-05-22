/*
Should return true for:

video
csstransitions
history
hashchange
postMessage

Should return false for:

audio
rgba
geolocation
cssgradients
sessionStorage
doesNotExist
*/

(function() {

  /* Application view */

  define('dummy/app/views/application', ['exports', 'ember'], function (exports, Ember) {
    exports['default'] = Ember.View.extend({
      canDoVideo: Modernizr.video,
      classNames: ['canDoVideo:audio'], // Should not be caught

      checkForSupport: function() {
        if (Modernizr.csstransitions) {
          this.coolCss3Method();
        } else {
          this.fallback();
        }
      },

      coolCss3Method: Ember.K,
      fallback: Ember.K
    });
  });

  define('dummy/app/route', ['exports', 'ember'], function (exports, Ember) {
    var Router = Ember.Route.extend({
      this.route('index');
      this.route('dashboard');
      this.route('creator');
    });

    /* Modernizr.rgba - Should not pick up */

    if (Modernizr.history && Modernizr.hashchange) {
      Router.location = 'hash';
    }

    exports['default'] = Router;
  });

  define('dummy/app/components/geolocation', ['exports', 'ember'], function (exports, Ember) {
    exports['default'] = Ember.Component.extend({
      cssgradients: true,
      classNameBindings: ['cssgradients'],
      sessionStorage: null,

      thing: Ember.observer('sessionStorage', function() {
        var canDoIt = Modernizr.postMessage;

        return canDoIt && this.get('sessionStorage');
      }),

      getResult: function() {
        return Modernizr.doesNotExist;
      }
    });
  });
  
})();
