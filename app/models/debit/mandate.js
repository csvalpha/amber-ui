import Model, { belongsTo, attr } from '@ember-data/model';

export default class Mandate extends Model {
  @attr('date-only') startDate;
  @attr('date-only') endDate;
  @attr iban;
  @attr ibanHolder;

  // Relationships
  @belongsTo user;
}
