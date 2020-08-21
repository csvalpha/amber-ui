import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
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
  }),
  canShowArticleComments: computed('model.publiclyVisible', 'session.currentUser', function() {
    return this.session.hasPermission('article-comment.read') || this.model.publiclyVisible;
  }),
  canEdit: computed('session.currentUser', 'model', function() {
    return this.session.hasPermission('article.update') || this.isArticleOwner(this.model);
  }),
  isArticleOwner(article) {
    // This can be reached while not logged in: when a user visits a public article, this method is called to
    // determine whether to show the edit button
    const { currentUser } = this.session;
    return !isNone(currentUser) && article.isOwner(currentUser);
  }
});
