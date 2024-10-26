import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class TransactionsRoute extends AuthenticatedRoute {
  queryParams = {};

  breadcrumb = { title: 'Transacties' };
}
