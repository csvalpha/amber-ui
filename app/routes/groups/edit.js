import EditRoute from 'alpha-amber/routes/application/edit';

export default EditRoute.extend({
  skipBeforeModelAccessCheck: true,
  afterModel(group, transition) {
    return this.checkAccessWithPromise(this.can.can('edit group', group), transition);
  },
  modelName: 'group',
  title: 'Groep aanpassen',
  parents: ['groups.index'],
  deactivate() {
    const group = this.get('controller.model');
    group.rollbackAttributesAndMemberships();
  }
});

