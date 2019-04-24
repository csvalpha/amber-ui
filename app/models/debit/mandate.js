import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  startDate: attr('date'),
  endDate: attr('date'),
  iban: attr('string'),
  ibanHolder: attr('string'),

  user: belongsTo('user')
});
