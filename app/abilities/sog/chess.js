import { Ability } from 'ember-can';

export default class Chess extends Ability {
  get canShow() {
    return true // if necessary, this can be implemented.
  }
}