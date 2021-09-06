import EmberObject from '@ember/object';
import { setOwner } from '@ember/application';

// This is carry-over from the legacy testing suite
// must be invoked with call or apply so that the right `this`
// can be used.
export function createSubject(attrs) {
  let factory = this.owner.factoryFor('object:empty');

  if (!factory) {
    // eslint-disable-next-line ember/no-classic-classes
    factory = EmberObject.extend({});
  }

  let extendedFactory = (factory.class || factory).extend(attrs);
  let subject = extendedFactory.create({});

  setOwner(subject, this.owner);

  return subject;
}
