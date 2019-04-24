import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  description: () => faker.lorem.sentence(),
  amount: () => faker.random.number(250),

  afterCreate(transaction, server) {
    transaction.user = server.create('user');
    transaction.collection = server.create('debit-collection');
    transaction.save();
  }
});
