import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class CategoryIndexRoute extends AuthenticatedRoute {
  beforeModel() {
    this.transitionTo('forum.categories.category.threads');
  }

  canAccess() {
    return this.abilities.can('show forum/categories');
  }
}
