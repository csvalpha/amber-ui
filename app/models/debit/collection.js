import classic from 'ember-classic-decorator';
import Model, { belongsTo, hasMany, attr } from '@ember-data/model';

@classic
export default class Collection extends Model {
  @attr('string')
  name;

  @attr('date')
  date;

  @attr('raw')
  importFile;

  @attr('date')
  createdAt;

  @attr('date')
  updatedAt;

  @hasMany('debit/transaction')
  transactions;

  @belongsTo('user')
  author;
}
