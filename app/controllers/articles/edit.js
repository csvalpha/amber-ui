import EditController from 'alpha-amber/controllers/application/edit';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class EditArticleController extends EditController {
  @service session;
  @service abilities;

  successTransitionTarget = 'articles.show';

  @computed('session.currentUser', function() {
    return this.session.hasPermission('article.update');
  })
  canPin;

  @computed('session.currentUser.{group,groups}', function() {
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
  })
  groupOptions;

  @computed('session.currentUser', 'store', function() {
    if (this.abilities.can('select all groups for articles')) {
      return this.store.findAll('group');
    }

    return this.session.currentUser.get('groups');
  })
  groups;

  @action
  coverPhotoLoaded(file) {
    const article = this.model;
    article.set('coverPhoto', file.data);
  }
}
