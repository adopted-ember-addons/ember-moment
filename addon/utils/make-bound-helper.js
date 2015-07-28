import Ember from 'ember';

export default function(helper) {
  if (Ember.Helper && Ember.Helper.detect(helper)) {
    return helper;
  }

  return Ember.HTMLBars.makeBoundHelper(helper);
}
