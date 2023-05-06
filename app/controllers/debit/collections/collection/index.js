import Controller from '@ember/controller';

export default class CollectionIndexController extends Controller {
  get groupedTransactions() {
    const transactions = [];
    this.model.transactions.forEach((transaction) => {
      const user = transaction.get('user');
      let transactionGroup = transactions.find(
        (transactionGroup) => transactionGroup.user.get('id') === user.get('id')
      );
      if (!transactionGroup) {
        transactionGroup = {
          user: transaction.get('user'),
          transactions: [],
          totalTransactionAmount: 0,
        };
        transactions.push(transactionGroup);
      }
      transactionGroup.transactions.push(transaction);
      transactionGroup.totalTransactionAmount += transaction.get('amount');
    });
    transactions.forEach((transactionGroup) => {
      transactionGroup.totalTransactionAmount =
        transactionGroup.totalTransactionAmount.toFixed(2);
    });
    return transactions;
  }
}
