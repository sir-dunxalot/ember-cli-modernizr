import Ember from 'ember';

export default Ember.Component.extend({

  propertyValueAsAString: Ember.computed('property', function() {
    const ModernizrReference = window.Modernizr;
    const property = this.get('property');

    if (!ModernizrReference) {
      return 'ERROR: Modernizr has not been loaded';
    } else {
      const value = Modernizr[property];
      if (value) {
        return value.toString();
      } else {
        return `No value for ${property}`;
      }
    }
  }),

});
