import Component from '@ember/component';
import { inject as service } from '@ember/service';

const MenuSidebarLinkComponent = Component.extend({
  layoutManager: service('layout-manager'),
  tooltipDelay: 200,
  tooltipSpacing: 25,
  minor: false
});
export default MenuSidebarLinkComponent;
