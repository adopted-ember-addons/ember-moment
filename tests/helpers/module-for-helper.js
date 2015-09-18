import Ember from 'ember';
import moment from 'moment';
import { moduleFor } from 'ember-qunit';

export default function(name, { needs } = {}) {
  moduleFor(`helper:${name}`, {
    needs,

    setup() {
      this.registry =  this.registry || this.container;
      this.container = this.container || this.registry;

      this.registry.register('view:basic', Ember.View);

      this.createView = (opts) => {
        return this.container.lookupFactory('view:basic').create(opts);
      };

      moment.locale('en');
    }
  });
}
