import Ember from "ember";
import date from './date';
import {
  ago
} from 'ember-moment/helpers/ago';

module('AgoHelper');

var FAKE_HANDLEBARS_CONTEXT = {};

if (Ember.HTMLBars) {
  test('one arg (date)', function() {
    equal(ago([date(0)], FAKE_HANDLEBARS_CONTEXT), "45 years ago");
    equal(ago([date()],  FAKE_HANDLEBARS_CONTEXT), 'a few seconds ago');
  });

  test('two args (date, inputFormat)', function() {
    equal(ago([date(0),  'LLLL'], FAKE_HANDLEBARS_CONTEXT), '45 years ago');
    equal(ago([date(),   'LLLL'], FAKE_HANDLEBARS_CONTEXT), 'a few seconds ago');
  });
} else {
  test('one arg (date)', function() {
    equal(ago(date(0), FAKE_HANDLEBARS_CONTEXT), "45 years ago");
    equal(ago(date(),  FAKE_HANDLEBARS_CONTEXT), 'a few seconds ago');
  });

  test('two args (date, inputFormat)', function() {
    equal(ago(date(0),  'LLLL', FAKE_HANDLEBARS_CONTEXT), '45 years ago');
    equal(ago(date(),   'LLLL', FAKE_HANDLEBARS_CONTEXT), 'a few seconds ago');
  });
}
