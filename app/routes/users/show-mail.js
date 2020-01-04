import UserShowRouteUnauthenticated from 'alpha-amber/routes/users/show';

export default UserShowRouteUnauthenticated.extend({
  canAccess() {
    return this.can('show mail-aliases');
  },
  pageActions: null
});
