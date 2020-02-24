import { Factory, trait } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name: faker.name.firstName,
  description: faker.lorem.sentence,
  descriptionCamofied: () => faker.lorem.paragraph(),
  kind: () => faker.helpers.randomize(['bestuur', 'commissie', 'dispuut', 'genootschap', 'groep', 'huis', 'jaargroep']),
  recognizedAtGma: 'ALV 1',
  avatarThumbUrl: null,

  withMembers: trait({
    afterCreate(group, server) {
      server.createList('membership', 5, { group, user: server.create('user') });
    }
  })
});
