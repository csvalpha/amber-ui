import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service layoutManager;
  @service router;
  @service session;

  get routeInfos() {
    const linkListToArray = (route) => {
      return route ? [...linkListToArray(route.parent), route] : [];
    };

    return linkListToArray(this.router.currentRoute).filter(
      (routeInfo) => routeInfo.metadata?.breadcrumb
    );
  }
}
