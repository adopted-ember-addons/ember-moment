import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

window.moment.tz.add([
  'America/New_York|EST EDT|50 40|0101|1Lz50 1zb0 Op0'
]);

window.moment = (function (m) {
  var estMoment = function (value, input) {
    return m(value, input).tz('America/New_York');
  };

  return $.extend(estMoment, m);
})(window.moment);

document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

QUnit.config.urlConfig.push({ id: 'nocontainer', label: 'Hide container'});
if (QUnit.urlParams.nocontainer) {
  document.getElementById('ember-testing-container').style.visibility = 'hidden';
} else {
  document.getElementById('ember-testing-container').style.visibility = 'visible';
}
