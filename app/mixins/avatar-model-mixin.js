import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';
import DS from 'ember-data';

const { attr } = DS;

export default Mixin.create({
  defaultAvatarUrl: '/images/fallback/avatar_default.png',
  defaultAvatarThumbUrl: '/images/fallback/avatar_thumb_default.png',
  avatar: attr('raw'),
  avatarUrl: attr('string'),
  avatarThumbUrl: attr('string'),
  avatarThumbUrlOrDefault: computed('avatarThumbUrl', function() {
    return this.get('avatarThumbUrl') || this.get('defaultAvatarThumbUrl');
  }),
  avatarUrlOrDefault: computed('avatarUrl', function() {
    return this.get('avatarUrl') || this.get('defaultAvatarUrl');
  })
});
