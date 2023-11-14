import StaticPageEditController from './static-page/edit';

export default class StaticPagesNewController extends StaticPageEditController {
  successMessage = 'Infopagina aangemaakt!';
  cancelMessage = 'Aanmaken geannuleerd.';
  cancelTransitionTarget = 'static-pages';
  cancelTransitionModel = null;
}
