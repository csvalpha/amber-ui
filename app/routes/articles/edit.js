import EditRoute from 'alpha-amber/routes/application/edit';

export default EditRoute.extend({
  skipBeforeModelAccessCheck: true,
  afterModel(article, transition) {
    return this.checkAccessWithPromise(this.can('edit article', article), transition);
  },
  modelName: 'article',
  title: 'Artikel aanpassen',
  parents: ['articles.index'],
  actions: {
    submit(article) {
      article.save().then(() => {
        this.transitionTo('articles.show', article);
      }).catch(error => {
        this.set('errorMessage', error.message);
      });
    }
  }
});
