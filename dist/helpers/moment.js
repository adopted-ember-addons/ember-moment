import BaseHelper from './-base.js';

var moment = BaseHelper.extend({
  compute(params, {
    locale,
    timeZone
  }) {
    this._super(...arguments);
    const moment = this.moment;
    return this.morphMoment(moment.moment(...params), {
      locale,
      timeZone
    });
  }
});

export { moment as default };
//# sourceMappingURL=moment.js.map
