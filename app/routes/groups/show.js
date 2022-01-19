import { all } from 'rsvp';
import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class ShowGroupRoute extends AuthenticatedRoute {
  get breadCrumb() {
    return { title: this.controller.model.name };
  }

  get pageActions() {
    const group = this.controller.model;
    return [
      {
        link: 'groups.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: group,
        canAccess: this.abilities.can('edit group', group)
      },
      {
        link: 'groups.export',
        title: 'Gebruikers exporteren',
        icon: 'download',
        linkArgument: group,
        canAccess: this.abilities.can('export group', group)
      }
    ];
  }

  canAccess() {
    return this.abilities.can('show groups');
  }

  model(params) {
    return this.store.findRecord('group', params.id, params);
  }

  afterModel(group) {
    // This ensures all memberships and users are loaded
    if (this.abilities.can('show memberships')) {
      return group.get('memberships').then(memberships => {
        return all(memberships.mapBy('user'));
      });
    }
  }
}
