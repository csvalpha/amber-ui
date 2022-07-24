import { Factory } from 'ember-cli-mirage';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  description: faker.lorem.sentence,
  amount: () => faker.datatype.number(250),

  afterCreate(transaction, server) {
    transaction.user = server.create('user');
    transaction.collection = server.create('debit-collection');
    transaction.save();
  },
});
