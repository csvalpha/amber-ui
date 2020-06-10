import Model, { belongsTo, attr } from '@ember-data/model';

export default class MailAlias extends Model {
  // Properties
  @attr email;
  @attr moderationType;
  @attr description;
  @attr({ defaultValue: false }) smtpEnabled;
  @attr lastReceivedAt;

  // Relations
  @belongsTo({ inverse: 'mailAliases' }) user;
  @belongsTo group
  @belongsTo({ inverse: 'moderatorForMailAliases' }) moderatorGroup;
}
