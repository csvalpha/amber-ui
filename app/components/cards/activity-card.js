import Component from '@ember/component';

const ActivityCardComponent = Component.extend({
  moreInfo: false,
});

ActivityCardComponent.reopenClass({
  positionalParams: ['activity'],
});

export default ActivityCardComponent;
