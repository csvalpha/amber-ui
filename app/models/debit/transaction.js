import classic from 'ember-classic-decorator';
import Model, { belongsTo, attr } from '@ember-data/model';

@classic
export default class Transaction extends Model {
  @attr('string')
  description;

  @attr('number')
  amount;

  @attr('date')
  createdAt;

  @attr('date')
  updatedAt;

  @belongsTo('user')
  user;

  @belongsTo('debit/collection')
  collection;
}
