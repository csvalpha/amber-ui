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
  intl: service(),
  localStorage: service(),
  router: service(),
  unAuthenticatedMenuOptions: computed('intl.locale', function() {
    return [
      {
        link: 'lustrum',
        title: this.intl.t('mixin.menuItems.lustrum'),
        icon: '',
        canAccess: this.can('show lustrum')
      },
      {
        link: 'articles',
        title: this.intl.t('mixin.menuItems.articles'),
        icon: '',
        canAccess: this.can('show articles')
      },
      {
        link: 'photo-albums',
        title: this.intl.t('mixin.menuItems.photoAlbums'),
        icon: '',
        canAccess: this.can('show photo-albums')
      },
      {
        link: 'static-pages',
        title: this.intl.t('mixin.menuItems.staticPages'),
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
      const locale = this.get('intl.locale');
      if (locale[0] === 'nl') {
        this.set('intl.locale', 'en');
        localStorage.setItem('locale', 'en-');
      } else {
        this.set('intl.locale', 'nl');
        localStorage.setItem('locale', 'nl');
      }
    }
  }
});
