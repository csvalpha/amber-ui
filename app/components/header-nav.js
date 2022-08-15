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
        if (!['word-lid', 'word-oud-lid', 'sponsoring'].includes(id)) {
          result[id] = title;
        }
      });
    }
    return result;
  }),
  unAuthenticatedMenuOptions: computed(
    'intl.locale',
    'availableStaticPages',
    function () {
      let list = [];
      list = this.addStaticPageOption(list, 'word-lid', 'becomeMember');
      list = this.addStaticPageOption(list, 'word-oud-lid', 'becomeOldMember');
      list.push(
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
        }
      );
      return this.addStaticPageOption(list, 'sponsoring', 'sponsoring');
    }
  ),

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
  addStaticPageOption: function (list, id, localeName) {
    if (this.availableStaticPages && this.availableStaticPages[id]) {
      list.push({
        link: 'static-pages.show',
        linkArgument: id,
        title: this.intl.t('component.headerNav.' + localeName),
        icon: '',
        canAccess: this.abilities.can('show static-pages'),
      });
    }
    return list;
  },
});
