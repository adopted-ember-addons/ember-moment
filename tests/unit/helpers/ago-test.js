import ago from 'ember-moment/helpers/ago';
import date from './date';
import callHelper from '../../helpers/call-helper';

module('AgoHelper');

let FAKE_HANDLEBARS_CONTEXT = {};
let threeDaysAgo = new Date();
threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

test('one arg (date)', (assert) => {
  assert.equal(callHelper(ago, [threeDaysAgo, FAKE_HANDLEBARS_CONTEXT]), "3 days ago");
  assert.equal(callHelper(ago, [date(),  FAKE_HANDLEBARS_CONTEXT]), 'a few seconds ago');
});

test('two args (date, inputFormat)', (assert) => {
  assert.equal(callHelper(ago, [threeDaysAgo,  'LLLL', FAKE_HANDLEBARS_CONTEXT]), '3 days ago');
  assert.equal(callHelper(ago, [date(),   'LLLL', FAKE_HANDLEBARS_CONTEXT]), 'a few seconds ago');
});
