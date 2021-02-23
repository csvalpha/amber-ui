import ShowActivityRoute from './show';

export default class PrintEnrolledRoute extends ShowActivityRoute {
  breadCrumb = { title: 'Print inschrijvingen/streeplijst' };

  canAccess(model) {
    return this.can.can('mail enrolled members of activity', model);
  }

  model() {
    // For the permission check, the form needs to be loaded
    const activityPromise = super.model(...arguments);
    // Wait for activity, then for form and return the activity
    return activityPromise.then(activity => activity.get('form').then(() => activity));
  }
}
