import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class GenerateAliasRoute extends AuthenticatedRoute {
  breadCrumb = { title: 'Creëer mailalias' };

  canAccess(model) {
    return this.abilities.can('generate alias for activity', model);
  }

  model(params) {
    return this.store
      .findRecord('activity', params.id, params)
      .then((activity) => activity.get('form').then(() => activity));
  }
}
