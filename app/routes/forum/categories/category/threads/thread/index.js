import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class ThreadIndexRoute extends ApplicationRoute {
  beforeModel() {
    this.transitionTo('forum.categories.category.threads.thread.posts');
  }
}
