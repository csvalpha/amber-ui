import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { CanMixin } from 'ember-can';
import EditController from 'alpha-amber/controllers/application/edit';

export default EditController.extend(CanMixin, {
  session: service('session'),
  successTransitionTarget: 'articles.show',
  groupOptions: computed(function() {
    const optionArray = [
      {
        label: '',
        value: null
      }
    ];
    const groups = this.get('session.currentUser.groups');
    groups.forEach((group) => {
      optionArray.push({
        label: group,
        value: group
      });
    });
    return optionArray;
  }),
  groups: computed(function() {
    if (this.can('select all groups for articles')) {
      return this.store.findAll('group');
    }
    return this.get('session.currentUser').get('groups');
  }),
  actions: {
    coverPhotoLoaded(file) {
      const article = this.model;
      article.set('coverPhoto', file.data);
    }
  }
});
