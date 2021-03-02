import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default class StaticPages extends Component {
  @service store;
  staticPages = [];

  constructor() {
    super(...arguments);
    this.set('staticPages', this.store.findAll('static-page'));
  }
}
