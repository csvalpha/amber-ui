import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canCreate: computed('session.currentUser', function() {
    return this.session.hasPermission('forum/thread.create');
  }),
  canShow: computed('session.currentUser', function() {
    return this.session.hasPermission('forum/thread.read');
  }),
  canEdit: computed('session.currentUser', function() {
    return this.session.hasPermission('forum/thread.update');
  }),
  canDestroy: computed('session.currentUser', function() {
    return this.session.hasPermission('forum/thread.destroy');
  }),
  canCreatePost: computed('session.currentUser', 'model.isOpen', function() {
    return (this.get('model.isOpen') || this.session.hasPermission('forum/thread.update'))
      && this.session.hasPermission('forum/post.create');
  }),
  canQuotePost: alias('canCreatePost')
});
