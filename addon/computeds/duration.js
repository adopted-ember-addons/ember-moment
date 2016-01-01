import moment from 'moment';
import computed from './-base';

export default computed((params) => moment.duration(...params).humanize());
