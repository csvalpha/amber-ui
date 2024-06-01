import Model, { belongsTo, attr } from '@ember-data/model';

export default class PhotoTag extends Model {
  // Properties
  @attr x;
  @attr y;
  @attr('date') updatedAt;
  @attr('date') createdAt;

  // Relations
  @belongsTo('user') author;
  @belongsTo('user') taggedUser;
  @belongsTo photo;

  get tagStyle() {
    return `left: ${parseFloat(this.x)}%; top: ${parseFloat(this.y)}%;`;
  }
}
