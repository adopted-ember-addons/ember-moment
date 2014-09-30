import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return {
      now: new Date(),
      lastHour: new Date(new Date().valueOf() - (60*60*1000))
    };
  }
});
