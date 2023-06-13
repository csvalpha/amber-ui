import { AuthenticatedRoute } from 'amber-ui/routes/application/application';
import FormLoadOrCreateUtil from 'amber-ui/utils/form-load-or-create';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';

export default class ActivityIndexRoute extends AuthenticatedRoute {
  @service store;

  constructor() {
    super(...arguments);
    this.formLoadOrCreateUtil = new FormLoadOrCreateUtil(this);
  }

  get pageActions() {
    const { activity } = this.controller.model;
    return [
      {
        link: 'activities.activity.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: activity,
        canAccess: this.abilities.can('edit activity', activity),
      },
      {
        link: 'activities.activity.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: activity,
        canAccess: this.abilities.can('destroy activities'),
      },
      {
        link: 'activities.activity.print-enrolled',
        title: 'Print ingeschrevenen',
        icon: 'print',
        linkArgument: activity,
        canAccess: this.abilities.can(
          'print enrolled members of activity',
          activity
        ),
      },
      {
        link: 'activities.activity.generate-alias',
        title: 'Mail ingeschrevenen',
        icon: 'paper-plane',
        linkArgument: activity,
        canAccess: this.abilities.can('generate alias for activity', activity),
        // canAccess: true
      },
    ];
  }

  canAccess() {
    return this.abilities.can('show activities');
  }

  model() {
    const activity = this.modelFor('activities.activity');
    let formPromise, responsePromise;

    if (
      this.abilities.can('show form/forms') &&
      this.abilities.can('show form/responses')
    ) {
      formPromise = activity.form;
      responsePromise = formPromise
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
    }

    return hash({
      activity,
      form: formPromise,
      currentUserResponse: responsePromise,
    });
  }

  deactivate() {
    this.controller.model.currentUserResponse?.rollbackAttributesAndAnswers();
  }
}
