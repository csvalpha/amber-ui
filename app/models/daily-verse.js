import Model, { attr } from '@ember-data/model';

export default Model.extend({
  reference: attr('string'),
  content: attr('string'),
  copyright: attr('string')
});
