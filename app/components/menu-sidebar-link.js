import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MenuSidebarLinkComponent extends Component {
  @service layoutManager;
  @tracked minor = false;
}

