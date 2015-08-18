'use strict';

var path = require('path');
var stew = require('broccoli-stew');
var VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: 'ember-moment',

  included: function() {
    this._super.included.apply(this, arguments);

    var checker = new VersionChecker(this);
    var dep = checker.for('ember', 'bower');

    this.isModern = dep.gt('2.0.0') || dep.satisfies('>= 1.13.0-0');
  },

  treeForApp: function(tree) {
    if (this.isModern) {
      [
        'initializers/legacy-register.js',
        'helpers/*.js'
      ].forEach(function(file) {
        tree = stew.rm(tree, file);
      });

      tree = stew.mv(tree, 'modern/', '/');
    } else {
      tree = stew.rm(tree, 'modern');
    }

    return tree;
  },

  treeForAddon: function(tree) {
    if (this.isModern) {
      [
        'utils/compute-fn.js',
        'helpers/*.js',
        'helpers/deprecated/*.js'
      ].forEach(function(file) {
        tree = stew.rm(tree, file);
      });

      [
        ['modern/', '/']
      ].forEach(function(files) {
        tree = stew.mv(tree, files[0], files[1]);
      });
    } else {
      tree = stew.rm(tree, 'modern');
    }

    return this._super.treeForAddon.call(this, tree);
  }
};
