import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CollectionIndexController extends Controller {
  @service fetch;
  @service flashNotice;

  @tracked finalizeErrors = null;

  get pendingCreditsTotal() {
    const credits = this.model.pendingDeclarationCredits || [];
    return credits.reduce((total, credit) => total + Number(credit.amount), 0);
  }

  // Settles the pending declarations on this collection and locks it, then downloads the SEPA file
  @action
  async finalize() {
    const confirmed = window.confirm(
      'Weet je het zeker? De declaraties worden definitief verrekend en de incasso kan daarna niet meer verwijderd worden.'
    );
    if (!confirmed) {
      return;
    }

    this.finalizeErrors = null;
    const response = await this.fetch.post(
      `/debit/collections/${this.model.id}/finalize`
    );

    if (response.ok) {
      this.flashNotice.sendSuccess('Incasso definitief gemaakt!');
      await this.model.reload();
      await this.model.hasMany('transactions').reload();
      this.transitionToRoute(
        'debit.collections.collection.sepa',
        this.model.id
      );
    } else {
      const json = await response.json();
      this.finalizeErrors = json.errors || [{ title: 'Er ging iets mis' }];
    }
  }

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
