import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class ShowModerationRoute extends AuthenticatedRoute {
  get breadCrumb() {
    return { title: this.controller.model.subject };
  }

  get pageActions() {
    return [
      {
        link: 'mail-moderations.accept',
        title: 'Goedkeuren',
        icon: 'check',
        linkArgument: this.controller.model,
        canAccess: this.abilities.can('accept mail-moderations'),
      },
      {
        link: 'mail-moderations.reject',
        title: 'Afkeuren',
        icon: 'circle-minus',
        linkArgument: this.controller.model,
        canAccess: this.abilities.can('reject mail-moderations'),
      },
      {
        link: 'mail-moderations.destroy',
        title: 'Negeren',
        icon: 'trash',
        linkArgument: this.controller.model,
        canAccess: this.abilities.can('destroy mail-moderations'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show mail-moderations');
  }

  model(params) {
    return this.store.findRecord('stored-mail', params.id, params);
  }
}
