'use strict';

var path = require('path');
var stew = require('broccoli-stew');
var VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: 'ember-moment',

  included: function() {
    this._super.included.apply(this, arguments);
  },

  treeForApp: function(tree) {
    var checker = new VersionChecker(this);
    var dep = checker.for('ember', 'bower');

    if (dep.satisfies('>= 1.13.0')) {
      tree = stew.rm(tree, 'initializers/legacy-register.js');
    }

    return tree;
  }
};
