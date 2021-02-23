import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class ThreadIndexRoute extends AuthenticatedRoute {
  get breadCrumb() {
    return { title: this.controller.model.name };
  }

  get pageActions() {
    return [
      {
        link: 'forum.categories.category.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: this.controller.model,
        canAccess: this.can.can('edit forum/categories')
      },
      {
        link: 'forum.categories.category.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: this.controller.model,
        canAccess: this.can.can('destroy forum/categories')
      },
      {
        link: 'forum.categories.category.threads.new',
        title: 'Nieuw topic',
        icon: 'plus',
        // Only pass id when force reload is required, see http://emberigniter.com/force-store-reload-data-api-backend/
        // pass id to force Ember to call model() on forum.categories.threads.new
        // and not use the supplied category model as model for that route (as per Ember's default)
        linkArgument: this.controller.model.id,
        canAccess: this.can.can('create forum/threads')
      }
    ];
  }

  canAccess() {
    return this.can.can('show forum/threads');
  }

  model() {
    return this.modelFor('forum.categories.category');
  }
}
