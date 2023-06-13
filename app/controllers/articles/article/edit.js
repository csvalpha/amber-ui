import EditController from 'amber-ui/controllers/application/edit';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ArticleEditController extends EditController {
  @service abilities;
  @service session;

  successTransitionTarget = 'articles.article';

  get canPin() {
    return this.session.hasPermission('article.update');
  }

  get groupOptions() {
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
  }

  get groups() {
    if (this.abilities.can('select all groups for articles')) {
      return this.store.findAll('group');
    }

    return this.session.currentUser.get('groups');
  }

  @action
  coverPhotoLoaded(file) {
    const article = this.model;
    article.set('coverPhoto', file.data);
  }

  @action
  setContent(content) {
    this.model.content = content;
  }
}
