import Model, { belongsTo, attr } from '@ember-data/model';

export default class ArticleComment extends Model {
  // Properties
  @attr('date') updatedAt;
  @attr('date') createdAt;
  @attr('string') content;

  // Relations
  @belongsTo('user') author;
  @belongsTo('article') article;
}
