import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

const PublicActivityCardSmall = Component.extend({
  classNames: ['card', 'public-activity-card-small', 'border-0', 'p-0'],
  style: computed('activity.coverPhotoUrl', function () {
    if (this.activity.coverPhotoUrl) {
      return htmlSafe(`background-image: url(${this.activity.coverPhotoUrl})`);
    }
    return htmlSafe(
      'background: center/cover url(/images/fallback/public_coverphoto_default.png), rgb(0 0 0 / 12%);'
    );
  }),
});

PublicActivityCardSmall.reopenClass({
  positionalParams: ['activity'],
});

export default PublicActivityCardSmall;
