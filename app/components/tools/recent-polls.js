import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class RecentPolls extends Component {
  @service store;

  polls = [];

  constructor() {
    super(...arguments);

    this.polls = this.store.query('poll', {
      sort: '-created_at',
      page: { number: '1', size: 5 },
    });
  }
}
