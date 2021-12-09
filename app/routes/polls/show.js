import { hash } from 'rsvp';
import formLoadOrCreateMixin from 'alpha-amber/mixins/form-load-or-create-mixin';
import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';

export default class ShowPollsRoute extends AuthenticatedRoute.extend(formLoadOrCreateMixin) {
  get breadCrumb() {
    return { title: this.controller.model.poll.question.question };
  }

  get pageActions() {
    const { poll } = this.controller.model;
    return [
      {
        link: 'polls.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: poll,
        canAccess: this.abilities.can('edit poll', poll)
      },
      {
        link: 'polls.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: poll,
        canAccess: this.abilities.can('destroy polls')
      }
    ];
  }

  canAccess() {
    return this.abilities.can('show polls');
  }

  model(params) {
    const pollPromise = this.store.findRecord('poll', params.id, params);
    const formPromise = pollPromise.then(poll => poll.get('form'));
    const responsePromise = formPromise
      // Load or create the response
      .then(form => form === null ? null : this.loadOrCreateCurrentUserResponse(form))
      // Make sure there are answers for each question in the response
      .then(response => response === null ? null : this.loadOrCreateAnswers(response));

    return hash({
      poll: pollPromise,
      form: formPromise,
      currentUserResponse: responsePromise
    });
  }
}
