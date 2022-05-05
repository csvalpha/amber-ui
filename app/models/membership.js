import Model, { belongsTo, attr } from '@ember-data/model';
import moment from 'moment';

export default class Membership extends Model {
  // Attributes
  @attr('date-only') startDate;
  @attr('date-only') endDate;
  @attr function;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Relationships
  @belongsTo user;

  @belongsTo group;

  get administrative() {
    return this.group.get('administrative');
  }

  get userIsCurrentlyMember() {
    return (
      this.startDate < moment.now() &&
      (!this.endDate || this.endDate > moment.now())
    );
  }
}
