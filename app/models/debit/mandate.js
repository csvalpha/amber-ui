import Model, { belongsTo, attr } from '@ember-data/model';

export default class Mandate extends Model {
  @attr('date') startDate;
  @attr('date') endDate;
  @attr iban;
  @attr ibanHolder;

  // Relationships
  @belongsTo user;
}
