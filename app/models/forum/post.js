import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Model, { belongsTo, attr } from '@ember-data/model';

@classic
export default class Post extends Model {
  // Properties
  @attr('string')
  message;

  @attr('string')
  messageCamofied;

  @attr('date')
  createdAt;

  @attr('date')
  updatedAt;

  // Relations
  @belongsTo('user')
  author;

  @belongsTo('forum/thread')
  thread;

  // Computed properties
  @computed('createdAt', 'updatedAt')
  get isUpdated() {
    return moment(this.updatedAt).isAfter(this.createdAt);
  }
}
