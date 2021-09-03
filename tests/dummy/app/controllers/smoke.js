import Controller from '@ember/controller';

export default class Smoke extends Controller {
  get currentTime() {
    return new Date();
  }

  get usIndependenceDay() {
    return new Date(1776, 6, 4, 12, 0, 0);
  }
}
