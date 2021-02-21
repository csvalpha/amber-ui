import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class DestroyArticleRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Foto verwijderen' }

  canAccess() {
    return this.can.can('destroy photos');
  }

  model(params) {
    return this.store.findRecord('photo', params.photo_id, params);
  }
}

