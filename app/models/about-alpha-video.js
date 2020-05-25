import Model, { attr } from '@ember-data/model';

export default Model.extend({
  videoId: attr('string'),
  title: attr('string'),
  thumbnailUrl: attr('string')
});
