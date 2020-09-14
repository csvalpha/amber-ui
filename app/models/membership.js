import { alias } from '@ember/object/computed';
import Model, { belongsTo, attr } from '@ember-data/model';

export default class Membership extends Model {
  // Attributes
  @attr('date') startDate;
  @attr('date') endDate;
  @attr function;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Relationships
  @belongsTo user;

  @belongsTo group;

  // Getters
  @alias('group.administrative') administrative;

  get userIsCurrentlyMember() {
    return (this.startDate < moment.now() && (!this.endDate || this.endDate > moment.now()));
  }
}
