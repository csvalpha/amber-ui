import {
  create,
  count,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/articles'),
  amountOfArticles: count('article')
});
