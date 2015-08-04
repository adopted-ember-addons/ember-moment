import Ember from 'ember';

export default function(helper) {
  if (Ember.Helper) {
    if (Ember.Helper.detect(helper)) {
      return helper;
    }
    else {
      return Ember.Helper.helper(helper);
    }
  }

  return Ember.HTMLBars.makeBoundHelper(helper);
}
