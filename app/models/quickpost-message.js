import Model, { belongsTo, attr } from '@ember-data/model';

export default class QuickpostMessage extends Model {
  @attr message;
  @attr('date') createdAt;

  // Relationships
  @belongsTo('user') author;
}
