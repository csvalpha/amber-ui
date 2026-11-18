import FilterableAndSortableController from 'amber-ui/controllers/application/filterable-and-sortable';
import { STATUS_LABELS } from 'amber-ui/models/declaration';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DeclarationsIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'created_at';
  @tracked sortedAscending = false;
  @tracked status = null;

  queryParams = ['search', 'sort', 'page', 'status'];

  routeOnEnter = 'declarations.declaration';
  sortableAttributes = [
    { value: 'created_at', label: 'Ingediend op' },
    { value: 'purchase_date', label: 'Aankoopdatum' },
    { value: 'amount', label: 'Bedrag' },
  ];

  statusOptions = Object.entries(STATUS_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  @action
  setStatus(event) {
    this.status = event.target.value || null;
    this.page = 1;
  }
}
