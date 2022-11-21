import { AuthenticatedRoute } from 'amber-ui/routes/application/application';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import {
  bindKeyboardShortcuts,
  unbindKeyboardShortcuts,
} from 'ember-keyboard-shortcuts';

export default class PostIndexRoute extends AuthenticatedRoute {
  @service router;
  @service fetch;

  get breadcrumb() {
    return { title: this.controller.model.title };
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

  activate() {
    bindKeyboardShortcuts(this);
  }

  deactivate() {
    unbindKeyboardShortcuts(this);
  }

  keyboardShortcuts = {
    left: 'goToPreviousPage',
    up: 'goToPreviousPage',
    right: 'goToNextPage',
    down: 'goToNextPage',
  };

  @action
  goToPreviousPage() {
    this.controller.send('goToPreviousPage');
  }

  @action
  goToNextPage() {
    this.controller.send('goToNextPage');
  }

  resetController(controller, isExiting, transition) {
    super.resetController(controller, isExiting, transition);
    if (isExiting) {
      controller.send('resetNewContent');
    }
  }

  constructor() {
    super(...arguments);

    this.router.on('routeDidChange', () => {
      const thread = this.modelFor('forum.categories.category.threads.thread');
      if (thread) {
        // only mark as read if we are in a thread
        this.fetch.fetch(`/forum/threads/${thread.id}/mark_read`, {
          method: 'POST',
        });
      }
    });
  }
}
