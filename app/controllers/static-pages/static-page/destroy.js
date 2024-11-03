import DestroyController from 'amber-ui/controllers/application/destroy';

export default class StaticPageDestroyController extends DestroyController {
  successTransitionTarget = 'static-pages';
  cancelTransitionTarget = 'static-pages.static-page';
}
