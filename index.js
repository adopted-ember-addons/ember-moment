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

    this.isModern = dep.gt('1.13.0');
  },

  treeForApp: function(tree) {
    if (this.isModern) {
      [
        'initializers/legacy-register.js',
        'helpers/moment-from-now.js',
        'helpers/moment-to-now.js',
        'helpers/moment-duration.js',
        'helpers/moment-format.js'
      ].forEach(function(file) {
        tree = stew.rm(tree, file);
      });

      tree = stew.mv(tree, 'modern/helpers/', 'helpers/');
    }

    return tree;
  },

  treeForAddon: function() {
    var tree = this._super.treeForAddon.apply(this, arguments);
    var root = path.join('modules', 'ember-moment');

    if (this.isModern) {
      [
        'utils/compute-fn.js',
        'helpers/moment-to-now.js',
        'helpers/moment-from-now.js',
        'helpers/moment-duration.js',
        'helpers/moment-format.js'
      ].forEach(function(file) {
        tree = stew.rm(tree, path.join(root, file));
      });

      [
        ['modern/utils/compute-fn.js', 'utils/compute-fn.js'],
        ['modern/helpers/*.js', 'helpers/']
      ].forEach(function(files) {
        tree = stew.mv(tree, path.join(root, files[0]), path.join(root, files[1]));
      });
    } else {
      tree = stew.rm(tree, path.join(root, 'modern'));
    }

    return tree;
  }
};
