import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class ForumPosts extends Component {
  @service store;

  threads = [];

  constructor() {
    super(...arguments);
    
    this.threads = this.store.query('forum/thread', {
      sort: '-updated_at',
      page: { number: '1', size: 7 },
    });
  }
}
