import {
  bindKeyboardShortcuts,
  unbindKeyboardShortcuts,
} from 'ember-keyboard-shortcuts';
import { AuthenticatedRoute } from 'amber-ui/routes/application/application';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PostsIndexRoute extends AuthenticatedRoute {
  @service fetch;
  @service router;

  keyboardShortcuts = {
    left: 'goToPreviousPage',
    up: 'goToPreviousPage',
    right: 'goToNextPage',
    down: 'goToNextPage',
  };

  constructor() {
    super(...arguments);

    this.router.on('routeDidChange', () => {
      const thread = this.modelFor('forum.categories.category.threads.thread');
      if (thread) {
        this.fetch.fetch(`/forum/threads/${thread.id}/mark_read`, {
          method: 'POST',
        });
      }
    });
  }

  get pageActions() {
    return [
      {
        link: 'forum.categories.category.threads.thread.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: this.controller.model,
        canAccess: this.abilities.can('edit forum/threads'),
      },
      {
        link: 'forum.categories.category.threads.thread.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: this.controller.model,
        canAccess: this.abilities.can('destroy forum/threads'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show forum/posts');
  }

  async model(params) {
    const model = this.modelFor('forum.categories.category.threads.thread');
    await model.queryPostsPaged(params);
    return model;
  }

  resetController(controller, isExiting, transition) {
    super.resetController(controller, isExiting, transition);
    if (isExiting) {
      controller.send('resetNewContent');
    }
  }

  activate() {
    // CHANGED HERE: Use the specific ID of the textarea
    bindKeyboardShortcuts(this, {
      except: '#forum-post-new',
    });
  }

  deactivate() {
    unbindKeyboardShortcuts(this);
  }

  @action
  goToPreviousPage() {
    this.controller.send('goToPreviousPage');
  }

  @action
  goToNextPage() {
    this.controller.send('goToNextPage');
  }
}