import {
  create,
  count,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/photo-comments'),
  amountOfPhotos: count('*[data-test-photo-with-comments-card]'),
  amountOfPhotoComments: count('*[data-test-user-comment]')
});
