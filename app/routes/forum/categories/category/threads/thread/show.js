import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class ShowThreadRoute extends AuthenticatedRoute {
  beforeModel() {
    this.transitionTo('forum.categories.category.threads.thread.posts');
  }
}
