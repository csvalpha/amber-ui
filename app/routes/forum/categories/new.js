import NewRoute from 'alpha-amber/routes/application/new';

export default NewRoute.extend({
  canAccess() {
    return this.can('create forum/categories');
  },
  modelName: 'forum/category',
  title: 'Categorie aanmaken'
});
