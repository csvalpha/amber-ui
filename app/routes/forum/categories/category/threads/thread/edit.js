import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ThreadEditRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Topic aanpassen' };

  canAccess() {
    return this.abilities.can('edit forum/threads');
  }

  deactivate() {
    super.deactivate();
    this.controller.model.rollbackAttributesAndPosts();
  }
}
