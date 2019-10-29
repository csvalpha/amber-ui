import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { CanMixin } from 'ember-can';

export default Component.extend(CanMixin, {
  tagName: 'nav',
  classNames: 'header-nav',
  session: service(),
  layoutManager: service('layout-manager'),
  media: service(),
  i18n: service(),
  localStorage: service(),
  router: service(),
  unAuthenticatedMenuOptions: computed('i18n.locale', function() {
    return [
      {
        link: 'articles',
        title: this.i18n.t('mixin.menuItems.articles'),
        icon: '',
        canAccess: this.can('show articles')
      },
      {
        link: 'photo-albums',
        title: this.i18n.t('mixin.menuItems.photoAlbums'),
        icon: '',
        canAccess: this.can('show photo-albums')
      },
      {
        link: 'static-pages',
        title: this.i18n.t('mixin.menuItems.staticPages'),
        icon: '',
        canAccess: this.can('show static-pages')
      }
    ];
  }),
  actions: {
    handleLogoAction() {
      if (this.get('media.isMobile')) {
        this.send('toggleLeftSidebar');
      } else if (this.get('routing.currentRouteName') === 'index') {
        this.send('refreshItems');
      } else {
        this.router.transitionTo('index');
      }
    },
    invalidateSession() {
      this.session.invalidate();
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
      const locale = this.get('i18n.locale');
      if (locale === 'nl') {
        this.set('i18n.locale', 'en');
        localStorage.setItem('locale', 'en');
      } else {
        this.set('i18n.locale', 'nl');
        localStorage.setItem('locale', 'nl');
      }
    }
  }
});
