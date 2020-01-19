import { inject as service } from '@ember/service';
import Component from '@ember/component';
import EmberObject, { computed } from '@ember/object';

export default Component.extend({
  store: service(),
  editable: false,
  modelName: null,
  modelPermissions: null,
  inheritedPermissions: [],
  permissions: computed(function() {
    return this.store.findAll('permission');
  }),
  groupedPermissions: computed('permissions', 'permissions.@each.model', 'permissions.@each.action', function() {
    const groups = [];

    this.permissions.then(permissions => {
      permissions.forEach(permission => {
        const permissionModel = permission.get('model');
        const modelGroup = groups.findBy('model', permissionModel);

        if (!modelGroup) {
          groups.pushObject(EmberObject.create({
            model: permissionModel,
            permissions: []
          }));
        }

        groups.findBy('model', permissionModel).permissions.pushObject(permission);
      });
    });

    return groups;
  })
});
