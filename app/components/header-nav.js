import { set } from '@ember/object';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default Component.extend({
  tagName: 'nav',
  classNames: 'header-nav',
  session: service(),
  layoutManager: service('layout-manager'),
  media: service(),
  intl: service(),
  localStorage: service(),
  store: service(),
  router: service(),
  abilities: service(),
  availableStaticPages: tracked(),
  staticPagesForDropdown: computed('availableStaticPages', function () {
    const result = {};
    if (this.availableStaticPages) {
      Object.entries(this.availableStaticPages).forEach(([id, title]) => {
        if (!['word-lid', 'sponsoring'].includes(id)) {
          result[id] = title;
        }
      });
    }
    return result;
  }),

  actions: {
    handleLogoAction() {
      if (this.media.isMobile) {
        this.send('toggleLeftSidebar');
      } else {
        this.router.transitionTo('index');
      }
    },
    toggleLeftSidebar() {
      this.layoutManager.toggleLeftSidebar();
    },
    toggleRightSidebar() {
      this.layoutManager.toggleRightSidebar();
    },
    closeSidebars() {
      this.layoutManager.closeSidebars();
    },
    toggleLocale() {
      const { locale } = this.intl;
      if (locale[0] === 'nl') {
        this.set('intl.locale', 'en');
        localStorage.setItem('locale', 'en-');
      } else {
        this.set('intl.locale', 'nl');
        localStorage.setItem('locale', 'nl');
      }
      console.log(this.router)
    },
    setAvailableStaticPages() {
      if (!this.session.isAuthenticated && !this.media.isMobile) {
        this.store.findAll('static-page').then((pages) => {
          // make key-value pairs for all found static pages
          let newAvailableStaticPages = pages.reduce(
            (obj, page) => Object.assign(obj, { [page.id]: page.title }),
            {}
          );
          set(this, 'availableStaticPages', newAvailableStaticPages);
        });
      }
    },
  },
});
