import FilterableAndSortableController from 'alpha-amber/controllers/application/filterable-and-sortable';
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { isPresent } from '@ember/utils';

export default class StaticPagesIndexController extends FilterableAndSortableController {
  @service session

  @tracked errorMessage = null
  @tracked sortedAttribute = 'title'

  queryParams = ['search', 'sort']
  routeOnEnter = 'static-pages.show'
  sortableAttributes = [
    {
      value: 'title',
      label: 'Titel'
    }
  ]

  get groupedModel() {
    // https://github.com/HeroicEric/ember-group-by/blob/057e3c0129cc58885c94708e839cda5f8f34afb9/addon/macros/group-by.js#L9
    let groups = A();
    let items = this.model;

    if (items) {
      items.forEach(function(item) {
        let value = item.category;
        let group = groups.findBy('value', value);

        if (isPresent(group)) {
          group.items.push(item);
        } else {
          group = { property: 'category', value, items: [item] };
          groups.push(group);
        }
      });
    }

    return groups;
  }
}
