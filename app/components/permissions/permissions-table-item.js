import Component from '@ember/component';
import { computed } from '@ember/object';

const PermissionsTableItemComponent = Component.extend({
  permission: null,
  modelPermissions: null,
  inheritedPermissions: [],
  editable: null,
  hasPermission: computed('permission', 'modelPermissions.@each.permission', 'modelPermissions.@each.model', {
    get() {
      return this.get('modelPermissions').includes(this.get('permission'));
    },
    set(key, value) {
      const modelPermissions = this.get('modelPermissions');
      if (value && !modelPermissions.includes(this.get('permission'))) {
        modelPermissions.pushObject(this.get('permission'));
      } else if (modelPermissions.includes(this.get('permission'))) {
        modelPermissions.removeObject(this.get('permission'));
      }
      return value;
    }
  }),
  hasInheritedPermission: computed('permission', 'inheritedPermissions.@each.permission', 'inheritedPermissions.@each.model', function() {
    return (this.get('inheritedPermissions').includes(this.get('permission')));
  })
});

PermissionsTableItemComponent.reopenClass({
  positionalParams: ['permission', 'modelPermissions', 'editable', 'inheritedPermissions']
});

export default PermissionsTableItemComponent;
