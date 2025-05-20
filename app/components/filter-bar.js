import Component from '@glimmer/component';
import { debounce } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FilterBar extends Component {
  @tracked _immediateFilter;
  @tracked isMobileFilterVisible = false; // State for mobile view visibility

  get sortedAttribute() {
    return this.args.sortedAttribute;
  }

  set sortedAttribute(value) {
    this.args.setSortedAttribute(value);
  }

  get sortableAttributes() {
    return this.args.sortableAttributes;
  }

  get sortedAscending() {
    return this.args.sortedAscending;
  }

  set sortedAscending(value) {
    this.args.setSortedAscending(value);
  }

  get filter() {
    return this.args.filter;
  }

  get filterDebounce() {
    return this._immediateFilter ?? this.filter;
  }

  set filterDebounce(value) {
    this._immediateFilter = value;
    debounce(this.args.setFilter, this.filterDebounce, 250);
  }

  @action
  toggleMobileFilterVisibility() {
    this.isMobileFilterVisible = !this.isMobileFilterVisible;
  }
}
