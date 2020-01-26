import { Factory } from 'ember-cli-mirage';

import faker from 'faker';

export default Factory.extend({
  name: faker.name.firstName,
  description: faker.lorem.sentence,
  descriptionCamofied: () => faker.lorem.paragraph(),
  kind: () => faker.helpers.randomize(['bestuur', 'commissie', 'dispuut', 'genootschap', 'groep', 'huis', 'jaargroep']),
  recognizedAtGma: 'ALV 1',
  avatarThumbUrl: null
});
