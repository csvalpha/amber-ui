import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Error from '@ember/error';

export class ApplicationRoute extends Route {
  @service session;

  queryParams = {
    search: {
      refreshModel: true
    },
    sort: {
      refreshModel: true
    }
  }

  get pageActions() {
    return [];
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.pageActions = this.pageActions;
    controller.tabItems = this.tabItems;
  }

  model(params) {
    return this.store.query(this.modelName, params);
  }
}

export class AuthenticatedRoute extends ApplicationRoute {
  beforeModel(transition) {
    // Check authentication
    this.session.requireAuthentication(transition, 'login');

    // Check authorization (when canAccess does not need the model)
    if (this.canAccess.length === 0) {
      if (!this.canAccess()) {
        this.onAccessDenied(transition);
      }
    }
  }

  afterModel(model, transition) {
    // Check authorization (when canAccess does not need the model)
    if (this.canAccess.length === 1) {
      if (!this.canAccess(model)) {
        this.onAccessDenied(transition);
      }
    }

    if (this.canAccess.length > 1) {
      throw Error('canAccess method with more than 1 argument found. Authorization is not performeds');
    }

    return super.afterModel(model, transition);
  }

  onAccessDenied(transition) {
    const error = new Error(`Access denied for route ${transition.targetName} with params ${JSON.stringify(transition.params)}`);
    error.isAuthorizationError = true;
    throw error;
  }
}

export default ApplicationRoute;
