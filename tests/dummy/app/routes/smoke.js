import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
  setupController: function (controller, model) {
    moment.locale('en');
    return this._super(controller, model);
  }
});
