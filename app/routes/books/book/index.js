import { inject as service } from '@ember/service';
import { AuthenticatedRoute } from 'amber-ui/routes/application/application';
import FormLoadOrCreateUtil from 'amber-ui/utils/form-load-or-create';

export default class BookIndexRoute extends AuthenticatedRoute {
  @service store;

  constructor() {
    super(...arguments);
    this.formLoadOrCreateUtil = new FormLoadOrCreateUtil(this);
  }

  get pageActions() {
    const book = this.controller.model;
    return [
      {
        link: 'books.book.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: book,
        canAccess: this.abilities.can('edit book', book),
      },
      {
        link: 'books.book.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: book,
        canAccess: this.abilities.can('destroy books'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show books');
  }
}
