import EditRoute from 'alpha-amber/routes/application/edit';

export default EditRoute.extend({
  canAccess() {
    return this.can.can('edit mail-aliases');
  },
  modelName: 'mail-alias',
  title: 'Mail-alias aanpassen',
  parents: ['mail-aliases.index']
});
