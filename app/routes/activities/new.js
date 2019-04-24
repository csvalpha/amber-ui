import NewRoute from 'alpha-amber/routes/application/new';

export default NewRoute.extend({
  canAccess() {
    return this.can('create activities');
  },
  modelName: 'activity',
  title: 'Activiteit aanmaken',
  parents: ['activities.index'],
  deactivate() {
    const currentActivity = this.get('controller.model');
    currentActivity.rollbackAttributesAndForm();
  }
});
