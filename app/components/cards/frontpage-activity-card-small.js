import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

const FrontpageActivityCardSmall = Component.extend({
  classNames: ['card', 'frontpage-activity-card-small', 'border-0', 'p-0'],
  style: computed('activity.coverPhotoUrlOrDefault', function () {
    return htmlSafe(
      `background-image: url(${this.activity.coverPhotoUrlOrDefault})`
    );
  }),
});

FrontpageActivityCardSmall.reopenClass({
  positionalParams: ['activity'],
});

export default FrontpageActivityCardSmall;
