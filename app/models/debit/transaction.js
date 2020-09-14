import Model, { belongsTo, attr } from '@ember-data/model';

export default class Transaction extends Model {
  @attr description;
  @attr amount;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Relationships
  @belongsTo user;
  @belongsTo('debit/collection')  collection;
}
