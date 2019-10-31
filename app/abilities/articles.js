import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canCreate: computed('session.currentUser', function() {
    return this.session.hasPermission('article.create');
  }),
  canShow: true,
  canDestroy: computed('session.currentUser', function() {
    return this.session.hasPermission('article.destroy');
  }),
  canSelectAllGroups: computed('session.currentUser', function() {
    return this.session.hasPermission('article.update');
  })
});
