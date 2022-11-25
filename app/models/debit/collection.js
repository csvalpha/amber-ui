import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class Collection extends Model {
  @attr name;
  @attr date;
  @attr importFile;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Relationships
  @hasMany('debit/transaction') transactions;
  @belongsTo('user') author;

  async saveWithTransactions() {
    const response = await this.save();
    const transactions = await response.transactions;
    let failedTransactions = 0;
    transactions.forEach((transaction) => {
      if (transaction.hasDirtyAttributes) {
        try {
          transaction.save();
        } catch {
          failedTransactions++;
        }
      }
    });
    if (failedTransactions) {
      const prefix = failedTransactions > 1 ? 'zijn' : 'is';
      throw new Error(
        `Er ${prefix} ${failedTransactions} transacties niet juist opgeslagen`
      );
    }
  }
}
