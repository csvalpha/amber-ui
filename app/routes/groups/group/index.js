import { all } from 'rsvp';
import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class GroupIndexRoute extends AuthenticatedRoute {
  get pageActions() {
    const group = this.controller.model;
    return [
      {
        link: 'groups.group.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: group,
        canAccess: this.abilities.can('edit group', group),
      },
      {
        link: 'groups.group.export',
        title: 'Gebruikers exporteren',
        icon: 'download',
        linkArgument: group,
        canAccess: this.abilities.can('export group', group),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show groups');
  }

  afterModel(group) {
    // This ensures all memberships and users are loaded
    if (this.abilities.can('show memberships')) {
      return group.get('memberships').then((memberships) => {
        return all(memberships.mapBy('user'));
      });
    }
  }
}
