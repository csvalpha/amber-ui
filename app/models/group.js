import { computed } from '@ember/object';
import DS from 'ember-data';
import AvatarModelMixin from 'alpha-amber/mixins/avatar-model-mixin';

const { Model, attr, hasMany } = DS;

export default Model.extend(AvatarModelMixin, {
  defaultAvatarUrl: '/images/fallback/group_avatar_default.png',
  defaultAvatarThumbUrl: '/images/fallback/group_avatar_thumb_default.png',

  // Properties
  name: attr('string'),
  createdAt: attr('date'),
  kind: attr('string'),
  description: attr('string'),
  descriptionCamofied: attr('string'),
  recognizedAtGma: attr('string'),
  rejectedAtGma: attr('string'),
  administrative: attr('boolean', { defaultValue: false }),

  // Relations
  memberships: hasMany('membership'),
  permissions: hasMany('permission'),
  mailAliases: hasMany('mail-alias', { inverse: 'group' }),
  moderatorForMailAliases: hasMany('mail-alias', { inverse: 'moderatorGroup' }),

  // Computed properties
  recognitionPeriod: computed('recognizedAtGma', 'rejectedAtGma', function() {
    if (this.get('rejectedAtGma') !== null) {
      return `${this.get('recognizedAtGma')} - ${this.get('rejectedAtGma')}`;
    }
    if (this.get('recognizedAtGma') !== null) {
      return `${this.get('recognizedAtGma')} - heden`;
    }
    return null;
  }),
  alternativeGroupLogoText: computed('name', function() {
    return `Het logo van ${this.get('name')}`;
  }),
  rollbackAttributesAndMemberships() {
    this.get('memberships').forEach(membership => {
      if (membership !== undefined) {
        membership.rollbackAttributes();
      }
    });
    this.rollbackAttributes();
  }
});
