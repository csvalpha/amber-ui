import { ApplicationRoute } from 'alpha-amber/routes/application/application';
import { inject as service } from '@ember/service';

export default class MailAliasIndexRoute extends ApplicationRoute {
  @service intl
  breadCrumb = { title: 'Mail-aliassen' }

  get pageActions() {
    return [
      {
        link: 'mail-aliases.new',
        title: 'Nieuw mailalias',
        icon: 'plus',
        canAccess: this.abilities.can('create mail-aliases')
      }
    ];
  }

  canAccess() {
    return this.abilities.can('show mail-aliases');
  }

  model(params) {
    return this.store.query('mail-alias', params);
  }
}
