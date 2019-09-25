import Component from '@ember/component';
import { computed } from '@ember/object';

const PermissionsTableItemComponent = Component.extend({
  permission: null,
  modelPermissions: null,
  inheritedPermissions: [],
  editable: null,
  hasPermission: computed('permission', 'modelPermissions.@each.permission', 'modelPermissions.@each.model', {
    get() {
      return this.modelPermissions.includes(this.permission);
    },
    set(key, value) {
      const modelPermissions = this.modelPermissions;
      if (value && !modelPermissions.includes(this.permission)) {
        modelPermissions.pushObject(this.permission);
      } else if (modelPermissions.includes(this.permission)) {
        modelPermissions.removeObject(this.permission);
      }
      return value;
    }
  }),
  hasInheritedPermission: computed('permission', 'inheritedPermissions.@each.permission', 'inheritedPermissions.@each.model', function() {
    return this.inheritedPermissions.includes(this.permission);
  })
});

PermissionsTableItemComponent.reopenClass({
  positionalParams: ['permission', 'modelPermissions', 'editable', 'inheritedPermissions']
});

export default PermissionsTableItemComponent;
