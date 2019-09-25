import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export const ForumStatusIconComponent = Component.extend({
  storage: service('local-storage'),
  thread: null,
  threadHasNewPosts: computed('thread', 'storage', function() {
    const thread = this.thread;
    const currentStore = JSON.parse(this.storage.getItem('forumLastRead') || '{}');
    const lastRead = currentStore[thread.get('id')];
    return lastRead === undefined || new Date(lastRead) < thread.get('updatedAt');
  })
});

ForumStatusIconComponent.reopenClass({
  positionalParams: ['thread']
});

export default ForumStatusIconComponent;
