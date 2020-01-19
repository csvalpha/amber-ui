import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canCreatePost: computed('session.currentUser', 'model.isOpen', function() {
    return (this.get('model.isOpen') || this.session.hasPermission('forum/thread.update'))
      && this.session.hasPermission('forum/post.create');
  }),
  canQuotePost: alias('canCreatePost')
});
