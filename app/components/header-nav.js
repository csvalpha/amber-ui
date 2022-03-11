import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'nav',
  classNames: 'header-nav',
  session: service(),
  layoutManager: service('layout-manager'),
  media: service(),
  intl: service(),
  localStorage: service(),
  router: service(),
  abilities: service(),
  unAuthenticatedMenuOptions: computed('intl.locale', function () {
    return [
      {
        link: 'articles',
        title: this.intl.t('mixin.menuItems.articles'),
        icon: '',
        canAccess: this.abilities.can('show articles'),
      },
      {
        link: 'photo-albums',
        title: this.intl.t('mixin.menuItems.photoAlbums'),
        icon: '',
        canAccess: this.abilities.can('show photo-albums'),
      },
      {
        link: 'static-pages',
        title: this.intl.t('mixin.menuItems.staticPages'),
        icon: '',
        canAccess: this.abilities.can('show static-pages'),
      },
    ];
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
    },
  },
});
