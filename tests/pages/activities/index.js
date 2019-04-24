import {
  create,
  visitable,
  count
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/activities'),
  amountOfActivities: count('*[data-test-activity-item]')
});
