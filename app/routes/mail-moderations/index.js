import IndexRoute from 'alpha-amber/routes/application/index';

export default IndexRoute.extend({
  canAccess() {
    return this.can.can('show mail-moderations');
  },
  modelName: 'stored-mail',
  title: 'Mailmoderatie'
});
