import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class UserIndexRoute extends AuthenticatedRoute {
  get pageActions() {
    const user = this.controller.model;
    return [
      {
        link: 'users.user.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: user,
        canAccess: this.abilities.can('edit user', user),
      },
      {
        link: 'users.user.resend-activation-code',
        title: 'Verstuur activatie code',
        icon: 'paper-plane',
        linkArgument: user,
        canAccess: this.abilities.can('resend activation code of user', user),
      },
    ];
  }

  get tabItems() {
    const user = this.controller.model;
    return [
      {
        link: 'users.user.index',
        title: 'Algemeen',
        linkArgument: user,
        canAccess: this.abilities.can('show individual users'),
      },
      {
        link: 'users.user.groups',
        title: 'Groepen',
        linkArgument: user,
        canAccess: this.abilities.can('show memberships'),
      },
      {
        link: 'users.user.settings',
        title: 'Instellingen',
        linkArgument: user,
        canAccess: this.abilities.can('edit user', user),
      },
      {
        link: 'users.user.mail',
        title: 'Mail aliassen',
        linkArgument: user,
        canAccess: this.abilities.can('show mail-aliases'),
      },
      {
        link: 'users.user.mandates',
        title: 'Incasso mandaten',
        linkArgument: user,
        canAccess: true,
      },
      {
        link: 'users.user.permissions',
        title: 'Rechten',
        linkArgument: user,
        canAccess: this.abilities.can('show permissions-users'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show individual users');
  }
}
