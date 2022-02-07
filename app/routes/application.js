import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AppRoute extends Route {
  @service session;
  @service intl;
  @service moment;

  async beforeModel() {
    await this.session.setup();
    this.moment.setLocale('nl');
    this.intl.setLocale(['nl']);
    return this.session.loadUser();
  }
}
