import { inject as service } from '@ember/service';
import { AuthenticatedRoute } from 'amber-ui/routes/application/application';
import FormLoadOrCreateUtil from 'amber-ui/utils/form-load-or-create';

export default class ShowBookRoute extends AuthenticatedRoute {
  @service store;

  constructor() {
    super(...arguments);
    this.formLoadOrCreateUtil = new FormLoadOrCreateUtil(this);
  }

  get breadcrumb() {
    return { title: this.controller.model.title };
  }

  get pageActions() {
    const book = this.controller.model;
    return [
      {
        link: 'books.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: book,
        canAccess: this.abilities.can('edit book', book),
      },
      {
        link: 'books.destroy',
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

  model(params) {
    return this.store.findRecord('book', params.id, params);
  }
}
