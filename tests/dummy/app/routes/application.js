import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Route.extend({
  moment: service(),

  beforeModel() {
    get(this, 'moment').changeLocale('en');
  }
});
