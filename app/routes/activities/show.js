import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
import { AuthenticatedRoute } from 'amber-ui/routes/application/application';
import FormLoadOrCreateUtil from 'amber-ui/utils/form-load-or-create';

export default class ShowActivityRoute extends AuthenticatedRoute {
  @service store;

  constructor() {
    super(...arguments);
    this.formLoadOrCreateUtil = new FormLoadOrCreateUtil(this);
  }

  get breadcrumb() {
    return { title: this.controller.model.activity.title };
  }

  get pageActions() {
    const { activity } = this.controller.model;
    return [
      {
        link: 'activities.edit',
        title: 'Wijzigen',
        icon: 'pencil',
        linkArgument: activity,
        canAccess: this.abilities.can('edit activity', activity),
      },
      {
        link: 'activities.destroy',
        title: 'Verwijderen',
        icon: 'trash',
        linkArgument: activity,
        canAccess: this.abilities.can('destroy activities'),
      },
      {
        link: 'activities.print-enrolled',
        title: 'Print ingeschrevenen',
        icon: 'print',
        linkArgument: activity,
        canAccess: this.abilities.can(
          'print enrolled members of activity',
          activity
        ),
      },
      {
        link: 'activities.generate-alias',
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

  model(params) {
    const activityPromise = this.store.findRecord(
      'activity',
      params.id,
      params
    );
    let formPromise, responsePromise;

    if (
      this.abilities.can('show form/forms') &&
      this.abilities.can('show form/responses')
    ) {
      formPromise = activityPromise.then((activity) => activity.get('form'));
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
      activity: activityPromise,
      form: formPromise,
      currentUserResponse: responsePromise,
    });
  }

  deactivate() {
    this.controller.model.currentUserResponse?.rollbackAttributesAndAnswers();
  }
}
