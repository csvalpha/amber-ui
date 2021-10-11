import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  store: service(),
  session: service(),
  can: service(),

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
    if (this.can.can('select all groups for photo-albums')) {
      return this.store.findAll('group');
    }

    return this.session.currentUser.get('groups');
  }),

  actions: {
    submit() {
      const photoAlbum = this.model;
      photoAlbum.save().then(() => {
        // Only pass id when force reload is required, see http://emberigniter.com/force-store-reload-data-api-backend/
        this.transitionToRoute('photo-albums.photo-album.edit', photoAlbum.id);
      }).catch(error => {
        this.set('errorMessage', error.message);
      });
    }
  }
});
