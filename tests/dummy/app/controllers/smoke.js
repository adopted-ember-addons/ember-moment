import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  currentTime: computed(() => new Date()),
  usIndependenceDay: computed(() => new Date(1776, 6, 4, 12, 0, 0))
});
