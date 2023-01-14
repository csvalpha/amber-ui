import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MenuSidebarLink extends Component {
  @service layoutManager;
  @tracked minor = false;
}
