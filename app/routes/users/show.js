import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ShowUserRouter extends AuthenticatedRoute {
  get breadcrumb() {
    return { title: this.controller.model.fullName };
  }

  get pageActions() {
    const user = this.controller.model;
    return [
      {
        link: 'users.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: user,
        canAccess: this.abilities.can('edit user', user),
      },
      {
        link: 'users.resend_activation',
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
        link: 'users.show',
        title: 'Algemeen',
        linkArgument: user,
        canAccess: this.abilities.can('show users'),
      },
      {
        link: 'users.show-groups',
        title: 'Groepen',
        linkArgument: user,
        canAccess: this.abilities.can('show memberships'),
      },
      {
        link: 'users.show-settings',
        title: 'Instellingen',
        linkArgument: user,
        canAccess: this.abilities.can('edit user', user),
      },
      {
        link: 'users.show-mail',
        title: 'Mail aliassen',
        linkArgument: user,
        canAccess: this.abilities.can('show mail-aliases'),
      },
      {
        link: 'users.show-mandates',
        title: 'Incasso mandaten',
        linkArgument: user,
        canAccess: true,
      },
      {
        link: 'users.show-permissions',
        title: 'Rechten',
        linkArgument: user,
        canAccess: this.abilities.can('show permissions-users'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show individual users');
  }

  model(params) {
    return this.store.findRecord('user', params.id, params);
  }
}
