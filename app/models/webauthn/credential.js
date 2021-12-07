import Model, { belongsTo, attr } from '@ember-data/model';

export default class Credential extends Model {
  @attr nickname;
  @attr('date') createdAt;

  // Relationships
  @belongsTo user;
}
