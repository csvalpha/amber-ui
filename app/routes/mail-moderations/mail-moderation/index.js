import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class MailModerationIndexRoute extends AuthenticatedRoute {
  get pageActions() {
    return [
      {
        link: 'mail-moderations.mail-moderation.accept',
        title: 'Goedkeuren',
        icon: 'check',
        linkArgument: this.controller.model,
        canAccess: this.abilities.can('accept mail-moderations'),
      },
      {
        link: 'mail-moderations.mail-moderation.reject',
        title: 'Afkeuren',
        icon: 'circle-minus',
        linkArgument: this.controller.model,
        canAccess: this.abilities.can('reject mail-moderations'),
      },
      {
        link: 'mail-moderations.mail-moderation.destroy',
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
}
