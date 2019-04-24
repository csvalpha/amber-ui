import {
  create,
  count,
  visitable,
  text
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/groups'),
  amountOfGroups: count('*[data-test-membership-card]'),
  currentGroupKind: text('*[class="list-group-item list-group-item-action active"]')
});
