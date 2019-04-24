import EditRoute from 'alpha-amber/routes/application/edit';

export default EditRoute.extend({
  canAccess() {
    return this.can('edit debit/transactions');
  },
  modelName: 'debit/transaction',
  title: 'Transactie aanpassen'
});
