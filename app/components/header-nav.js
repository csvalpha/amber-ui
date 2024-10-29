import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HeaderNav extends Component {
  @service session;
  @service('layout-manager') layoutManager;
  @service media;
  @service intl;
  @service localStorage;
  @service store;
  @service router;
  @service abilities;
  @tracked staticPages;

  get onAboutUsPage() {
    return (
      this.router.currentRouteName === 'public.room-forum' ||
      (this.router.currentRouteName === 'static-pages.static-page.index' &&
        this.router.currentURL !== '/static-pages/word-lid' &&
        this.router.currentURL !== '/static-pages/sponsoring')
    );
  }

  @action
  handleLogoAction() {
    if (this.media.isMobile) {
      this.send('toggleLeftSidebar');
    } else {
      this.router.transitionTo('index');
    }
  }

  @action
  toggleLeftSidebar() {
    this.layoutManager.toggleLeftSidebar();
  }

  @action
  toggleRightSidebar() {
    this.layoutManager.toggleRightSidebar();
  }

  @action
  closeSidebars() {
    this.layoutManager.closeSidebars();
  }

  @action
  toggleLocale() {
    const { locale } = this.intl;
    if (locale[0] === 'nl') {
      this.intl.locale = 'en';
      this.localStorage.setItem('locale', 'en-');
    } else {
      this.intl.locale = 'nl';
      this.localStorage.setItem('locale', 'nl');
    }
  }

  @action
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
  }
}
