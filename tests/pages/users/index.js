import {
  create,
  visitable,
  count
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/users'),
  amountOfUsers: count('*[data-test-membership-card]')
});
