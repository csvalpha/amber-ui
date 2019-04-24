import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canCreatePost: computed('session.currentUser', 'model.isOpen', function() {
    return (this.get('model.isOpen') || this.get('session').hasPermission('forum/thread.update'))
      && this.get('session').hasPermission('forum/post.create');
  }),
  canQuotePost: computed.alias('canCreatePost')
});
