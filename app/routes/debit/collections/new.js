import NewRoute from 'alpha-amber/routes/application/new';

export default NewRoute.extend({
  canAccess() {
    return this.can('create debit/collections');
  },
  modelName: 'debit/collection',
  title: 'Incasso aanmaken'
});
