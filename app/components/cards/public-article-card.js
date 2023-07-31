import { inject as service } from '@ember/service';
import Component from '@ember/component';

const ArticleCardComponent = Component.extend({
  session: service('session'),
  article: null,
});

ArticleCardComponent.reopenClass({
  positionalParams: ['article'],
});

export default ArticleCardComponent;
