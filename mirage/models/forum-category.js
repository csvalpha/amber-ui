import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  threads: hasMany('forum-thread')
});
