import NewRoute from 'alpha-amber/routes/application/new';

export default NewRoute.extend({
  canAccess() {
    return this.can.can('create users');
  },
  modelName: 'user',
  title: 'Lid aanmaken',
  parents: ['users.index']
});
