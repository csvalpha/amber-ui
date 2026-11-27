import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CollectionIndexController extends Controller {
  @service fetch;
  @service flashNotice;

  @tracked finalizeErrors = null;
  @tracked isFinalizing = false;

  get pendingCreditsTotal() {
    const credits = this.model.pendingDeclarationCredits || [];
    return credits.reduce((total, credit) => total + Number(credit.amount), 0);
  }

  // Settles the pending declarations on this collection and locks it, then downloads the SEPA file
  @action
  async finalize() {
    if (this.isFinalizing) {
      return;
    }

    const confirmed = window.confirm(
      'Weet je het zeker? De declaraties worden definitief verrekend en de incasso kan daarna niet meer verwijderd worden.'
    );
    if (!confirmed) {
      return;
    }

    // The user can navigate to another collection while the request is pending
    const collection = this.model;
    const isActive = () => this.model === collection;

    this.finalizeErrors = null;
    this.isFinalizing = true;
    try {
      const response = await this.fetch.post(
        `/debit/collections/${collection.id}/finalize`
      );
      if (!response.ok) {
        const errors = await this.errorsFromResponse(response);
        if (isActive()) {
          this.finalizeErrors = errors;
        }
        return;
      }
    } catch {
      if (isActive()) {
        this.finalizeErrors = [{ title: 'Er ging iets mis' }];
      }
      return;
    } finally {
      this.isFinalizing = false;
    }

    this.flashNotice.sendSuccess('Incasso definitief gemaakt!');
    try {
      await collection.reload();
      await collection.hasMany('transactions').reload();
    } catch {
      // Finalizing succeeded, so don't offer to retry it: after a page reload the SEPA download is available
      this.flashNotice.sendWarning(
        'De incasso is definitief gemaakt, maar de pagina kon niet ververst worden. Herlaad de pagina om het SEPA bestand te downloaden.'
      );
      return;
    }

    if (isActive()) {
      this.transitionToRoute(
        'debit.collections.collection.sepa',
        collection.id
      );
    }
  }

  async errorsFromResponse(response) {
    try {
      const json = await response.json();
      if (json.errors?.length) {
        return json.errors;
      }
    } catch {
      // Fall through to the generic message
    }
    return [{ title: 'Er ging iets mis' }];
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
