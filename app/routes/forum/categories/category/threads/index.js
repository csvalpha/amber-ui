import { AuthenticatedRoute } from 'amber-ui/routes/application/application';
import { assign } from '@ember/polyfills';

export default class ThreadIndexRoute extends AuthenticatedRoute {
  get breadCrumb() {
    return { title: this.controller.model.name };
  }

  get pageActions() {
    return [
      {
        link: 'forum.categories.category.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: this.controller.model.id,
        canAccess: this.abilities.can('edit forum/categories'),
      },
      {
        link: 'forum.categories.category.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: this.controller.model.id,
        canAccess: this.abilities.can('destroy forum/categories'),
      },
      {
        link: 'forum.categories.category.threads.new',
        title: 'Nieuw topic',
        icon: 'plus',
        // Only pass id when force reload is required, see http://emberigniter.com/force-store-reload-data-api-backend/
        // pass id to force Ember to call model() on forum.categories.threads.new
        // and not use the supplied category model as model for that route (as per Ember's default)
        linkArgument: this.controller.model.id,
        canAccess: this.abilities.can('create forum/threads'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show forum/threads');
  }

  async model(params) {
    const category = this.modelFor('forum.categories.category');
    assign(params, {
      filter: { category: category.id },
    });
    const threadsPromise = await this.store.queryPaged('forum/thread', params);
    return {
      category,
      threads: threadsPromise,
    };
  }
}
