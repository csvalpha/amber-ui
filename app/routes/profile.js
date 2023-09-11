import { AuthenticatedRoute } from 'amber-ui/routes/application/application';
import { inject as service } from '@ember/service';

export default class ProfileRoute extends AuthenticatedRoute {
  @service router;

  canAccess() {
    return this.abilities.can('show individual users');
  }

  redirect() {
    this.router.transitionTo('users.user', this.session.currentUser.id);
  }
}
