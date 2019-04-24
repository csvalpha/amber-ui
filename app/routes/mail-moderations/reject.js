import EditRoute from 'alpha-amber/routes/application/edit';

export default EditRoute.extend({
  canAccess() {
    return this.can('reject mail-moderations');
  },
  modelName: 'stored-mail',
  title: 'Moderatieverzoek afwijzen',
  parents: ['mail-moderations.index']
});
