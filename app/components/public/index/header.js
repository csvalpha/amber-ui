import Component from '@glimmer/component';
import ENV from 'your-app-name/config/environment';

export default class HeaderComponent extends Component {

  get interestedFormLink() {
    return ENV.APP.googleFormLinkInterested;
  }
}
