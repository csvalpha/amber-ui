import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import EditController from 'alpha-amber/controllers/application/edit';

export default EditController.extend({
  session: service('session'),
  abilities: service(),
  successTransitionTarget: 'articles.show',
  canPin: computed('session.currentUser', function () {
    return this.session.hasPermission('article.update');
  }),
  groupOptions: computed('session.currentUser.{group,groups}', function () {
    const optionArray = [
      {
        label: '',
        value: null,
      },
    ];
    const groups = this.session.currentUser.group;
    groups.forEach((group) => {
      optionArray.push({
        label: group,
        value: group,
      });
    });
    return optionArray;
  }),
  groups: computed('session.currentUser', 'store', function () {
    if (this.abilities.can('select all groups for articles')) {
      return this.store.findAll('group');
    }

    return this.session.currentUser.get('groups');
  }),
  actions: {
    coverPhotoLoaded(file) {
      const article = this.model;
      article.set('coverPhoto', file.data);
    },

    submit() {
      this.model
        .save()
        .then(() => {
          this.transitionToRoute('articles.show', this.model);
        })
        .catch((error) => {
          this.set('errorMessage', error.message);
        });
    },
  },
});
