import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class PollEditRoute extends AuthenticatedRoute {
  breadcrumb = { title: 'Poll aanpassen' };

  canAccess(model) {
    return this.abilities.can('edit poll', model);
  }

  deactivate() {
    super.deactivate();
    this.controller.model?.rollbackAttributes();
  }
}
