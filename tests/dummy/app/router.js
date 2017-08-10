import EmberRouter from '@ember/routing/router';
import config from './config/environment';

var Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
   this.route('index', { path: '/' });
   this.route('smoke', { path: '/smoke' });
});

export default Router;
