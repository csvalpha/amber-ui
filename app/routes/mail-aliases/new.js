import NewRoute from 'alpha-amber/routes/application/new';

export default NewRoute.extend({
  canAccess() {
    return this.can('create mail-aliases');
  },
  modelName: 'mail-alias',
  title: 'Mail-alias aanmaken',
  parents: ['mail-aliases.index']
});
