import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

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
        canAccess: this.can.can('accept mail-moderations')
      },
      {
        link: 'mail-moderations.reject',
        title: 'Afkeuren',
        icon: 'minus-circle',
        linkArgument: this.controller.model,
        canAccess: this.can.can('reject mail-moderations')
      },
      {
        link: 'mail-moderations.destroy',
        title: 'Negeren',
        icon: 'trash',
        linkArgument: this.controller.model,
        canAccess: this.can.can('destroy mail-moderations')
      }
    ];
  }

  canAccess() {
    return this.can.can('show mail-moderations');
  }

  model(params) {
    return this.store.findRecord('stored-mail', params.id, params);
  }
}
