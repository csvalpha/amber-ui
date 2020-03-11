import NewRoute from 'alpha-amber/routes/application/new';

export default NewRoute.extend({
  canAccess() {
    return this.can.can('create debit/transactions');
  },
  modelName: 'debit/transaction',
  title: 'Transactie aanmaken'
});
