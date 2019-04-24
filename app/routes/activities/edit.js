import EditRoute from 'alpha-amber/routes/application/edit';

export default EditRoute.extend({
  skipBeforeModelAccessCheck: true,
  afterModel(activity, transition) {
    return this.checkAccessWithPromise(this.can('edit activity', activity), transition);
  },
  modelName: 'activity',
  title: 'Activiteit aanpassen',
  parents: ['activities.index'],
  model(params) {
    // Make sure that form is loaded
    return this._super(params).then(activity => activity.get('form').then(() => activity));
  },
  deactivate() {
    const currentActivity = this.get('controller.model');
    currentActivity.rollbackAttributesAndForm();
  }
});
