import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import PagedModelControllerMixin from 'alpha-amber/mixins/paged-model-controller-mixin';
import FilterableAndSortableMixin from 'alpha-amber/mixins/filterable-and-sortable-mixin';
import { inject as service } from '@ember/service';

export default Controller.extend(FilterableAndSortableMixin, PagedModelControllerMixin, {
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
  commentContent: new EmberObject(),
  flashNotice: service(),

  actions: {
    submitPhotoComment(photo) {
      return new Promise((resolve, reject) => {
        const commentContent = this.get('commentContent');
        const content = commentContent.get(photo.get('id')).trim();

        if (content.length > 0) {
          const flashNotice = this.get('flashNotice');
          const photoComment = this.get('store').createRecord('photoComment', { content, photo });

          photoComment.save().then(() => {
            flashNotice.sendSuccess('Reactie opgeslagen!');
            photo.reload(); // Reload for updated Photo#amountOfComments and updated_at
            resolve();
          }).catch(reject);
        } else {
          reject();
        }
        commentContent.set(photo.get('id'), '');
      });
    }
  }
});
