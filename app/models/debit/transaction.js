import Model, { belongsTo, attr } from '@ember-data/model';

export default class Transaction extends Model {
  @attr description;
  @attr amount;
  @attr createdAt;
  @attr updatedAt;

  // Relationships
  @belongsTo user;
  @belongsTo('debit/collection')  collection;
}
