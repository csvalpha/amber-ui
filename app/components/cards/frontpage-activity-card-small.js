import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

const FrontpageActivityCardSmall = Component.extend({
  classNames: ['card', 'frontpage-activity-card-small', 'border-0', 'p-0'],
  style: computed('activity.coverPhotoUrl', function () {
    if (this.activity.coverPhotoUrl) {
      return htmlSafe(
        `background-image: url(${this.activity.coverPhotoUrl})`
      );
    }
    return htmlSafe(
      'background: center/cover url(/images/fallback/frontpage_coverphoto_default.png)'
    );
  }),
});

FrontpageActivityCardSmall.reopenClass({
  positionalParams: ['activity'],
});

export default FrontpageActivityCardSmall;
