import { Factory, trait } from 'ember-cli-mirage';

import faker from 'faker';

export default Factory.extend({
  respondFrom: () => faker.date.recent(),
  respondUntil: () => faker.date.future(),
  currentUserResponseId: null,
  currentUserResponseCompleted: false,
  canRespond: true,

  withQuestions: trait({
    afterCreate(form, server) {
      form.openQuestions = server.createList('form-open-question', 3, { form });
      form.closedQuestions = server.createList('form-closed-question', 3, { form });
    }
  }),

  closed: trait({
    respondUntil: () => faker.date.recent(),
    canRespond: false
  }),

  opensLater: trait({
    respondFrom: () => faker.date.future(),
    canRespond: false
  })
});
