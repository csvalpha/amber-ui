import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canShowArticleComments: computed('session.currentUser', 'model', function() {
    return this.get('session').hasPermission('article-comment.read') || this.get('model.publiclyVisible');
  }),
  canEdit: computed('session.currentUser', 'model', function() {
    return this.get('session').hasPermission('article.update') || this.isArticleOwner(this.get('model'));
  }),
  isArticleOwner(article) {
    // This can be reached while not logged in: when a user visits a public article, this method is called to
    // determine whether to show the edit button
    const currentUser = this.get('session.currentUser');
    return !isNone(currentUser) && article.isOwner(currentUser);
  }
});
