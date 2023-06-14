import UserIndexRoute from './index';

export default class UserMailRoute extends UserIndexRoute {
  pageActions = null;

  canAccess() {
    return this.abilities.can('show mail-aliases');
  }
}
