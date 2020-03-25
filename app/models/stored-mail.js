import Model, { belongsTo, attr } from '@ember-data/model';

export default Model.extend({
  // Properties
  messageUrl: attr('string'),
  receivedAt: attr('date'),
  subject: attr('string'),
  plainBody: attr('string'),
  sender: attr('string'),
  attachments: attr('raw'),

  // Relations
  mailAlias: belongsTo('mail-alias')
});
