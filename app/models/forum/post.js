import Model, { belongsTo, attr } from '@ember-data/model';
import moment from 'moment';

export default class Post extends Model {
  // Properties
  @attr message;
  @attr messageCamofied;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Relations
  @belongsTo('user') author;

  @belongsTo('forum/thread') thread;

  // getters
  get isUpdated() {
    return moment(this.updatedAt).isAfter(this.createdAt);
  }
}
