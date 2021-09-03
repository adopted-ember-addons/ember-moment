import { setOwner } from '@ember/application';

export function createSubject(attrs) {
  const factory = this.owner.factoryFor('object:empty').class.extend(attrs);
  let subject = factory.create({});

  setOwner(subject, this.owner);

  return subject;
}
