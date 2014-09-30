import {
  ago
} from 'ember-moment/helpers/ago';

module('AgoHelper');

var FAKE_HANDLEBARS_CONTEXT = {};

test('one arg (date)', function() {
  equal(ago(new Date(0), FAKE_HANDLEBARS_CONTEXT), "45 years ago");
  equal(ago(new Date(),  FAKE_HANDLEBARS_CONTEXT), 'a few seconds ago');
});

test('two args (date, inputFormat)', function() {
  equal(ago(new Date(0),  'LLLL', FAKE_HANDLEBARS_CONTEXT), '45 years ago');
  equal(ago(new Date(),   'LLLL', FAKE_HANDLEBARS_CONTEXT), 'a few seconds ago');
});

