import Component from '@ember/component';
import { computed } from '@ember/object';

const PermissionsTableItemComponent = Component.extend({
  permission: null,
  modelPermissions: null,
  inheritedPermissions: [],
  editable: null,
  hasPermission: computed(
    'permission',
    'modelPermissions.@each.permission',
    'modelPermissions.@each.model',
    {
      get() {
        return this.modelPermissions.includes(this.permission);
      },
      set(key, value) {
        if (value && !this.modelPermissions.includes(this.permission)) {
          this.modelPermissions.pushObject(this.permission);
        } else if (this.modelPermissions.includes(this.permission)) {
          this.modelPermissions.removeObject(this.permission);
        }

        return value;
      },
    }
  ),
  hasInheritedPermission: computed(
    'permission',
    'inheritedPermissions.@each.permission',
    'inheritedPermissions.@each.model',
    function () {
      return this.inheritedPermissions.includes(this.permission);
    }
  ),
});

PermissionsTableItemComponent.reopenClass({
  positionalParams: [
    'permission',
    'modelPermissions',
    'editable',
    'inheritedPermissions',
  ],
});

export default PermissionsTableItemComponent;
