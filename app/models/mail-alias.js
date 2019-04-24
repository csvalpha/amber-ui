import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  // Properties
  email: attr('string'),
  moderationType: attr('string'),
  description: attr('string'),

  // Relations
  user: belongsTo('user', { inverse: 'mailAliases' }),
  group: belongsTo('group'),
  moderatorGroup: belongsTo('group', { inverse: 'moderatorForMailAliases' })
});
