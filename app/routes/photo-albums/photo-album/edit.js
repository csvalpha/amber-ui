import EditRoute from 'alpha-amber/routes/application/edit';

export default EditRoute.extend({
  canAccess() {
    return this.can.can('edit photo-albums');
  },
  model() {
    return this.modelFor('photo-albums.photo-album');
  },
  modelName: 'photo-album',
  title: 'Foto-album aanpassen'
});
