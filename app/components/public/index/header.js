import Component from '@glimmer/component';
import ENV from 'amber-ui/config/environment';

export default class HeaderComponent extends Component {
  get interestedFormLink() {
    return ENV.APP.formLinkInterested;
  }
}
