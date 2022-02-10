import Model, { belongsTo, attr } from '@ember-data/model';

export default class StoredMail extends Model {
  // Properties
  @attr messageUrl;
  @attr('date') receivedAt;
  @attr subject;
  @attr plainBody;
  @attr sender;
  @attr attachments;

  // Relations
  @belongsTo mailAlias;
}
