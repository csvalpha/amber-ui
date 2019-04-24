import {
  create,
  visitable,
  isVisible,
  count
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/'),
  advertisementsAreVisible: isVisible('div.adv-container'),
  amountOfArticles: count('*[data-test-article-card]'),
  amountOfActivities: count('*[data-test-frontpage-activity-card]'),
  amountOfPhotoAlbums: count('*[data-test-photo-album-card]')
});
