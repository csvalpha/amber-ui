import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class CategoryIndexRoute extends ApplicationRoute {
  beforeModel() {
    this.transitionTo('forum.categories.category.threads');
  }
}
