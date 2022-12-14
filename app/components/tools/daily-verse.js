import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class DailyVerse extends Component {
  @service store;

  verses = [];

  constructor() {
    super(...arguments);

    this.verses = this.store.findAll('daily-verse');
  }
}
