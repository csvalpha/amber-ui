import Model, { belongsTo, attr } from '@ember-data/model';

export default class QuickpostMessage extends Model {
  @attr message;
  @attr createdAt;

  // Relationships
  @belongsTo('user') author;
}
