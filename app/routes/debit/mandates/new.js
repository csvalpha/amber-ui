import NewRoute from 'alpha-amber/routes/application/new';

export default NewRoute.extend({
  canAccess() {
    return this.can('create debit/mandates');
  },
  modelName: 'debit/mandate',
  title: 'Mandaat aanmaken'
});
