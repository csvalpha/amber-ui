import Model, { belongsTo, attr } from '@ember-data/model';

export default class Transaction extends Model {
  @attr description;
  @attr('number') amount;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Relationships
  @belongsTo user;
  @belongsTo('debit/collection') collection;
  @belongsTo('declaration', { inverse: 'transactions' }) declaration;

  // Declaration settlements are stored as negative amounts
  get absoluteAmount() {
    return Math.abs(this.amount);
  }
}
