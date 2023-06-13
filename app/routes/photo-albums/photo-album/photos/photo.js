import { ApplicationRoute } from 'amber-ui/routes/application/application';

export default class PhotoRoute extends ApplicationRoute {
  queryParams = {};

  model(params) {
    return this.store.findRecord('photo', params.photo_id, params);
  }
}
