import { Ability } from 'ember-can';

export default class Form extends Ability {
  get canShow() {
    return this.session.hasPermission('form/form.read');
  }
}
