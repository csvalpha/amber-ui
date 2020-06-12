import Component from '@ember/component';
import { inject as service } from '@ember/service';

const MenuSidebarLinkComponent = Component.extend({
  layoutManager: service('layout-manager'),
  minor: false
});
export default MenuSidebarLinkComponent;
