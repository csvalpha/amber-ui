import EditStaticPageController from './edit';

export default class NewStaticPageController extends EditStaticPageController {
  successMessage = 'Infopagina aangemaakt!';
  cancelMessage = 'Aanmaken geannuleerd.';
  cancelTransitionTarget = 'static-pages.index';
  cancelTransitionModel = null;
}
