import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class EditPostRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Forumbericht aanpassen' };

  canAccess(model) {
    return this.abilities.can('edit forum/post', model);
  }

  model(params) {
    return this.store.findRecord('forum/post', params.post_id, params);
  }

  deactivate() {
    super.deactivate();
    this.controller.model.thread?.rollbackAttributes();
  }
}
