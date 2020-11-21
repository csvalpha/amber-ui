import Model, { belongsTo, attr } from '@ember-data/model';

export default class PhotoComment extends Model {
  // Properties
  @attr content;
  @attr('date') updatedAt;
  @attr('date') createdAt;

  // Relations
  @belongsTo('user') author;
  @belongsTo photo;
}
