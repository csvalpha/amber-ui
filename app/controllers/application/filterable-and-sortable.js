import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FilterableAndSortableController extends Controller {
  @tracked sortedAttribute = null;
  @tracked sortedAscending = true;

  @tracked search = '';

  sortableAttributes = [];

  get sort() {
    if (this.sortedAscending) {
      return this.sortedAttribute;
    }

    return `-${this.sortedAttribute}`;
  }

  set sort(value) {
    if (typeof value !== 'undefined') {
      if (value.startsWith('-')) {
        this.sortedAscending = false;
        this.sortedAttribute = value.substring(1);
      } else {
        this.sortedAscending = true;
        this.sortedAttribute = value;
      }
    }
  }

  @action
  setSearch(value) {
    this.search = value;
  }

  @action
  setSortedAttribute(value) {
    this.sortedAttribute = value;
  }

  @action
  setSortedAscending(value) {
    this.sortedAscending = value;
  }

  @action
  selectFirstItem() {
    if (this.routeOnEnter && this.model.length > 0) {
      const routeOnEnterParam = this.routeOnEnterParam || 'id';
      this.transitionToRoute(
        this.routeOnEnter,
        this.model.firstObject[routeOnEnterParam]
      );
    }
  }
}
