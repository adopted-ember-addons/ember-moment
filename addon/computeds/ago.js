import Ember from 'ember';
import momentFromNow from './from-now';

Ember.deprecate('ember-moment: `ember-moment/computeds/ago` is deprecated in favor of `ember-moment/computeds/from-now`');

export default momentFromNow;
