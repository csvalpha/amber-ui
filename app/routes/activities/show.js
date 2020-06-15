import { computed } from '@ember/object';
import { hash } from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ShowRouteUnauthenticated from 'alpha-amber/routes/application/show';
import formLoadOrCreateMixin from 'alpha-amber/mixins/form-load-or-create-mixin';

export default ShowRouteUnauthenticated.extend(formLoadOrCreateMixin, AuthenticatedRouteMixin, {
  canAccess() {
    return this.can.can('show activities');
  },
  modelName: 'activity',
  title: computed.reads('controller.model.activity.title'),
  parents: ['activities.index'],

  pageActions: computed('can', 'controller.model.activity', function() {
    const activity = this.get('controller.model.activity');
    return [
      {
        link: 'activities.edit',
        title: 'Wijzigen',
        icon: 'pencil-alt',
        linkArgument: activity,
        canAccess: this.can.can('edit activity', activity)
      },
      {
        link: 'activities.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: activity,
        canAccess: this.can.can('destroy activities')
      },
      {
        link: 'activities.print-enrolled',
        title: 'Print ingeschrevenen',
        icon: 'print',
        linkArgument: activity,
        canAccess: this.can.can('print enrolled members of activity', activity)
      },
      {
        link: 'activities.mail-enrolled',
        title: 'Mail ingeschrevenen',
        icon: 'paper-plane',
        linkArgument: activity,
        canAccess: this.can.can('mail enrolled members of activity', activity)
      }
    ];
  }),

  model(params) {
    const activityPromise = this._super(params);
    let formPromise,
      responsePromise;

    if (this.can.can('show form/forms') && this.can.can('show form/responses')) {
      formPromise = activityPromise.then(activity => activity.get('form'));
      responsePromise = formPromise
      // Load or create the response
        .then(form => form === null ? null : this.loadOrCreateCurrentUserResponse(form))
        // Make sure there are answers for each question in the response
        .then(response => response === null ? null : this.loadOrCreateAnswers(response));
    }

    return hash({
      activity: activityPromise,
      form: formPromise,
      currentUserResponse: responsePromise
    });
  },

  deactivate() {
    const response = this.get('controller.model.currentUserResponse');
    if (response) {
      response.rollbackAttributesAndAnswers();
    }
  }
});
