import { AuthenticatedRoute } from 'amber-ui/routes/application/application';
import FormLoadOrCreateUtil from 'amber-ui/utils/form-load-or-create';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';

export default class PollIndexRoute extends AuthenticatedRoute {
  @service store;

  constructor() {
    super(...arguments);
    this.formLoadOrCreateUtil = new FormLoadOrCreateUtil(this);
  }

  get pageActions() {
    const { poll } = this.controller.model;
    return [
      {
        link: 'polls.poll.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: poll,
        canAccess: this.abilities.can('edit poll', poll),
      },
      {
        link: 'polls.poll.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: poll,
        canAccess: this.abilities.can('destroy polls'),
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show polls');
  }

  model() {
    const poll = this.modelFor('polls.poll');
    const formPromise = poll.form;
    const responsePromise = formPromise
      // Load or create the response
      .then((form) =>
        form === null
          ? null
          : this.formLoadOrCreateUtil.loadOrCreateCurrentUserResponse(form)
      )
      // Make sure there are answers for each question in the response
      .then((response) =>
        response === null
          ? null
          : this.formLoadOrCreateUtil.loadOrCreateAnswers(response)
      );

    return hash({
      poll,
      form: formPromise,
      currentUserResponse: responsePromise,
    });
  }
}
