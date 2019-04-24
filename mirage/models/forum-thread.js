import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  posts: hasMany('forum-post'),
  category: belongsTo('forum-category'),
  author: belongsTo('user')
});
