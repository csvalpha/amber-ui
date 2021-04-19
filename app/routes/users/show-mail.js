import ShowUserRouter from 'alpha-amber/routes/users/show';

export default class ShowUserMailRoute extends ShowUserRouter {
  pageActions = null

  canAccess() {
    return this.can.can('show mail-aliases');
  }
}
