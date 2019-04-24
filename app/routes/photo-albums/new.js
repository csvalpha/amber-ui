import NewRoute from 'alpha-amber/routes/application/new';

export default NewRoute.extend({
  canAccess() {
    return this.can('create photo-albums');
  },
  modelName: 'photo-album',
  title: 'Foto-album aanmaken'
});
