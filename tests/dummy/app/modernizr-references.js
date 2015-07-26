/* Should return true for the following

textshadow
boxsizing
history
hsla
opacity
canvastext
*/

import Ember from 'ember';

export default {
  mediaqueries: Modernizr['textshadow'],
  somethingElse: Modernizr.opacity,

  video: function() {
    return Modernizr.hsla;
  },

  csstransitions: Modernizr.boxsizing,
  someProp: Modernizr.opacity,

  canDoHistory: Ember.observer('rgba', function() {
    return Modernizr['history'] && this.get('rgba');
  }),

  someEvent: function() {
    this.set('someProp', Modernizr.canvastext);
  }.on('willinsertElement'),

};
