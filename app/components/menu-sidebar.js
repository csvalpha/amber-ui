import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import config from 'amber-ui/config/environment';

export default class MenuSidebar extends Component {
  @service layoutManager;
  @service session;

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
}
