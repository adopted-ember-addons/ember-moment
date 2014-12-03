import date from './date';
import ago from 'ember-moment/helpers/ago';
import callHelper from '../../helpers/call-helper';

module('AgoHelper');

var FAKE_HANDLEBARS_CONTEXT = {};

test('one arg (date)', function() {
  equal(callHelper(ago, [date(0), FAKE_HANDLEBARS_CONTEXT]), "45 years ago");
  equal(callHelper(ago, [date(),  FAKE_HANDLEBARS_CONTEXT]), 'a few seconds ago');
});

test('two args (date, inputFormat)', function() {
  equal(callHelper(ago, [date(0),  'LLLL', FAKE_HANDLEBARS_CONTEXT]), '45 years ago');
  equal(callHelper(ago, [date(),   'LLLL', FAKE_HANDLEBARS_CONTEXT]), 'a few seconds ago');
});
