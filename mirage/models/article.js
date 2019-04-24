import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  author: belongsTo('user'),
  group: belongsTo(),
  comments: hasMany('article-comment')
});
