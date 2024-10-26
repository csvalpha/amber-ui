import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class BooksRoute extends AuthenticatedRoute {
  queryParams = {};

  breadcrumb = { title: 'Boeken' };
}
