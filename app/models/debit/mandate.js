import Model, { belongsTo, attr } from '@ember-data/model';

export default Model.extend({
  startDate: attr('date'),
  endDate: attr('date'),
  iban: attr('string'),
  ibanHolder: attr('string'),

  user: belongsTo('user')
});
