import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  thread: belongsTo('forum-thread'),
  author: belongsTo('user')
});
