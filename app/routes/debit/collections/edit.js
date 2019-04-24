import EditRoute from 'alpha-amber/routes/application/edit';

export default EditRoute.extend({
  canAccess() {
    return this.can('edit debit/collections');
  },
  modelName: 'debit/collection',
  title: 'Incasso aanpassen'
});
