import Model, { belongsTo, attr } from '@ember-data/model';

export default Model.extend({
  // Properties
  email: attr('string'),
  moderationType: attr('string'),
  description: attr('string'),
  smtpEnabled: attr('boolean', { defaultValue: false }),
  lastReceivedAt: attr('date'),

  // Relations
  user: belongsTo('user', { inverse: 'mailAliases' }),
  group: belongsTo('group'),
  moderatorGroup: belongsTo('group', { inverse: 'moderatorForMailAliases' })
});
