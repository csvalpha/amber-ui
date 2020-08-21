import Model, { belongsTo, hasMany, attr } from '@ember-data/model';

export default class Collection extends Model {
  @attr name;
  @attr date;
  @attr importFile;
  @attr createdAt;
  @attr updatedAt;

  // Relationships
  @hasMany('debit/transaction') transactions;
  @belongsTo('user') author;
}
