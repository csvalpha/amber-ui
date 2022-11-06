import EditStaticPageController from './static-page/edit';

export default class StaticPagesNewController extends EditStaticPageController {
  successMessage = 'Infopagina aangemaakt!';
  cancelMessage = 'Aanmaken geannuleerd.';
  cancelTransitionTarget = 'static-pages';
  cancelTransitionModel = null;
}
