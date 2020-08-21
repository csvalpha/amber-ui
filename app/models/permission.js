import Model, { attr } from '@ember-data/model';

export default class Permission extends Model {
  // Properties
  @attr('string') name;

  // Getters
  get model() {
    return this.name.split('.')[0];
  }

  get action() {
    return this.name.split('.')[1];
  }
}
