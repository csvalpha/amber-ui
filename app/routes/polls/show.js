import { computed } from '@ember/object';
import { hash } from 'rsvp';
import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import formLoadOrCreateMixin from 'alpha-amber/mixins/form-load-or-create-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default ShowRouteUnauthenticated.extend(formLoadOrCreateMixin, AuthenticatedRouteMixin, {
  canAccess() {
    return this.can('show polls');
  },
  modelName: 'poll',

  title: computed('controller.model.poll.question.question', function() {
    return this.get('controller.model.poll.question.question');
  }),
  parents: ['poll.index'],
  pageActions: computed('controller.model.poll', function() {
    const poll = this.get('controller.model.poll');
    return [
      {
        link: 'polls.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: poll,
        canAccess: this.can('edit poll', poll)
      },
      {
        link: 'polls.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: poll,
        canAccess: this.can('destroy polls')
      }
    ];
  }),
  model(params) {
    const pollPromise = this._super(params);
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
});
