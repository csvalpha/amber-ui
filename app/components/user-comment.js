import Component from '@ember/component';

const UserCommentComponent = Component.extend({
});

UserCommentComponent.reopenClass({
  positionalParams: ['comment']
});

export default UserCommentComponent;
