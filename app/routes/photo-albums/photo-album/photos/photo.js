import { AuthenticatedRoute } from 'amber-ui/routes/application/application';

export default class PhotoRoute extends AuthenticatedRoute {
  queryParams = {};

  // Logged out visitors can only see the photo album overview, not single photos
  canAccess() {
    return this.abilities.can('show photos');
  }

  model(params) {
    return this.store.findRecord('photo', params.photo_id, params);
  }
}
