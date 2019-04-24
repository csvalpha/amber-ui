import EditRoute from 'alpha-amber/routes/application/edit';

export default EditRoute.extend({
  canAccess() {
    return this.can('edit forum/categories');
  },
  model() {
    return this.modelFor('forum.categories.category');
  },
  modelName: 'forum/category',
  title: 'Categorie aanpassen'
});
