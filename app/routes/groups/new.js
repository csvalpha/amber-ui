import NewRoute from 'alpha-amber/routes/application/new';

export default NewRoute.extend({
  canAccess() {
    return this.can.can('create groups');
  },
  modelName: 'group',
  title: 'Groep aanmaken',
  parents: ['groups.index'],
  deactivate() {
    const group = this.controller.model;
    group.rollbackAttributesAndMemberships();
  }
});

