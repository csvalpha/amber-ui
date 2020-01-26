import Component from '@ember/component';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';

const ActivityCardBar = Component.extend({
  expandable: false,
  expanded: false,
  endsOnSameDateOrNight: computed('activity.startTime', 'activity.endTime', function() {
    return moment(this.get('activity.endTime')).isSameOrBefore(moment(this.get('activity.startTime')).endOf('day').add(5, 'hours'));
  }),
  colorClass: computed('index', function() {
    switch (this.index % 4) {
      case 0: return 'lustrumbar-red';
      case 1: return 'lustrumbar-navyblue';
      case 2: return 'lustrumbar-yellow';
      case 3: return 'lustrumbar-steelblue';
      default: return 'lustrumbar-red';
    }
  }),
  hasForm: computed('activity', function() {
    return !isNone(this.activity.belongsTo('form').id());
  }),
  canSubmitResponse: computed('activity.form', 'activity.form.currentUserCanRespond', function() {
    const form = this.get('activity.form');
    return !isNone(form) && form.get('currentUserCanRespond');
  }),
  excerpt: computed('activity.descriptionCamofied', function() {
    const maxExcerptLength = 218;
    let content = this.get('activity.descriptionCamofied');
    if (content && content.length > maxExcerptLength) {
      return `${content.substr(0, content.lastIndexOf(' ', maxExcerptLength))}...`;
    }

    return content;
  })
});

ActivityCardBar.reopenClass({
  positionalParams: ['activity', 'index']
});

export default ActivityCardBar;
