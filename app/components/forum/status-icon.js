import Component from '@ember/component';

export const ForumStatusIconComponent = Component.extend({
  thread: null
});

ForumStatusIconComponent.reopenClass({
  positionalParams: ['thread']
});

export default ForumStatusIconComponent;
