import {
  collection,
  text
} from 'ember-cli-page-object';

export default {
  title: text('h1'),
  activities: collection({
    itemScope: '.frontpage-activity-card-small'
  })
};
