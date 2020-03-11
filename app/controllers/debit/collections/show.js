import Controller from '@ember/controller';
import EmberObject, { computed } from '@ember/object';

export default Controller.extend({
  groupedTransactions: computed('model.transactions.length', 'model.transactions.@each.user', function() {
    const transactions = [];

    this.get('model.transactions').forEach(transaction => {
      let transactionsGroupedByUser = transactions.findBy('userId', transaction.get('user.id'));

      if (!transactionsGroupedByUser) {
        transactions.pushObject(EmberObject.create({
          userId: transaction.get('user.id'),
          user: transaction.get('user'),
          transactions: [],
          totalTransactionAmount: 0
        }));
      }

      transactionsGroupedByUser = transactions.findBy('userId', transaction.get('user.id'));
      transactionsGroupedByUser.transactions.pushObject(transaction);
      transactionsGroupedByUser.totalTransactionAmount += transaction.get('amount');
    });
    transactions.forEach(transactionsGroupedByUser => {
      transactionsGroupedByUser.totalTransactionAmount = transactionsGroupedByUser.totalTransactionAmount.toFixed(2);
    });
    return transactions;
  })
});
