import EditRoute from 'alpha-amber/routes/application/edit';

export default EditRoute.extend({
  canAccess() {
    return this.can.can('edit debit/mandates');
  },
  modelName: 'debit/mandate',
  title: 'Mandaat aanpassen'
});
