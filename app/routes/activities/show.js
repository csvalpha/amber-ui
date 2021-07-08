import { hash } from 'rsvp';
import { AuthenticatedRoute } from 'alpha-amber/routes/application/application';
import formLoadOrCreateMixin from 'alpha-amber/mixins/form-load-or-create-mixin';

export default class ShowActivityRoute extends AuthenticatedRoute.extend(formLoadOrCreateMixin) {
  get breadCrumb() {
    return { title: this.controller.model.activity.title };
  }

  get pageActions() {
    const { activity } = this.controller.model;
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
        link: 'activities.generate-alias',
        title: 'Mail ingeschrevenen',
        icon: 'paper-plane',
        linkArgument: activity,
        canAccess: this.can.can('generate alias for activity', activity)
        // canAccess: true
      }
    ];
  }

  canAccess() {
    return this.can.can('show activities');
  }

  model(params) {
    const activityPromise = this.store.findRecord('activity', params.id, params);
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
  }

  deactivate() {
    this.controller.model.currentUserResponse?.rollbackAttributesAndAnswers();
  }
}
