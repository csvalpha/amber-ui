import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import EditController from 'alpha-amber/controllers/application/edit';

export default EditController.extend({
  session: service('session'),
  can: service(),
  successTransitionTarget: 'articles.show',
  groupOptions: computed('session.currentUser.{group,groups}', function() {
    const optionArray = [
      {
        label: '',
        value: null
      }
    ];
    const groups = this.session.currentUser.group;
    groups.forEach((group) => {
      optionArray.push({
        label: group,
        value: group
      });
    });
    return optionArray;
  }),
  groups: computed('session.currentUser', 'store', function() {
    if (this.can.can('select all groups for articles')) {
      return this.store.findAll('group');
    }

    return this.session.currentUser.get('groups');
  }),
  actions: {
    coverPhotoLoaded(file) {
      const article = this.model;
      article.set('coverPhoto', file.data);
    }
  }
});
