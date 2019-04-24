import NewRoute from 'alpha-amber/routes/application/new';

export default NewRoute.extend({
  canAccess() {
    return this.can('create articles');
  },
  modelName: 'article',
  parents: ['articles.index'],
  title: 'Artikel aanmaken',
  model() {
    const newArticle = this.store.createRecord(this.get('modelName'));
    newArticle.set('author', this.get('session.currentUser'));
    return newArticle;
  }
});
