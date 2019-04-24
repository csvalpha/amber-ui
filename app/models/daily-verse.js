import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  reference: attr('string'),
  content: attr('string'),
  copyright: attr('string')
});
