import classic from 'ember-classic-decorator';
import Model, { belongsTo, attr } from '@ember-data/model';

@classic
export default class Mandate extends Model {
  @attr('date')
  startDate;

  @attr('date')
  endDate;

  @attr('string')
  iban;

  @attr('string')
  ibanHolder;

  @belongsTo('user')
  user;
}
