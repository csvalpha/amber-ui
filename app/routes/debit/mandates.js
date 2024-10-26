import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class MandatesRoute extends AuthenticatedRoute {
  queryParams = {};

  breadcrumb = { title: 'Incasso mandaten' };
}
