import FilterableAndSortableController from 'amber-ui/controllers/application/filterable-and-sortable';
import { tracked } from '@glimmer/tracking';

export default class MailAliasesIndexController extends FilterableAndSortableController {
  @tracked sortedAttribute = 'email';

  queryParams = ['search', 'sort'];

  routeOnEnter = 'users.user';
  sortableAttributes = [
    {
      value: 'email',
      label: 'E-mail',
    },
    { value: 'moderation_type', label: 'Moderatie type' },
    { value: 'smtp_enabled', label: 'SMTP' },
    { value: 'last_received_at', label: 'Laatst ontvangen' },
  ];
}
