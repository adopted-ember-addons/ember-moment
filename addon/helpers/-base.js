import Ember from 'ember';

export default Ember.Helper.extend({
  moment: Ember.inject.service(),

  init() {
    this._super(...arguments);
    let service = this.get('moment');
    service.addObserver('locale', this, this.recompute);
  },

  destroy() {
    let service = this.get('moment');
    service.removeObserver('locale', this, this.recompute);
    this._super(...arguments);
  }
});
