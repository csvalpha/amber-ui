import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import config from 'amber-ui/config/environment';

export default class MenuSidebar extends Component {
  @service layoutManager;
  @service session;
  @service store;
  @tracked staticPages;

  get sofiaUrl() {
    if (config.environment === 'development') {
      return 'http://localhost:5000';
    } else if (config.environment === 'staging') {
      return 'https://stagingstreep.csvalpha.nl';
    } else {
      return 'https://streep.csvalpha.nl';
    }
  }

  @action
  invalidateSession() {
    this.session.invalidate();
  }

  @action
  setStaticPages() {
    this.store.findAll('static-page').then((pages) => {
      // make key-value pairs for all found static pages that do not appear by itself
      let staticPages = {}
      pages.forEach(page => {
        if (!['word-lid', 'sponsoring'].includes(page.id)) {
          staticPages[page.id] = page.title
        }
      });
      this.staticPages = staticPages;
    });
  }
}