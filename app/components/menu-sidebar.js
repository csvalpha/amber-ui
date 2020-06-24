import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from "@ember/object";

export default Component.extend({
  layoutManager: service('layout-manager'),
  themeChanger: service(),
  session: service(),
  actions: {
    toggleLeftSidebarExpansion() {
      this.layoutManager.toggleLeftSidebarExpansion();
    },
    invalidateSession() {
      this.session.invalidate();
    },
    toggleProfileMenu() {
      this.layoutManager.toggleProfileMenu();
    },
    closeProfileMenu() {
      this.layoutManager.closeProfileMenu();
    },
    closeLeftSidebar() {
      this.layoutManager.closeLeftSidebar();
    },
    openProfileMenu() {
      this.layoutManager.openProfileMenu();
    },
    switchTheme() {
      this.themeChanger.toggleTheme();
      this.toggleProperty('darkModeEnabled');
    }
  },
  darkModeEnabled: computed(function() {
    return this.themeChanger.theme === 'dark';
  })
});
