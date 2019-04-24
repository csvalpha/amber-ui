import NewRoute from 'alpha-amber/routes/application/new';

export default NewRoute.extend({
  canAccess() {
    return this.can('batch upload users');
  },
  modelName: 'user',
  title: 'Batch gebruikers uploaden'
});
