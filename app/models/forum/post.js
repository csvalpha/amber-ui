import Model, { belongsTo, attr } from '@ember-data/model';

export default class Post extends Model {
  // Properties
  @attr message;
  @attr messageCamofied;
  @attr createdAt;
  @attr updatedAt;

  // Relations
  @belongsTo('user') author;

  @belongsTo('forum/thread') thread;

  // getters
  get isUpdated() {
    return moment(this.updatedAt).isAfter(this.createdAt);
  }
}
