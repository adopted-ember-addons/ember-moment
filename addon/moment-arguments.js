import Ember from 'ember';

var defaults = {
  outputFormat: 'LLLL'
};

function MomentArguments (options) {
  Ember.$.extend(this, defaults, options || {});

  if (Object && Object.freeze) {
    Object.freeze(this);
  }
}

export default MomentArguments;
