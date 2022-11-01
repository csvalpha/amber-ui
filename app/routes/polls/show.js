import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
import { AuthenticatedRoute } from 'amber-ui/routes/application/application';
import FormLoadOrCreateUtil from 'amber-ui/utils/form-load-or-create';

export default class ShowPollsRoute extends AuthenticatedRoute {
  @service store;

  constructor() {
    super(...arguments);
    this.formLoadOrCreateUtil = new FormLoadOrCreateUtil(this);
  }

  get breadcrumb() {
    return { title: this.controller.model.poll.question.question };
  }

  get pageActions() {
    const { poll } = this.controller.model;
    return [
      {
        link: 'polls.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: poll,
        canAccess: this.abilities.can('edit poll', poll),
      },
      {
        link: 'polls.destroy',
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

  model(params) {
    const pollPromise = this.store.findRecord('poll', params.id, params);
    const formPromise = pollPromise.then((poll) => poll.get('form'));
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
      poll: pollPromise,
      form: formPromise,
      currentUserResponse: responsePromise,
    });
  }
}
