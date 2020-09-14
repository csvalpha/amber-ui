import Model, { belongsTo, hasMany, attr } from '@ember-data/model';

export default class Collection extends Model {
  @attr name;
  @attr date;
  @attr importFile;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Relationships
  @hasMany('debit/transaction') transactions;
  @belongsTo('user') author;
}
