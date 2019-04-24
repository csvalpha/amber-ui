import NewRoute from 'alpha-amber/routes/application/new';

export default NewRoute.extend({
  canAccess() {
    return this.can('create static-pages');
  },
  modelName: 'static-page',
  parents: ['static-pages.index'],
  title: 'Infopagina aanmaken'
});
