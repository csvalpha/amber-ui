import { inject as service } from '@ember/service';
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
  staticPages: tracked(),

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
      console.log(this.router);
    },
    setStaticPages() {
      if (!this.session.isAuthenticated && !this.media.isMobile) {
        this.store.findAll('static-page').then((pages) => {
          // make key-value pairs for all found static pages that do not appear by itself
          let staticPages = {};
          pages.forEach((page) => {
            if (!['word-lid', 'sponsoring'].includes(page.id)) {
              staticPages[page.id] = page.title;
            }
          });
          this.staticPages = staticPages;
        });
      }
    },
  },
});
