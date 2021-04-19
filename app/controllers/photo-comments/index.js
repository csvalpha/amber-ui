import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import FilterableAndSortableMixin from 'alpha-amber/mixins/filterable-and-sortable-mixin';
import { inject as service } from '@ember/service';

export default Controller.extend(FilterableAndSortableMixin, {
  routeOnEnter: 'photo-albums.photo-album.photos.show',
  queryParams: ['search', 'sort', 'page'],

  sortableAttributes: [
    {
      value: 'updated_at',
      label: 'Laatste reactie'
    }
  ],

  sortedAscending: false,
  sortedAttribute: 'updated_at',
  commentContent: EmberObject.create(),
  flashNotice: service(),

  actions: {
    submitPhotoComment(photo) {
      return new Promise((resolve, reject) => {
        const content = this.commentContent.get(photo.get('id')).trim();

        if (content.length > 0) {
          const photoComment = this.store.createRecord('photoComment', { content, photo });

          photoComment.save().then(() => {
            this.flashNotice.sendSuccess('Reactie opgeslagen!');
            photo.reload(); // Reload for updated Photo#amountOfComments and updated_at
            resolve();
          }).catch(reject);
        } else {
          reject();
        }

        this.commentContent.set(photo.get('id'), '');
      });
    }
  }
});
