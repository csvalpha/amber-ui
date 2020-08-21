import Model, { belongsTo, attr } from '@ember-data/model';

export default class Mandate extends Model {
  @attr startDate;
  @attr endDate;
  @attr iban;
  @attr ibanHolder;

  // Relationships
  @belongsTo user;
}
