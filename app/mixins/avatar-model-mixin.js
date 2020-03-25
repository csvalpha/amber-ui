import { attr } from '@ember-data/model';
import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  defaultAvatarUrl: '/images/fallback/avatar_default.png',
  defaultAvatarThumbUrl: '/images/fallback/avatar_thumb_default.png',
  avatar: attr('raw'),
  avatarUrl: attr('string'),
  avatarThumbUrl: attr('string'),
  avatarThumbUrlOrDefault: computed('avatarThumbUrl', function() {
    return this.avatarThumbUrl || this.defaultAvatarThumbUrl;
  }),
  avatarUrlOrDefault: computed('avatarUrl', function() {
    return this.avatarUrl || this.defaultAvatarUrl;
  })
});
