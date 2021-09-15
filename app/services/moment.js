import MomentService from 'ember-moment/services/moment';
import config from '../config/environment';

export default class MomentOverride extends MomentService {
  defaultFormat = config.moment && config.moment.outputFormat || null;
}
