import Component from '@ember/component';
import { debounce } from '@ember/runloop';

export default class FilterBarComponent extends Component {
  filter = null;
  classNames = ['d-none d-md-flex']
  sortedAttribute = null;
  sortableAttributes = null;
  sortedAscending = null;

  set filterDebounce(value) {
    debounce(this, this.setFilter, value, 250);
  }

  setFilter(value) {
    this.filter = value;
  }
}

