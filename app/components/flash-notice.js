import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class FlashNoticeComponent extends Component {
  @service flashNotice;
}
