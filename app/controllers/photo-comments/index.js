import FilterableAndSortableController from 'alpha-amber/controllers/application/filterable-and-sortable';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PhotoCommentsIndexController extends FilterableAndSortableController {
  @service('flash-notice') flashNotice

  @tracked sortedAscending = false
  @tracked sortedAttribute = 'updated_at'

  routeOnEnter = 'photo-albums.photo-album.photos.show'
  queryParams = ['search', 'sort', 'page']
  sortableAttributes = [
    {
      value: 'updated_at',
      label: 'Laatste reactie'
    }
  ]

  commentContent = {}

  @action
  submitPhotoComment(photo) {
    return new Promise((resolve, reject) => {
      const photoId = photo.get('id');
      const content = this.commentContent[photoId].trim();

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

      this.commentContent[photoId] = '';
    });
  }
}
