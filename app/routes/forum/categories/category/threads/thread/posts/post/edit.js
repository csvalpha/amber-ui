import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class PostEditRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Forumbericht aanpassen' };

  canAccess(model) {
    return this.abilities.can('edit forum/post', model);
  }

  deactivate() {
    super.deactivate();
    this.controller.model.rollbackAttributes();
  }
}
