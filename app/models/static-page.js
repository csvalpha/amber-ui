import Model, { attr } from '@ember-data/model';

export default Model.extend({
  // Properties
  title: attr('string'),
  content: attr('string'),
  contentCamofied: attr('string'),
  slug: attr('string'),
  createdAt: attr('date'),
  publiclyVisible: attr('boolean', { defaultValue: false }),
  category: attr('string')
});
