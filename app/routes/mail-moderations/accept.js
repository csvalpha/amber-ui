import EditRoute from 'alpha-amber/routes/application/edit';

export default EditRoute.extend({
  canAccess() {
    return this.can.can('accept mail-moderations');
  },
  modelName: 'stored-mail',
  title: 'Moderatieverzoek goedkeuren',
  parents: ['mail-moderations.index']
});
