import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class ShowCategoryRoute extends AuthenticatedRoute {
  beforeModel() {
    this.transitionTo('forum.categories.category.threads');
  }
}
