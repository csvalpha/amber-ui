import UserShowRouteUnauthenticated from 'alpha-amber/routes/users/show';

export default UserShowRouteUnauthenticated.extend({
  canAccess() {
    return this.can.can('show mail-aliases');
  },
  pageActions: null
});
