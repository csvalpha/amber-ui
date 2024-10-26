import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ThreadIndexRoute extends AuthenticatedRoute {
  beforeModel() {
    this.transitionTo('forum.categories.category.threads.thread.posts');
  }
}
