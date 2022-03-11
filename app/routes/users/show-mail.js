import ShowUserRouter from 'alpha-amber/routes/users/show';

export default class ShowUserMailRoute extends ShowUserRouter {
  pageActions = null;

  canAccess() {
    return this.abilities.can('show mail-aliases');
  }
}
