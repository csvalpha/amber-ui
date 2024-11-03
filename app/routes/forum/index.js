import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class ForumIndexRoute extends ApplicationRoute {
  beforeModel() {
    this.transitionTo('forum.categories');
  }
}
