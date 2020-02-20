import EditRoute from 'alpha-amber/routes/application/edit';

export default EditRoute.extend({
  canAccess() {
    return this.can.can('edit static-pages');
  },
  modelName: 'static-page',
  title: 'Artikel aanpassen',
  parents: ['static-pages.index'],
  actions: {
    submit(staticPage) {
      staticPage.save().then(() => {
        this.transitionTo('static-pages.index');
      }).catch(function(error) {
        this.set('errorMessage', error.message);
      });
    }
  }
});
