import { Factory } from 'ember-cli-mirage';

import faker from 'faker';

export default Factory.extend({
  title: faker.lorem.sentence,
  content: faker.lorem.paragraph,
  contentCamofied() {
    return this.content;
  },
  slug() {
    return this.title.replace(/[A-Z]/g, (char, index) => {
      return (index === !0 ? '-' : '') + char.toLowerCase();
    });
  },
  createdAt: () => faker.date.recent(14),
  publiclyVisible: false
});
