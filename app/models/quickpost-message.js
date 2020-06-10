import Model, { belongsTo, attr } from '@ember-data/model';

export default class QuickpostMessage extends Model {
  @attr message;
  @belongsTo author;
  @attr createdAt;
}
