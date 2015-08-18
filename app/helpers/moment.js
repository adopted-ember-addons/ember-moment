import momentHelper from 'ember-moment/helpers/deprecated/moment';
import makeBoundHelper from 'ember-moment/utils/make-bound-helper';
import config from '../config/environment';

const { get } = Ember;

export default makeBoundHelper(
  momentHelper(
    get(config, 'moment.outputFormat'),
    !!get(config, 'moment.allowEmpty')
  )
);
